// ===== Introduction : l'anniversaire (appartement) puis le canapé d'Yvan =====
const CADEAU={etape:0}; // 0 sur la table, 1 dans les mains d'Yvan, 2 ouvert
function boite(x,y,ouverte){
  P(x-8,y,16,11,'#b8283a');P(x-8,y,16,1,'#e04a5a');P(x+6,y,2,11,'#8a1c2a');P(x-1,y,2,11,'#f0c766');
  if(!ouverte){P(x-9,y-3,18,3,'#c8304a');P(x-1,y-3,2,3,'#f0c766');P(x-4,y-6,3,3,'#f0c766');P(x+1,y-6,3,3,'#f0c766');P(x-1,y-5,2,2,'#c99a3a')}
  else{P(x-12,y-4,6,2,'#c8304a');P(x-14,y-2,4,1,'#8a1c2a');P(x-7,y-2,14,2,'#2a2f78');}
}
function chapeauCadeau(x,y){P(x-7,y,14,2,'#20245e');for(let i=0;i<10;i++){const w=10-i;P(x-Math.round(w/2)+(i>6?i-6:0),y-1-i,w,1,'#2a2f78')}
  P(x-4,y-2,9,1,'#f0c766');P(x-1,y-6,2,2,'#f0c766');P(x+4,y-11,1,1,'#f0c766')}

SCENES.appart={nom:'Chez Solène',
  dessin(){
    vgrad(0,SOL,'#6a4840','#46302c');for(let x=4;x<W;x+=14)P(x,0,1,SOL,'rgba(0,0,0,.09)');P(0,SOL-12,W,12,'#3a2622');P(0,SOL-12,W,1,'#8a6a50');
    // fenêtre au crépuscule
    P(18,26,62,70,'#2e201c');vgrad(30,92,'#2a2f5a','#d8805a',22,54);
    g.fillStyle='#1a1430';[[22,70,10],[32,62,12],[44,74,9],[53,58,14],[67,68,9]].forEach(([x,y,w])=>g.fillRect(x,y,w,92-y));
    for(let i=0;i<8;i++)P(24+i*7,76+(i%3)*5,1,2,'#ffd98a');P(48,26,2,70,'#2e201c');P(18,58,62,2,'#2e201c');P(14,94,70,4,'#5a3a2a');
    // affiche de foot de Rod (écharpe)
    for(let i=0;i<9;i++)P(100+i*5,44,5,7,i%2?'#f2f2f2':'#c22');P(98,42,2,11,'#555');P(146,42,2,11,'#555');
    // bibliothèque de BD (Solène)
    P(246,30,62,118,'#4a2e1e');P(246,30,62,2,'#6a4a2e');
    for(let r=0;r<4;r++){P(248,58+r*28,58,3,'#2e1c12');for(let i=0;i<11;i++){const h=14+((i*7+r*3)%8);P(250+i*5,58+r*28-h,4,h,['#c8402e','#3a6ab0','#e8c35a','#4a8a4a','#8a4ab0','#e07a3a'][(i+r)%6])}}
    // suspension au-dessus de la table
    P(160,0,1,56,'#222');g.fillStyle='#2a3a2a';g.beginPath();g.moveTo(150,66);g.lineTo(170,66);g.lineTo(165,56);g.lineTo(155,56);g.fill();P(152,66,16,1,'#ffe9a8');
    vgrad(SOL,H,'#6b4426','#3a2414');for(let x=0;x<W;x+=30)P(x,SOL,1,20,'#4a2e18');
    // guirlande d'anniversaire
    for(let i=0;i<14;i++)P(88+i*11,18+Math.round(Math.sin(i/2)*3),4,5,['#e04a5a','#f0c766','#4ab0e0','#7ad07a'][i%4]);
  },
  devant(){
    // la table cache le bas des personnages : ils sont assis autour
    P(92,134,136,4,'#9a6a40');P(92,134,136,1,'#c89060');P(96,138,128,7,'#6a4426');P(100,145,5,15,'#4a2e18');P(215,145,5,15,'#4a2e18');
    P(100,130,6,4,'#f2f2f2');P(101,128,4,2,'#f0c766');P(216,129,5,5,'#d8e8f0'); // verres
    P(126,131,28,3,'#f2ece0');P(132,126,16,5,'#7a3a22');P(132,126,16,1,'#e8d0a0');P(139,121,1,5,'#f2f2f2');P(139,119,1,2,'#ffcf5a'); // gâteau
    if(CADEAU.etape===0)boite(184,123);
    else{const x=S.pos.yvan;boite(x,128,CADEAU.etape===2);if(CADEAU.etape===2){chapeauCadeau(x+15,121);P(x-12,127,4,8,'#5b1f6e')}}
  },
  ambiance:{nuit:.38,voile:'#1a0e10',teinte:'rgba(255,170,100,.3)'},
  lumieres:()=>[{x:160,y:70,r:95,c:'rgba(255,214,150,.4)'},{x:50,y:70,r:40,c:'rgba(255,150,100,.25)'},{x:139,y:118,r:16,c:'rgba(255,200,90,.6)',vacille:1}],
  particules(){if(CADEAU.etape===2)emettre(30,()=>({k:'magie',scene:'appart',x:S.pos.yvan-10+Math.random()*20,y:112+Math.random()*12,vx:(Math.random()-.5)*.4,vy:-.3-Math.random()*.5,vie:80+Math.random()*60,t:1,c:['#ffd86a','#b9a8ff','#ffffff'][Math.random()*3|0],glow:1}))},
  premierPlan(){couche(-16,()=>flou(1.3,()=>{g.fillStyle='#160c0a';g.beginPath();g.ellipse(-4,170,40,30,0,0,7);g.fill();P(296,96,30,84,'#160c0a');P(300,92,24,6,'#2a1a14')}))},
  dessinAvant:()=>vignette(),
  async entree(){
    S.tenue='neutre';CADEAU.etape=0;Object.assign(S.posY,{yvan:154,rod:154,solene:154});Object.assign(S.pos,{solene:116,yvan:160,rod:204});
    await dire([
      ['solene',"Bon. Avant le gâteau, on a un petit quelque chose pour toi."],
      ['rod',"De la part de nous deux. Allez, ouvre !"]]);
    CADEAU.etape=1;await pause(500);
    await say('yvan',"Voyons voir…");
    CADEAU.etape=2;S.flash=.5;await pause(700);
    await say('yvan',"…Une tenue de sorcier. Avec le chapeau pointu.");
    await say('yvan',"Vous avez cru que j'avais quel âge ?");
    anim('rod').rire=anim('solene').rire=true;
    await dire([['rod',"Hahaha ! Regarde sa tête !"],['solene',"Pardon, pardon… mais le chapeau va super bien avec ta moustache."]]);
    anim('rod').rire=anim('solene').rire=false;
    await noir(true);
    await go('salon',{yvan:92,rod:null,solene:null});
  }
};

