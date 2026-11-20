// ===== Chapitre 1 : le groupe se sépare, Yvan seul (bus-musée, cabine, singe) =====
const AUTRES={tel:'Voix au téléphone',hote:"L'hôte",visiteuse:'Visiteuse',visiteur:'Visiteur'};
Object.assign(COUL,{tel:'#9ff0c8',hote:'#f0a0ff',visiteuse:'#ff9ad0',visiteur:'#b8e07a'});
Object.assign(SPEC,{
  hote:{skin:'#e0b090',hair:'#d8d8d8',coiffure:'court',top:'#7a1a3a',veste:'#2a1a40',pants:'#1a1a22',shoes:'#111',moust:'#d8d8d8'},
  visiteuse:{skin:'#f2c8a8',hair:'#ff5fb0',coiffure:'boucle',top:'#e8b040',pants:'#5a2a6a',shoes:'#e84a8a',lunettes:1},
  visiteur:{skin:'#d89878',hair:'#5a3a20',coiffure:'court',top:'#7a9a4a',pants:'#c8b080',shoes:'#8a6a4a',moust:'#3a2410'},
  lennon:{skin:'#efc8a6',hair:'#6a4a2a',coiffure:'long',top:'#f0ece0',pants:'#f0ece0',shoes:'#d8d0c0',lunettes:1,barbe:'#6a4a2a'},
  manteau:{skin:'#e6bfa0',hair:'#0e0e12',coiffure:'long',top:'#121216',veste:'#0a0a0d',pants:'#0a0a0d',shoes:'#050505',lunettes:1},
});
S.pnj={};
OBJETS.piece={nom:'Pièce brillante',desc:"Une pièce dorée qui brille toute seule. Elle était à côté du combiné… et le téléphone a sonné dès que je l'ai prise.",
  icone:c=>{R(3,3,6,6,'#f0c766',c);R(4,4,4,4,'#ffe9a0',c);R(5,5,2,2,'#c99a3a',c)}};
const poly=(pts,c)=>{g.fillStyle=c;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.fill()};

// ----- déplacements de sortie de scène -----
async function partir(n,x){const a=anim(n);if(TEST||S.passe){S.pos[n]=null;return}
  while(Math.abs(S.pos[n]-x)>1.5){a.marche=true;a.dir=x>S.pos[n]?'d':'g';a.pas++;if(a.pas%14===0)sfx('pas');S.pos[n]+=Math.sign(x-S.pos[n])*1.5;await pause(16)}
  a.marche=false;a.dir='face';S.pos[n]=null}
async function descendre(n){const a=anim(n);if(TEST||S.passe){S.pos[n]=null;return}
  a.dir='face';let y=SOL;while(y<H+50){a.marche=true;y+=1.1;S.posY[n]=y;a.pas++;if(a.pas%14===0)sfx('pas');await pause(16)}
  a.marche=false;S.pos[n]=null;delete S.posY[n]}

// ----- Londres : nouvelle entrée du chapitre 1 -----
SCENES.londres.entree=async()=>{
  S.verrou=null;S.perso='yvan';ui();
  await noir(false);
  await say('narr',"Et nous voici à Londres.");
  await titreJeu();
  await tuto();
  await dire([['rod',"Bon. Avant de commencer quoi que ce soit, il me faut des toilettes. Urgence."],['rod',"Il doit bien y avoir un pub par là."]]);
  await partir('rod',-20);
  await say('solene',"Moi, je vais acheter des bonbons. Pour la route. Et pour le moral.");
  await descendre('solene');
  await say('yvan',"Encore seul… pour changer.");
  S.verrou='yvan';ui();
};
const ob=id=>SCENES.londres.objets.find(o=>o.id===id);
{const porte=ob('porte'),avant=porte.utiliser;
  porte.utiliser=async()=>S.f.retrouves?avant():say('moi',"Je ne vais pas visiter le studio sans les autres. Ils m'en voudraient à vie.")}
Object.assign(ob('cabine'),{defaut:'utiliser',
  regarder:()=>say('moi',S.f.piece?"Un vestige d'une autre époque.":"Une cabine téléphonique. Plus personne ne s'en sert, sauf pour les selfies."),
  utiliser:async()=>{await marcher('yvan',39);S.cabineX=S.pos.yvan;await go('cabine',{yvan:null})}});
Object.assign(ob('bus'),{nom:'bus-musée',defaut:'utiliser',
  regarder:()=>say('moi',S.f.busNormal?"Juste un bus. Ça me rassure et ça m'inquiète à la fois.":"Un bus avec une pancarte : « MUSÉE DES CURIOSITÉS — ENTRÉE LIBRE »."),
  utiliser:entrerBus});
