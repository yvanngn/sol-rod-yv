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
  vm.runInContext(h.match(/<script>([\s\S]*)<\/script>/)[1]+';this.S=S;this.action=action;this.go=go;this.switchPerso=switchPerso;this.aObjet=aObjet;this.drawPerso=drawPerso;this.SCENES=SCENES;this.SON=SON;this.regler=regler;this.volume=volume;this.tenue=tenue;this.postEffets=postEffets;this.reflets=reflets;this.passer=passer',ctx);
  return ctx;
}
const v=(nom,c)=>{if(c){ok++}else{ko++;console.log('ÉCHEC :',nom)}};
const dit=(G,t)=>G.window.TEST.log.some(l=>l.includes(t));
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
    await G.action('sortie');v('sortie : homme au manteau, transition vers Rod',G.S.scene==='londres'&&G.S.f.manteau&&dit(G,'Pendant ce temps'));
  },
  async londres(G){
    await G.go('londres');v('scène de départ',G.S.scene==='londres');
    G.S.f.retrouves=1;G.S.verrou=null;Object.assign(G.S.pos,{rod:110,solene:150});
    await G.action('porte');v('bloqué sans billets',G.S.scene==='londres');
    G.switchPerso('solene');await G.action('rod',undefined,'billets');v('Donner billets à Rod',G.aObjet('billets','rod'));
    G.switchPerso('rod');await G.action('porte');v('entrée au studio',G.S.scene==='quai');
  },
  async quai(G){
    await G.go('quai');G.switchPerso('yvan');
    await G.action('chariot',undefined,'telephone');v('photo refusée sans pose',!G.S.f.traverse);
    G.window.TEST.choix.push('p');await G.action('rod');v('Rod pose',G.S.f.pose);
    await G.action('chariot',undefined,'telephone');v('traversée du mur',G.S.f.traverse&&G.S.scene==='autre');
    v('héros réapparus',G.S.pos.rod===160&&G.S.pos.yvan===120);
  },
  async autre(G){
    await G.go('autre');G.switchPerso('yvan');await G.action('solene');v('fin de l\'intro',G.S.f.fin);
    await G.action('train','regarder');v('regarder le train',dit(G,'émeraude'));
  },
};
(async()=>{for(const n of groupe?[groupe]:Object.keys(scenarios)){try{await scenarios[n](charger())}catch(e){ko++;console.log('ÉCHEC :',n,e.message)}}
  console.log(`${ok} vérifications OK, ${ko} échec(s)`);process.exit(ko?1:0)})();
