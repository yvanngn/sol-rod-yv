// Tests sans navigateur : node tests/test.js [londres|quai|autre]
const fs=require('fs'),vm=require('vm');
const groupe=process.argv[2];let ok=0,ko=0;
const CTX=new Proxy({},{get:()=>()=>CTX,set:()=>true});
function charger(){
  const el=()=>({innerHTML:'',textContent:'',hidden:true,style:{setProperty(){}},children:[],appendChild(c){this.children.push(c)},append(){},addEventListener(){},getBoundingClientRect:()=>({left:0,top:0,width:320,height:180}),getContext:()=>CTX});
  const els={};const document={getElementById:id=>els[id]||(els[id]=el()),createElement:()=>el(),addEventListener(){}};
  const ctx={window:{TEST:{log:[],choix:[]}},document,setTimeout,Promise,console,Math,Date,Error,Object,requestAnimationFrame:()=>{}};
  vm.createContext(ctx);
  const h=fs.readFileSync(__dirname+'/../dist/index.html','utf8');
  vm.runInContext(h.match(/<script>([\s\S]*)<\/script>/)[1]+';this.S=S;this.action=action;this.go=go;this.switchPerso=switchPerso;this.aObjet=aObjet;this.drawPerso=drawPerso;this.SCENES=SCENES;this.debutSolene=debutSolene;this.JOUTE=JOUTE;this.DARTS=DARTS;this.pubFlechettes=pubFlechettes;this.motDePasse=motDePasse;this.debutRod=debutRod;this.combiner=combiner;this.SON=SON;this.regler=regler;this.volume=volume;this.tenue=tenue;this.postEffets=postEffets;this.reflets=reflets;this.passer=passer',ctx);
  return ctx;
}
const v=(nom,c)=>{if(c){ok++}else{ko++;console.log('ÉCHEC :',nom)}};
const dit=(G,t)=>G.window.TEST.log.some(l=>l.includes(t));
const W_=320;
const scenarios={
  async graphisme(G){let ok2=true;try{for(const n of['yvan','rod','solene'])for(const d of['face','d','g','dos']){G.S.anim[n]={dir:d,pas:7,marche:true};G.drawPerso(n,100)}
    for(const k in G.SCENES){G.S.f.traverse=0;G.SCENES[k].dessin(CTX);(G.SCENES[k].objets||[]).forEach(o=>o.dessin&&o.dessin(CTX));if(k==='bus'){G.S.f.busNormal=1;G.SCENES[k].dessin(CTX);G.S.f.busNormal=0}G.SCENES[k].devant&&G.SCENES[k].devant();G.S.scene=k;G.SCENES[k].dessinAvant&&G.SCENES[k].dessinAvant();G.postEffets(G.SCENES[k]);G.reflets()}}catch(e){ok2=false;console.log(e.message)}v('dessin persos, décors, lumières, particules, reflets',ok2)},
  async intro(G){
    await G.go('appart');
    v('musique anniversaire dans l\'appartement',G.SON.voulu!=null);v('intro : réplique « quel âge »',dit(G,'quel âge'));
    v('intro : canapé d\'Yvan',dit(G,'ces bêtises'));
    v('carton « Un an plus tard »',dit(G,'carton: Un an plus tard'));
    v('chapitre 1 : Londres, titre puis tuto',G.S.scene==='londres'&&dit(G,'nous voici à Londres')&&dit(G,'titre')&&dit(G,'tuto'));
    v('Yvan en sorcier au chapitre 1',!!G.tenue('yvan').echarpe&&!G.tenue('yvan').chapeau&&G.S.posY.yvan==null);
  },
  async son(G){
    await G.go('appart');v('musique anniversaire au début puis thème magique à Londres',G.S.scene==='londres'&&G.SON.voulu==='magie');
    await G.go('autre');v('musique des brumes de l\'autre côté',G.SON.voulu==='brumes');
    G.regler('mus',false);G.regler('sfx',false);v('couper musique et bruitages',!G.SON.mus&&!G.SON.sfx);
    G.volume('mus',.3);G.volume('sfx',.8);v('volumes réglables (et remonter le volume réactive le son)',G.SON.volmus===.3&&G.SON.volsfx===.8&&G.SON.mus&&G.SON.sfx);
  },
  async passer(G){
    G.window.TEST.lent=1;const p=G.go('quai');await null;G.passer();await p;
    v('Passer saute toute la séquence',dit(G,'LA photo')&&!G.S.busy&&!G.S.passe);G.window.TEST.lent=0;
  },
  async yvan(G){
    await G.go('londres');
    G.switchPerso('rod');
    v('Rod et Solène partent ; Yvan seul, pas de changement de perso',G.S.pos.rod==null&&G.S.pos.solene==null&&G.S.verrou==='yvan'&&G.S.perso==='yvan');
    v('répliques du départ',dit(G,'toilettes')&&dit(G,'bonbons')&&dit(G,'pour changer'));
    await G.action('porte');v('pas de studio sans les autres',G.S.scene==='londres');
    await G.action('cabine');v('vue zoomée dans la cabine, la pièce près du combiné',G.S.scene==='cabine'&&G.S.f.cabine&&dit(G,'à côté du combiné'));
    await G.action('combine','regarder');await G.action('piece');v('Yvan décroche, puis raccroché',G.S.cab===null&&dit(G,'Hop, dans la poche'));
    await G.action('sortie_cab');v('retour dans la rue',G.S.scene==='londres'&&G.S.pos.yvan===56);
    v('pièce prise, appel mystérieux',G.aObjet('piece')&&dit(G,'pas ce qui était prévu'));
    await G.action('bus');v('Yvan avance au centre puis trouve ça plus grand',G.S.pos.yvan===150&&dit(G,'plus grand dedans'));
    v('bus-musée : hôte à l\'intérieur « gratuit », Yvan entre',G.S.scene==='bus'&&dit(G,'gratuit')&&!G.SCENES.londres.objets.some(o=>o.id==='hote'));
    for(const o of['hote','momie','vaudou','citrouilles','alien','lapin','visiteuse'])await G.action(o,'regarder');
    await G.action('singe');v('le singe : examiner par défaut, la fente',G.S.f.fente&&dit(G,'fente'));
    await G.action('singe',undefined,'piece');v('pièce dans le singe : bus redevenu normal',G.S.f.busNormal&&!G.aObjet('piece'));
    await G.action('sortie');v('sortie : homme au manteau, transition vers Rod devant le pub',G.S.f.manteau&&dit(G,'Pendant ce temps')&&G.S.scene==='devanture'&&G.S.perso==='rod');
  },
  async rod(G){
    await G.debutRod();
    G.switchPerso('yvan');
    v('Rod devant le pub « Chaos Order », seul jouable',G.S.scene==='devanture'&&G.S.perso==='rod'&&G.S.verrou==='rod'&&dit(G,'Chaos Order'));
    v('la porte du pub est cliquable en son milieu',G.SCENES.devanture.objets.filter(o=>160>=o.x&&160<=o.x+o.w&&120>=o.y&&120<=o.y+o.h).pop().id==='porte_pub');
    await G.action('porte_pub');v('Rod entre dans le pub',G.S.scene==='pub');
    await G.action('cacahuetes');v('cacahuètes : ça a du goût',dit(G,'ça a du goût'));
    await G.action('pailles');v('pailles : regarder',dit(G,'Un verre plein de pailles'));
    await G.action('pailles','prendre');await G.action('flechette');v('paille et fléchette prises',G.aObjet('paille')&&G.aObjet('flechette'));
    for(const o of['barman','clients','joueurs'])await G.action(o);
    G.DARTS.list=Array(9).fill({x:30,y:96});G.DARTS.ramasse=null;G.DARTS.vol={n:'joueur2',x0:80,y0:130,x1:52,y1:96,t0:0,touche:false};G.pubFlechettes();
    v('10e fléchette plantée : un joueur part les ramasser',G.DARTS.list.length===10&&G.DARTS.ramasse&&G.DARTS.ramasse.phase==='aller');
    for(let i=0;i<40;i++)G.pubFlechettes();v('le joueur marche vers le mur',G.DARTS.px.joueur1<62);
    await G.action('toilettes');v('l\'homme au manteau sort des toilettes, Rod entre : « Qu\'est-ce que c\'est que ça ? »',G.S.scene==='toilettes'&&G.S.f.manteauWC&&dit(G,"Qu'est-ce que c'est que ça")&&!dit(G,'Pardon'));
    await G.action('ballon',undefined,'flechette');v('fléchette seule : pas assez de force',dit(G,'Pas assez de force')&&G.aObjet('flechette')&&!G.S.f.ballon);
    await G.combiner('flechette','paille');v('fléchette + paille = sarbacane',G.aObjet('sarbacane')&&!G.aObjet('paille')&&!G.aObjet('flechette'));
    await G.action('ballon',undefined,'sarbacane');v('ballon éclaté, boulette au sol',G.S.f.ballon);
    await G.action('boulette');v('« Je t\'appelle… », tout disparaît, transition vers Solène',dit(G,'Je t\'appelle')&&G.S.f.ballonParti&&!G.aObjet('boulette')&&dit(G,'côté de Solène')&&G.S.f.finRod);
    v('Rod ressort : devanture « The English Pub », puis Solène',G.S.f.vraiNom&&dit(G,'The English Pub')&&G.S.scene==='bonbons'&&G.S.perso==='solene');
  },
  async mdp(G){
    v('mot de passe inconnu refusé',G.motDePasse('9')===false);
    G.S.tenue='neutre';v('mot de passe 1 : chapitre 1 à Londres, tenue de sorcier',G.motDePasse('1')&&G.S.scene==='londres'&&G.S.tenue==='');
    await null;v('mot de passe 3 : chapitre de Solène',G.motDePasse('3')&&G.S.scene==='bonbons'&&G.S.perso==='solene');
    await null;v('mot de passe 2 : chapitre de Rod devant le pub',G.motDePasse('2')&&G.S.scene==='devanture'&&G.S.perso==='rod'&&G.S.verrou==='rod'&&G.S.f.busNormal);
    await null;v('mot de passe 0 : intro',G.motDePasse(' 0 ')&&G.S.scene==='appart');
  },
  async solene(G){
    await G.debutSolene();G.switchPerso('rod');
    v('Solène au magasin de bonbons, seule jouable',G.S.scene==='bonbons'&&G.S.perso==='solene'&&G.S.verrou==='solene'&&dit(G,"c'est sûr et certain")&&G.SCENES.bonbons.largeur>W_);
    for(const o of['etageres','ilots','sucettes','chocolats','nounours_etal','bonbons_bleus','cannes','barbe','enfants','vigile','gros_nounours'])await G.action(o,'regarder');
    await G.action('enfants');await G.action('vigile');
    await G.action('porte_bonbons');v('sans rien, Solène ne part pas',G.S.scene==='bonbons'&&!G.S.f.joute);
    v('le gros nounours se « vole »',G.SCENES.bonbons.objets.find(o=>o.id==='gros_nounours').voler);
    await G.action('gros_nounours');v('nounours volé, dans le sac',G.aObjet('nounours'));
    G.window.TEST.choix.push('Sur instagroom ?',...G.JOUTE.map(x=>x[1]));
    await G.action('porte_bonbons');
    v('le vigile répète sa phrase après une erreur',G.window.TEST.log.filter(l=>l==='vigile: Je vous ai vue.').length===2);
    v('Solène sort le singe de son sac, rendu',dit(G,"je pensais que c'était un nounours")&&!G.aObjet('nounours'));
    v('magasin de vêtements puis retrouvailles',dit(G,'magasin de vêtements')&&dit(G,"Vous n'allez pas me croire !")&&G.S.f.retrouves&&G.S.verrou===null);
    v('on enchaîne au studio',G.S.scene==='quai'&&dit(G,'Dans le studio'));
  },
  async londres(G){
    await G.go('londres');v('scène de départ',G.S.scene==='londres');
    G.S.f.retrouves=1;G.S.verrou=null;Object.assign(G.S.pos,{rod:110,solene:150});
    await G.action('porte');v('bloqué sans billets',G.S.scene==='londres');
    G.switchPerso('solene');await G.action('rod',undefined,'billets');v('Donner billets à Rod',G.aObjet('billets','rod'));
    G.switchPerso('rod');await G.action('porte');v('entrée au studio',G.S.scene==='quai');
  },
  async quai(G){
    G.S.f.retrouves=1;G.S.verrou=null;G.S.f.vu_quai=1;await G.go('quai',{yvan:220,rod:250,solene:280});
    v('studio agrandi',G.SCENES.quai.largeur>320);
    G.switchPerso('solene');await G.action('boutique','utiliser');v('Solène ne parle pas de sa carte bleue',!dit(G,'confisqué ma carte'));
    G.switchPerso('rod');await G.action('loup');v('Rod fait le pitre sur le loup-garou',dit(G,'Aouuu'));
    G.switchPerso('yvan');await G.action('balai');v('Yvan fait semblant de voler sur le balai',dit(G,'Décollage'));
    await G.action('touriste');v('seule Solène demande la photo',G.S.scene==='quai');
    G.switchPerso('solene');await G.action('touriste');
    v('photo à trois, compte 1-2-3, avalés par le mur',dit(G,'Trois !')&&G.S.scene==='reveil');
    v('réveil : Solène, puis les deux autres',dit(G,'les gars ?')&&dit(G,'rod: What ?')&&dit(G,"C'est quoi ça"));
    v('fin du chapitre 1 devant le château',dit(G,'carton: Fin du chapitre 1')&&G.S.f.finChapitre1);
  },
  async autre(G){
    await G.go('autre');G.switchPerso('yvan');await G.action('solene');v('fin de l\'intro',G.S.f.fin);
    await G.action('train','regarder');v('regarder le train',dit(G,'émeraude'));
  },
};
(async()=>{for(const n of groupe?[groupe]:Object.keys(scenarios)){try{await scenarios[n](charger())}catch(e){ko++;console.log('ÉCHEC :',n,e.message)}}
  console.log(`${ok} vérifications OK, ${ko} échec(s)`);process.exit(ko?1:0)})();