SCENES.salon={nom:"Chez Yvan",
  dessin(){
    vgrad(0,SOL,'#232a44','#161a2c');for(let x=6;x<W;x+=18)P(x,0,1,SOL,'rgba(255,255,255,.03)');
    P(196,24,48,50,'#0e1020');vgrad(28,70,'#0c1430','#2a2a5a',200,40);P(230,34,8,8,'#e8e6ff');P(219,24,2,50,'#0e1020');P(196,48,48,2,'#0e1020');
    for(let i=0;i<10;i++)P(201+(i*13)%38,30+(i*7)%36,1,1,'#fff');
    P(40,40,30,22,'#3a3050');P(42,42,26,18,'#7a5a8a');P(48,46,14,10,'#c8a050'); // cadre photo du groupe
    // télé
    P(262,104,48,6,'#2a2420');P(266,110,4,50,'#2a2420');P(302,110,4,50,'#2a2420');P(264,74,44,30,'#0a0a0a');
    const fl=.6+Math.sin(Date.now()/120)*.15+Math.sin(Date.now()/37)*.1;g.fillStyle=`rgba(110,160,255,${fl})`;g.fillRect(266,76,40,26);
    // canapé (dossier et assise arrière)
    P(58,106,114,30,'#5a3a62');P(58,106,114,2,'#7a5a84');for(let i=0;i<3;i++)P(62+i*37,110,34,22,'#644270');P(62,130,106,8,'#4a2e52');
    vgrad(SOL,H,'#3a2e2a','#1e1816');P(30,SOL+4,170,12,'#4a2a3a');
  },
  devant(){
    P(56,138,118,18,'#4a2e52');P(56,138,118,2,'#6a4a74');P(50,114,10,46,'#3e2646');P(170,114,10,46,'#3e2646');P(50,114,10,2,'#6a4a74');P(170,114,10,2,'#6a4a74');
    P(60,156,4,4,'#2a1a1a');P(166,156,4,4,'#2a1a1a');
    boite(136,127,true);chapeauCadeau(137,124);P(126,128,4,9,'#5b1f6e');
  },
  ambiance:{nuit:.62,voile:'#05060f',teinte:'rgba(90,120,220,.35)'},
  lumieres:()=>[{x:286,y:90,r:80,c:'rgba(110,160,255,.3)',vacille:1},{x:230,y:40,r:40,c:'rgba(190,190,255,.2)'},{x:120,y:118,r:46},{x:137,y:116,r:14,c:'rgba(255,214,120,.35)',vacille:1}],
  dessinAvant:()=>vignette(),
  async entree(){
    S.posY.yvan=148;anim('yvan').dir='face';
    await noir(false);await pause(600);
    await say('yvan',"Genre j'ai l'âge pour penser à ces bêtises…");
    await pause(800);await noir(true);
    await carton("Un an plus tard");
    S.tenue='';S.posY={};
    await go('londres',{yvan:70,rod:110,solene:150});
  }
};