SCENES.londres.objets.push(
  {id:'pancarte',nom:'pancarte du bus',x:154,y:141,w:34,h:9,loin:1,dessin(){if(S.f.busNormal)return;P(154,141,34,9,'#f3e2b0');P(154,141,34,1,'#fff6d8');g.fillStyle='#5a1020';g.font="bold 7px Georgia";texte('MUSÉE',159,148)},
    cache:()=>S.f.busNormal,regarder:()=>ob('bus').regarder()},
  {id:'passants',nom:'',x:0,y:0,w:0,h:0,dessin:passants},
  {id:'manteau',nom:'',x:0,y:0,w:0,h:0,cache:()=>S.pnj.manteau==null,dessin(){drawPerso('manteau',S.pnj.manteau)}},

);

function passants(){if(S.f.busNormal)return;const t=Date.now()/1000;
  [['visiteur',0],['visiteuse',4.5]].forEach(([n,ph])=>{const c=(t+ph)%9;let x,d;
    if(c<3.5){x=-10+c/3.5*218;d='d'}else if(c>=5&&c<8.5){x=208-(c-5)/3.5*218;d='g'}else return;
    const a=anim(n);a.dir=d;a.marche=true;a.pas=t*12|0;drawPerso(n,x)})}

async function prendrePiece(){
  S.f.piece=1;ajouter('piece');
  await say('moi',"Hop, dans la poche.");
  S.cab='sonne';sfx('sonnerie');await pause(1200);
  await say('moi',"…Le téléphone sonne ?!");
  S.cab='decroche';S.cabT=Date.now();await pause(1100);
  await dire([['tel',"Bzrkkks… c'est toi ?"],['yvan',"Bah oui, j'suis moi !"],['tel',"Je ne reconnais pas ta voix…"],['yvan',"Qui est-ce ?"],['tel',"Ce n'est pas ce qui était prévu."]]);
  S.cab='raccroche';S.cabT=Date.now();sfx('raccroche');await pause(900);S.cab=null;
  await say('moi',"…Il a raccroché. Super.");
}

