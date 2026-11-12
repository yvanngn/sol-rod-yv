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
  vm.runInContext(h.match(/<script>([\s\S]*)<\/script>/)[1]+';this.S=S;this.action=action;this.go=go;this.switchPerso=switchPerso;this.aObjet=aObjet;this.drawPerso=drawPerso;this.SCENES=SCENES;this.postEffets=postEffets;this.reflets=reflets;this.passer=passer',ctx);
  return ctx;
}
const v=(nom,c)=>{if(c){ok++}else{ko++;console.log('ÉCHEC :',nom)}};
const dit=(G,t)=>G.window.TEST.log.some(l=>l.includes(t));
const scenarios={
  async graphisme(G){let ok2=true;try{for(const n of['yvan','rod','solene'])for(const d of['face','d','g','dos']){G.S.anim[n]={dir:d,pas:7,marche:true};G.drawPerso(n,100)}
    for(const k in G.SCENES){G.S.f.traverse=0;G.SCENES[k].dessin(CTX);G.S.scene=k;G.SCENES[k].dessinAvant&&G.SCENES[k].dessinAvant();G.postEffets(G.SCENES[k]);G.reflets()}}catch(e){ok2=false;console.log(e.message)}v('dessin persos, décors, lumières, particules, reflets',ok2)},
  async passer(G){
    G.window.TEST.lent=1;const p=G.go('quai');await null;G.passer();await p;
    v('Passer saute toute la séquence',dit(G,'LA photo')&&!G.S.busy&&!G.S.passe);G.window.TEST.lent=0;
  },
  async londres(G){
    await G.go('londres');v('scène de départ',G.S.scene==='londres');
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