// ----- Vue zoomée : l'intérieur de la cabine -----
function combine(x,y,rot){g.save();g.translate(Math.round(x),Math.round(y));g.rotate(rot);P(-5,-28,10,8,'#111');P(-3,-20,6,40,'#111');P(-5,20,10,8,'#111');P(-2,-19,1,38,'#2a2a30');P(-4,-27,8,1,'#333');g.restore()}
function combineK(){const d=Date.now()-(S.cabT||0);if(S.cab==='decroche')return Math.min(1,d/1000);if(S.cab==='raccroche')return Math.max(0,1-d/800);return 0}
SCENES.cabine={nom:'Cabine téléphonique',fixe:1,
  dessin(){const t=Date.now();
    // vitres sur les côtés : rue floue sous la pluie
    vgrad(0,H,'#2a3448','#141a26');
    flou(1.5,()=>{for(let i=0;i<9;i++){const x=(i*37)%300,y=40+(i*53)%110;halo(x,y,10+i%3*4,i%2?'rgb(255,210,130)':'rgb(160,190,255)',.5)}});
    for(let i=0;i<40;i++){const x=(i*29+t/30)%W,y=(i*47+t/9)%H;P(x,y,1,3,'rgba(220,235,255,.35)')}
    // montants rouges et petits carreaux
    P(0,0,30,H,'#a51a24');P(290,0,30,H,'#a51a24');P(0,0,W,14,'#8a141c');P(28,0,2,H,'#e0434c');P(290,0,2,H,'#e0434c');
    for(let x of[30,60,230,260])P(x,14,2,H-14,'#c3202b');for(let y=40;y<H;y+=36){P(30,y,60,2,'#c3202b');P(230,y,60,2,'#c3202b')}
    g.fillStyle='#fff';P(110,3,100,9,'#f3eee0');g.fillStyle='#8a141c';g.font="bold 8px Georgia";texte('TELEPHONE',130,11);
    // panneau du fond
    P(90,14,140,H-14,'#2a2226');P(90,14,140,2,'#3e3438');P(90,14,2,H-14,'#3e3438');
    [[98,30,16,10,'#f0c766'],[100,46,12,14,'#7ad0ff'],[206,28,14,9,'#ff8ab0'],[208,44,12,12,'#b8f08a']].forEach(([x,y,w,h,c])=>{P(x,y,w,h,c);P(x+2,y+3,w-4,1,'#333');P(x+2,y+6,w-6,1,'#333')});
    // boîtier du téléphone
    P(126,26,72,92,'#1a1a1e');P(126,26,72,2,'#3a3a40');P(196,26,2,92,'#0c0c0e');
    P(134,34,56,12,'#0e1a12');g.fillStyle='#5aff8a';g.font="bold 7px Georgia";texte(S.cab==='sonne'?'APPEL…':'INSÉRER',140,43);
    P(176,52,10,3,'#000');P(175,51,12,1,'#55555c');
    for(let r=0;r<4;r++)for(let c=0;c<3;c++){P(140+c*12,58+r*12,9,9,'#b8b8c0');P(140+c*12,58+r*12,9,1,'#e0e0e8');P(143+c*12,61+r*12,3,3,'#55555c')}
    P(176,64,10,40,'#26262c');P(178,66,6,36,'#0c0c0e');
    // crochet du combiné
    P(112,40,14,6,'#2a2a30');P(112,40,14,1,'#55555c');
    // tablette
    P(100,122,120,6,'#6a4426');P(100,122,120,1,'#a8784a');P(104,128,112,3,'#3a2414');
    P(106,108,22,14,'#d8c070');P(106,108,22,2,'#f0d890');P(108,113,18,1,'#8a7030');P(108,116,14,1,'#8a7030');
    // combiné : sur son crochet, puis la main d'Yvan le porte à son oreille (k : 0 → 1)
    const k=combineK(),e=u=>u<.5?2*u*u:1-(-2*u+2)**2/2;
    let hx,hy,cx=111,cy=66,rot=0;
    if(k<.4){const u=e(k/.4);hx=10+(111-10)*u;hy=200+(74-200)*u}
    else{const u=e((k-.4)/.6);cx=111+(50-111)*u;cy=66+(60-66)*u;rot=-.9*u;hx=cx+4*(1-u);hy=cy+8}
    const tr=S.cab==='sonne'?((t/40|0)%2?1:-1):0,parle=S.cab==='decroche'&&k>=1?Math.sin(t/260)*1.2:0;
    const dx=-90*(1-Math.min(1,k/.4));
    if(k>0){ // Yvan de trois quarts dos, au premier plan à gauche : corps, épaules, cou, tête
      poly([[-40+dx,H],[96+dx,H],[90+dx,128],[70+dx,104],[44+dx,96],[-14+dx,96],[-40+dx,120]],'#2b2733');g.strokeStyle='rgba(150,140,190,.5)';g.beginPath();g.moveTo(-14+dx,96);g.lineTo(44+dx,96);g.lineTo(70+dx,104);g.lineTo(90+dx,128);g.stroke();
      poly([[60+dx,H],[96+dx,H],[90+dx,128],[72+dx,108]],'#26232e');P(-14+dx,100,60,1,'#2c2834');
      P(28+dx,84,18,16,'#c8946a');
      g.fillStyle='#141216';g.beginPath();g.ellipse(14+dx,58,34,42,0,0,7);g.fill();P(30+dx,24,8,4,'#2a2830');
      P(38+dx,54,7,13,'#d9a77c');P(40+dx,57,3,7,'#b8845a');P(34+dx,70,16,26,'#d9a77c');P(44+dx,74,6,3,'#2a2018');
      P(40+dx,50,26,2,'#0c0c0c');P(8+dx,94,46,12,'#b8202c');P(8+dx,94,46,2,'#e04a54');P(40+dx,104,9,26,'#b8202c');P(40+dx,112,9,1,'#7a1018');P(40+dx,120,9,1,'#7a1018')}
    g.strokeStyle='#111';g.lineWidth=2;g.beginPath();g.moveTo(128,96);
    const bx=cx+Math.sin(-rot)*22,by=cy+Math.cos(rot)*22;g.bezierCurveTo(118,130,bx+10,by+30,bx,by);g.stroke();g.lineWidth=1;
    if(k>0){g.lineCap='round';g.strokeStyle='#2b2733';g.lineWidth=15;g.beginPath();g.moveTo(72+dx,112);g.quadraticCurveTo(hx+10,hy+60,hx,hy+6);g.stroke();
      g.strokeStyle='#2c2834';g.lineWidth=5;g.beginPath();g.moveTo(76+dx,112);g.quadraticCurveTo(hx+14,hy+56,hx+2,hy+4);g.stroke();g.lineWidth=1;g.lineCap='butt'}
    combine(cx+tr,cy+parle,rot);
    if(S.cab==='sonne'){g.strokeStyle='rgba(255,240,180,.8)';for(let q=0;q<2;q++){const r=20+q*7+((t/80)%6);g.beginPath();g.arc(111,62,r,-.6,.6);g.stroke();g.beginPath();g.arc(111,62,r,Math.PI-.6,Math.PI+.6);g.stroke()}}
    if(k>0){P(hx-6,hy-4+parle,12,12,'#d9a77c');P(hx-8,hy-1+parle,3,8,'#c8946a');P(hx+5,hy+parle,3,7,'#c8946a');P(hx-6,hy-4+parle,12,1,'#ecc09a')}
    // la pièce sur la tablette, à côté du combiné
    if(!S.f.piece){const b=.5+.5*Math.sin(t/150);halo(150,118,14,'rgb(255,220,120)',.4+b*.3);P(146,114,8,8,'#f0c766');P(147,115,6,6,'#ffe9a0');P(149,117,2,2,'#c99a3a');P(147,114,2,1,'#fff')}
  },
  objets:[
    {id:'piece',nom:'pièce brillante',x:142,y:110,w:16,h:14,defaut:'prendre',cache:()=>S.f.piece,
      regarder:"Une pièce oubliée juste à côté du combiné. Étrange, je ne vois pas de quel pays ça peut venir.",prendre:prendrePiece},
    {id:'combine',nom:'combiné',x:102,y:36,w:20,h:60,
      regarder:()=>say('moi',S.f.piece?"Le combiné. Raccroché. J'aimerais qu'il le reste.":"Un vieux combiné noir, bien lourd. Le fil est tout entortillé."),
      utiliser:()=>say('moi',S.f.piece?"Je ne décroche plus. Ce téléphone a des projets pour moi, et moi aucun pour lui.":"Je décroche… tonalité. Personne au bout. Je raccroche."),
      prendre:"Il est attaché. Et puis je n'ai personne à appeler."},
    {id:'telephone_cab',nom:'téléphone',x:126,y:26,w:72,h:84,regarder:"Un téléphone à pièces. L'écran dit « INSÉRER ». Insérer quoi ? Et où ?",utiliser:"Je n'ai pas de monnaie anglaise. Enfin… pas encore."},
    {id:'annuaire',nom:'annuaire',x:104,y:106,w:26,h:16,regarder:"Un annuaire tout gondolé par la pluie. Toutes les pages du « Y » ont été arrachées. Y… mais qu'est-ce que ça peut bien vouloir dire ?",prendre:"Il est trempé. Non merci."},
    {id:'sortie_cab',nom:'sortir de la cabine',x:0,y:150,w:W,h:30,defaut:'utiliser',regarder:"La porte. Et la pluie derrière.",
      utiliser:async()=>{await go('londres',{yvan:56});anim('yvan').dir='face'}},
  ],
  ambiance:{nuit:.4,voile:'#05060c',teinte:'rgba(255,90,90,.2)'},
  lumieres:()=>[{x:160,y:10,r:110,c:'rgba(255,230,190,.25)'},{x:162,y:40,r:30,c:'rgba(90,255,140,.2)'},...(S.f.piece?[]:[{x:150,y:118,r:20,c:'rgba(255,220,120,.4)',vacille:1}])],
  dessinAvant:()=>vignette(),
  async entree(){S.f.cabine=1;await say('moi',"Il fait sombre là-dedans… Tiens ? Une pièce qui brille, posée à côté du combiné.")},
};
MUSIQUE_SCENE.cabine='magie';AMBIANCE_SCENE.cabine='pluie';

async function entrerBus(){
  if(S.f.busNormal)return say('moi',"Non merci. J'ai assez donné.");
  await marcher('yvan',206);
  await go('bus',{yvan:12});
}

// ----- Le bus-musée (plus grand dedans que dehors) -----
const BIZARRE=()=>S.f.busNormal;
SCENES.bus={nom:'Bus-musée',
  dessin(){if(S.f.busNormal)return busNormal();const t=Date.now();
    vgrad(0,H,'#2a0a20','#12040e');
    poly([[0,0],[W,0],[190,58],[130,58]],'#1e0818');
    for(let i=0;i<8;i++){const x=i*46;g.strokeStyle='rgba(240,199,102,.12)';g.beginPath();g.moveTo(x,0);g.lineTo(130+i*8.6,58);g.stroke()}
    poly([[0,0],[130,58],[130,122],[0,H]],'#4a1638');poly([[W,0],[190,58],[190,122],[W,H]],'#3e1230');
    for(let i=0;i<6;i++){const k=i/6;g.strokeStyle='rgba(0,0,0,.18)';g.beginPath();g.moveTo(k*130,k*58);g.lineTo(k*130,H-k*58);g.stroke();g.beginPath();g.moveTo(W-k*130,k*58);g.lineTo(W-k*130,H-k*58);g.stroke()}
    // cadres dorés qui s'éloignent
    [[50,40,22,26],[96,52,12,16],[118,57,7,9]].forEach(([x,y,w,h])=>{P(x,y,w,h,'#c99a3a');P(x+2,y+2,w-4,h-4,'#2a1a40');P(W-x-w,y,w,h,'#c99a3a');P(W-x-w+2,y+2,w-4,h-4,'#1a3a30')});
    // fond du couloir : l'alcôve du singe
    P(130,58,60,64,'#24081c');g.fillStyle='#3a1030';g.beginPath();g.arc(160,78,18,Math.PI,0);g.fill();P(142,78,36,44,'#3a1030');
    // sol en damier qui fuit vers le fond
    poly([[130,122],[190,122],[W,H],[0,H]],'#2a1a14');
    for(let r=0;r<7;r++){const y0=122+(H-122)*(r/7)**1.6,y1=122+(H-122)*((r+1)/7)**1.6;for(let c=-8;c<8;c++){if((r+c)&1)continue;
      const ax=y=>{const k=(y-122)/(H-122);return 160+c*(3.75+k*36.25)},bx=y=>{const k=(y-122)/(H-122);return 160+(c+1)*(3.75+k*36.25)};
      poly([[ax(y0),y0],[bx(y0),y0],[bx(y1),y1],[ax(y1),y1]],'#4a3020')}}
    // socle + singe
    P(151,104,18,18,'#5a4a3a');P(151,104,18,2,'#8a7a5a');
    const br=S.singeBrille?1:0;
    P(154,90,12,14,'#8a5a2a');P(155,92,10,6,'#c8242c');P(155,92,10,1,'#e8c35a');
    P(155,82,10,9,'#8a5a2a');P(153,84,2,3,'#8a5a2a');P(165,84,2,3,'#8a5a2a');P(156,84,8,6,'#e0b080');
    P(156,85,3,3,'#fff');P(161,85,3,3,'#fff');P(157,86,1,1,'#000');P(163,85,1,1,'#000');P(158,89,4,1,'#6a1010');P(158,90,4,1,'#fff');
    P(158,81,4,1,'#000');
    const cy=(t/300|0)%2;P(149,93-cy,5,5,'#f0c766');P(150,94-cy,3,3,'#ffe9a0');P(166,93-cy,5,5,'#f0c766');P(167,94-cy,3,3,'#ffe9a0');
    if(br){g.save();g.globalCompositeOperation='lighter';halo(160,92,40+Math.random()*10,'rgb(255,230,150)',.9);g.restore()}
    // porte de sortie
    P(0,96,13,64,'#120610');P(0,96,13,2,'#c99a3a');P(10,126,2,4,'#c99a3a');
  },
  objets:[
    {id:'sortie',nom:'sortie',x:0,y:94,w:16,h:66,defaut:'utiliser',regarder:"La sortie. Ma meilleure amie dans ce bus.",utiliser:sortirBus},
    {id:'hote',nom:"l'hôte",humain:true,x:30,y:112,w:24,h:48,cache:BIZARRE,dessin(){const a=anim('hote');a.marche=false;a.dir='face';drawPerso('hote',40);
        P(24,132,32,28,'#5a3020');P(22,130,36,3,'#8a5a30');P(22,130,36,1,'#b88a50');for(let y=137;y<158;y+=7)P(26,y,28,1,'#4a2418');
        P(43,121,12,9,'#2a2a2e');P(44,122,10,3,'#5aff8a');P(45,127,2,1,'#888');P(49,127,2,1,'#888');P(25,124,6,6,'#f0ece0');P(26,125,4,1,'#8a8a8a');
        P(27,140,24,9,'#f3e2b0');g.fillStyle='#5a1020';g.font="bold 7px Georgia";texte('0 £',33,147)},
      regarder:"Un drôle de gus qui a l'air de faire la tronche.",
      parler:()=>dire([['hote',"Entrez, entrez ! C'est gratuit ! N'ayez pas peur !"],['moi',"C'est le « n'ayez pas peur » qui me fait peur."]]),
      with:{piece:()=>say('hote',"Gardez-la, mon ami. Ici, tout est gratuit… presque tout.")}},
    {id:'momie',nom:'momie',x:62,y:108,w:24,h:52,cache:BIZARRE,
      dessin(){const x=62,y=108;P(x,y,24,52,'#b88a30');P(x,y,24,2,'#e8c35a');P(x+1,y+2,1,50,'#e8c35a');P(x+22,y+2,1,50,'#8a6420');
        P(x+4,y+4,16,46,'#d8d0b0');for(let j=y+9;j<y+49;j+=4)P(x+4,j,16,1,'#b0a888');P(x+5,y+12,7,1,'#c8c0a0');P(x+12,y+24,7,1,'#c8c0a0');
        P(x+7,y+6,10,8,'#e0d8c0');P(x+8,y+9,3,1,'#120808');P(x+13,y+9,3,1,'#120808');P(x+9,y+12,6,1,'#6a5a40');P(x+3,y+3,18,1,'#3a6ab0')},
      regarder:"Une momie dans son sarcophage, à peu près de ma taille. Elle a un bracelet en plastique « TOURISTE PARISIEN ».",
      prendre:"Je ne prends pas de momie. Même gratuite.",parler:"…Elle n'a pas répondu. Ouf."},
    {id:'vaudou',nom:'table vaudou',x:94,y:108,w:44,h:52,cache:BIZARRE,
      dessin(){g.save();g.translate(40,0);P(54,130,44,4,'#4a2a1a');P(56,134,3,26,'#3a1e12');P(93,134,3,26,'#3a1e12');
        P(62,117,9,13,'#a08060');P(63,111,7,7,'#a08060');P(64,113,2,1,'#2a1a10');P(67,113,2,1,'#2a1a10');[[62,119,'#c22'],[69,121,'#f0c766'],[65,124,'#c22'],[66,112,'#f0c766']].forEach(([x,y,c])=>{P(x,y,1,1,c);P(x-1,y-1,1,1,'#ccc')});
        P(76,123,9,7,'#e8e0d0');P(78,125,2,2,'#1a1010');P(81,125,2,2,'#1a1010');P(79,128,3,1,'#1a1010');
        P(89,119,2,11,'#f0e0c0');P(93,121,2,9,'#f0e0c0');const f=(Date.now()/90|0)%2;P(89,117-f,2,2,'#ffb030');P(93,119+f-1,2,2,'#ffb030');g.restore()},
      regarder:"Une poupée pleine d'épingles, un crâne et des bougies. L'étiquette dit : « Souvenir de vacances ». De qui ?",
      prendre:"Toucher la poupée ? Et si c'était quelqu'un que je connais ?",utiliser:"Je ne touche à rien."},
    {id:'citrouilles',nom:'citrouilles dorées volantes',x:80,y:20,w:160,h:46,loin:1,cache:BIZARRE,
      dessin(){const t=Date.now()/700;[[100,0],[160,2],[214,4]].forEach(([x,p])=>{const y=34+Math.sin(t+p)*6,xx=x+Math.sin(t*.7+p)*8;
        halo(xx,y,14,'rgb(255,200,80)',.35);g.fillStyle='#e8a820';g.beginPath();g.ellipse(xx,y,7,5,0,0,7);g.fill();P(xx-1,y-1-4,1,6,'#c88a10');P(xx+3,y-1-3,1,5,'#c88a10');P(xx-5,y-2,1,4,'#c88a10');P(xx,y-7,2,2,'#3a7a2a');P(xx-3,y-3,2,1,'#fff6c0')})},
      regarder:"Des citrouilles en or qui volent… pourquoi ?",
      prendre:"Trop haut. Et puis on ne vole pas ce qui vole déjà."},
    {id:'alien',nom:'alien vert',x:226,y:96,w:24,h:64,cache:BIZARRE,
      dessin(){const x=238,t=Date.now(),cl=(t/130|0)%30===0;
        P(x-2,SOL-30,4,16,'#4ab04a');P(x-5,SOL-30,10,14,'#3a3a48');P(x-6,SOL-14,3,14,'#4ab04a');P(x+3,SOL-14,3,14,'#4ab04a');P(x-8,SOL-28,2,14,'#4ab04a');P(x+6,SOL-28,2,14,'#4ab04a');P(x-9,SOL-14,3,2,'#4ab04a');P(x+6,SOL-14,3,2,'#4ab04a');
        g.fillStyle='#5ad05a';g.beginPath();g.ellipse(x,SOL-42,10,12,0,0,7);g.fill();P(x-6,SOL-50,4,3,'#8af08a');
        if(!cl){g.fillStyle='#050508';g.beginPath();g.ellipse(x-4,SOL-42,3.5,5,-.5,0,7);g.fill();g.beginPath();g.ellipse(x+4,SOL-42,3.5,5,.5,0,7);g.fill();P(x-5,SOL-45,1,1,'#fff');P(x+3,SOL-45,1,1,'#fff')}
        else{P(x-6,SOL-42,4,1,'#050508');P(x+2,SOL-42,4,1,'#050508')}P(x-1,SOL-34,2,1,'#2a7a2a');P(x-1,SOL-54,2,4,'#4ab04a');P(x-2,SOL-57,4,3,'#c8ff60')},
      regarder:"Un alien vert. Le classique : grosse tête, grands yeux noirs, petit corps. Heuuu, il vient de cligner des yeux.",
      parler:()=>dire([['moi',"Euh… je viens en paix ?"],['moi',"…Il a penché la tête. Je ne sais pas si c'est bon signe."]]),
      prendre:"Je ne kidnappe pas d'extraterrestre. C'est plutôt eux qui font ça, normalement."},
    {id:'lapin',nom:'lapin géant',x:268,y:74,w:34,h:86,cache:BIZARRE,
      dessin(){const x=285,t=Date.now(),inc=Math.sin(t/1400)*1.5;
        P(x-6,SOL-14,5,14,'#4a3a2a');P(x+1,SOL-14,5,14,'#4a3a2a');P(x-8,SOL-2,8,2,'#d8d0c8');P(x+1,SOL-2,8,2,'#d8d0c8');
        P(x-9,SOL-40,18,26,'#5a4632');P(x-1,SOL-40,2,24,'#3a2a1a');P(x-12,SOL-38,3,20,'#5a4632');P(x+9,SOL-38,3,20,'#5a4632');P(x-12,SOL-18,3,3,'#d8d0c8');P(x+9,SOL-18,3,3,'#d8d0c8');
        g.save();g.translate(x,SOL-50);g.rotate(inc*.05);
        P(-9,-11,18,20,'#d8d0c8');P(-9,-11,18,2,'#f0ece4');P(8,-9,1,18,'#a8a098');
        P(-8,-38,5,28,'#d8d0c8');P(-7,-36,3,24,'#e8b0b8');P(3,-36,5,20,'#d8d0c8');P(4,-34,3,16,'#e8b0b8');P(3,-16,5,6,'#d8d0c8');
        P(-6,-5,4,5,'#000');P(2,-5,4,5,'#000');P(-5,-4,1,1,'#c02020');P(3,-4,1,1,'#c02020');
        P(-1,1,2,2,'#c88a90');P(-6,4,12,3,'#200808');for(let i=-5;i<6;i+=2)P(i,4,1,2,'#f0ecd0');
        g.restore()},
      regarder:"Un lapin géant, debout, en costume marron. Ce sourire… pourquoi il a autant de dents ?",
      parler:()=>dire([['moi',"…Salut, grand lapin."],['moi',"Il n'a rien dit. Mais j'ai l'impression qu'il a souri un peu plus."]]),
      prendre:"Je ne touche pas au lapin. Je ne regarde même plus le lapin."},
    {id:'visiteuse',nom:'visiteuse',humain:true,x:193,y:118,w:14,h:42,cache:BIZARRE,dessin(){const a=anim('visiteuse');a.marche=false;a.dir='face';drawPerso('visiteuse',200)},
      regarder:"Une dame aux cheveux roses, jumelles autour du cou. C'est elle qui m'effraie le plus.",
      parler:()=>dire([['visiteuse',"Chut ! Elle a cligné de l'œil. Je l'ai vu. Personne ne me croit jamais."],['moi',"…Moi, je vous crois. C'est bien ça le problème."]])},
    {id:'singe',nom:'singe aux cymbales',x:148,y:80,w:24,h:26,cache:BIZARRE,defaut:'regarder',
      regarder:async()=>{S.f.fente=1;await dire([['moi',"Un singe mécanique avec ses cymbales. J'ai déjà vu ça quelque part… et ça finissait mal."],['moi',"…Normal. Sauf ce regard. On dirait qu'il me suit des yeux."],['moi',"Et sur le dessus de sa tête… il y a une fente ?"]])},
      prendre:"Ah non. Je ne le touche pas. Il me regarde.",utiliser:"Le remonter ? Pour qu'il se mette à taper ses cymbales tout seul la nuit ? Non.",
      parler:"Je ne parle pas au singe. Je ne veux surtout pas qu'il me réponde.",
      with:{piece:singePiece}},
    {id:'siege',nom:'sièges',x:40,y:110,w:240,h:30,cache:()=>!S.f.busNormal,regarder:"Des sièges rouges, un peu râpés. Aucune momie. Aucune citrouille. Aucun singe."},
  ],
  particules(){if(S.f.busNormal)return;
    if(S.singeBrille)emettre(80,()=>({k:'singe',scene:'bus',x:160+(Math.random()-.5)*40,y:92+(Math.random()-.5)*30,vx:(Math.random()-.5)*1.5,vy:(Math.random()-.5)*1.5,vie:30+Math.random()*30,t:1,c:'#fff3b0',glow:1}));
    emettre(18,()=>({k:'pous',scene:'bus',x:Math.random()*W,y:40+Math.random()*100,vx:(Math.random()-.5)*.1,vy:-.05,vie:200+Math.random()*200,t:1,c:'#f0c0ff',a:.5}))},
  get ambiance(){return S.f.busNormal?{nuit:.12,voile:'#000',teinte:'rgba(255,240,200,.12)'}:{nuit:.5,voile:'#10040c',teinte:'rgba(200,80,160,.3)'}},
  lumieres:()=>S.f.busNormal?[{x:160,y:40,r:160}]:[{x:160,y:92,r:44,c:'rgba(255,220,140,.4)'},{x:131,y:118,r:22,c:'rgba(255,180,80,.45)',vacille:1},{x:160,y:36,r:90,c:'rgba(255,200,80,.2)'},{x:238,y:118,r:30,c:'rgba(120,255,120,.25)'},{x:285,y:110,r:32},{x:74,y:126,r:32},{x:40,y:122,r:26,c:'rgba(120,255,160,.15)'},{x:200,y:130,r:24},...persoLumiere(30)],
  dessinAvant:()=>vignette(),
  async entree(){
    await say('hote',"Entrez, entrez ! C'est gratuit ! N'ayez pas peur !");
    anim('yvan').tremble=true;
    await dire([['yvan',"J'ai peur. J'ai très peur."],['yvan',"…Mais c'est gratuit."]]);
    anim('yvan').tremble=false;
    await pause(1300);
    await marcher('yvan',150);
    await dire([['moi',"…Waouh. Ça a l'air beaucoup plus grand dedans que dehors."],['moi',"Comment c'est possible ? C'est un bus."]])},
};
function busNormal(){
  vgrad(0,SOL,'#d8c8a0','#b8a880');P(0,20,W,2,'#8a7a5a');
  for(let i=0;i<6;i++){const x=18+i*52;P(x,34,42,40,'#7a8a9a');vgrad(36,72,'#9aa8ba','#c8d0d8',x+2,38);P(x,34,42,2,'#5a5040')}
  for(let i=0;i<6;i++){const x=24+i*50;P(x,112,34,10,'#a01a24');P(x,98,6,24,'#8a1420');P(x,112,34,2,'#c8343e')}
  [60,160,260].forEach(x=>P(x,20,2,140,'#e8c030'));P(0,96,13,64,'#4a4a4a');P(0,96,13,2,'#888');
  vgrad(SOL,H,'#5a5a60','#3a3a40');for(let x=0;x<W;x+=8)P(x,SOL+2,4,1,'#4a4a50');
}
async function singePiece(){
  retirer('piece');S.f.singe=1;
  await say('moi',"Allez… dans la fente.");
  sfx('cymbales');S.singeBrille=1;await pause(900);sfx('magie');await pause(700);
  sfx('eblouit');S.flash=1;await pause(250);S.flash=1;await pause(250);S.flash=1;
  await say('moi',"Aaah ! Mes yeux ! Ça brille !");
  S.singeBrille=0;S.f.busNormal=1;MUSIQUE_SCENE.bus='magie';sonScene('bus');S.flash=1;await pause(600);
  await dire([['moi',"…"],['moi',"Hein ? C'est… un bus. Juste un bus normal. J'ai rêvé ou quoi ?"],['moi',"Et je suis tout seul."]]);
}
async function sortirBus(){
  await go('londres',{yvan:192});
  if(!S.f.busNormal||S.f.manteau)return;
  S.f.manteau=1;
  await say('moi',"Ouf. De l'air. De la pluie, mais de l'air.");
  const a=anim('manteau');S.pnj.manteau=330;
  if(!TEST&&!S.passe)while(S.pnj.manteau>210){a.marche=true;a.dir='g';a.pas++;S.pnj.manteau-=.55;await pause(16)}
  S.pnj.manteau=null;a.marche=false;
  await dire([['moi',"…Un drôle de gars vient de rentrer. Sans même me regarder."],['moi',"Il a l'air de savoir exactement où il va. Lui."]]);
  await noir(true);
  await carton("Pendant ce temps, du côté de Rod…");
  await debutRod();
}

