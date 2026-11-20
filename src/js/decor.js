// ===== Décors détaillés (remplacent les dessins simples des scènes) =====
const T0=()=>Date.now();
function pluie(n,c){const t=T0()/16;g.fillStyle=c;for(let i=0;i<n;i++){const x=(i*73+t*1.3)%W,y=(i*41+t*4)%H;g.fillRect(x,y,1,3)}}
function batiment(x,y,w,c,fen){P(x,y,w,SOL-y,c);P(x,y,w,2,shade(c,1.25));P(x+w-2,y,2,SOL-y,shade(c,.8));
  for(let i=x+5;i<x+w-7;i+=11)for(let j=y+8;j<SOL-22;j+=15){const on=((i*7+j*3)%5)<2;P(i,j,6,9,on?fen:'#3d4552');P(i,j+9,6,1,shade(c,1.3));if(on)P(i,j,6,1,'#fff6d0')}}

SCENES.londres.dessin=()=>{
  vgrad(0,110,'#5f7086','#b9c2cc');
  // silhouette lointaine (tour d'horloge générique, dôme)
  couche(10,()=>flou(.6,()=>{g.fillStyle='#7f8b9a';[[10,70,30],[45,62,20],[150,55,8],[170,72,40],[215,66,26]].forEach(([x,y,w])=>g.fillRect(x,y,w,60));
  P(148,40,12,30,'#7f8b9a');P(150,34,8,6,'#7f8b9a');P(153,28,2,6,'#7f8b9a');P(151,45,6,6,'#a9b3be');
  g.beginPath();g.arc(70,66,14,Math.PI,0);g.fill();}));
  batiment(0,32,58,'#6e5649','#ffd98a');batiment(58,48,52,'#83695a','#ffe7a8');batiment(110,28,70,'#5b4a4c','#ffd98a');batiment(180,44,60,'#776154','#ffe1a0');
  // studio
  P(240,18,80,SOL-18,'#241a3a');P(240,18,80,3,'#3b2d5c');vgrad(24,40,'#f6d77a','#c99a3a',244,72);
  g.fillStyle='#241a3a';g.font='bold 8px Georgia';texte('STUDIO TOUR',249,35);
  for(let i=0;i<7;i++)halo(248+i*10,44,6,'rgb(255,220,140)',.6),P(247+i*10,43,2,2,'#fff3c4');
  P(272,106,34,54,'#100a1c');P(274,108,30,52,'#3a2d5c');P(288,108,1,52,'#241a3a');vgrad(108,160,'rgba(255,210,120,.25)','rgba(0,0,0,0)',274,30);
  // trottoir mouillé
  vgrad(SOL,H,'#55555f','#383840');P(0,SOL,W,1,'#9c9ca6');for(let x=0;x<W;x+=26)P(x,SOL+1,1,19,'#44444c');
  g.globalAlpha=.18;P(120,SOL+2,96,10,'#c8242c');P(30,SOL+2,18,8,'#c3202b');g.globalAlpha=1;
  // cabine
  P(29,98,20,62,'#a51a24');P(31,104,16,40,'#c3202b');for(let j=106;j<142;j+=6)for(let i=33;i<45;i+=4)P(i,j,3,5,'#f3e6b0');
  P(28,96,22,4,'#8a141c');P(32,99,14,3,'#fff');P(31,104,1,56,'#e0434c');
  // bus
  P(118,92,100,62,'#c8242c');P(118,92,100,2,'#e0505a');P(118,120,100,2,'#9a1820');
  for(let i=122;i<212;i+=15){P(i,98,12,14,'#cfe0ea');P(i,98,12,2,'#fff');P(i,126,12,14,'#cfe0ea')}
  P(208,126,8,26,'#2a2a2a');P(124,146,90,3,'#9a1820');
  [[132,154],[200,154]].forEach(([x,y])=>{P(x-6,y-4,12,10,'#111');P(x-3,y-1,6,4,'#777')});
};
SCENES.londres.dessinAvant=()=>vignette();

SCENES.quai.dessin=()=>{
  P(0,0,W,SOL,'#3a221d');
  for(let y=22;y<SOL;y+=8)for(let x=(y/8%2)*8-8;x<W;x+=16){const v=.85+((x*13+y*7)%9)/30;P(x,y,15,7,shade('#7a3b2e',v));P(x,y,15,1,shade('#7a3b2e',v*1.2))}
  vgrad(0,26,'#120d1c','#241a32');g.fillStyle='#f0c766';g.font='bold 7px Georgia';texte('PHOTO SOUVENIR — TRAVERSEZ LE MUR',64,15);
  // panneau suspendu
  P(166,22,1,14,'#555');P(194,22,1,14,'#555');P(150,36,60,18,'#1b1424');P(150,36,60,1,'#f0c766');g.fillStyle='#fff';g.font='bold 7px Georgia';texte('Quai  ?',163,49);
  // spot sur le chariot
  halo(232,120,70,'rgb(255,214,150)',.35);
  // boutique
  P(18,58,44,76,'#1b1824');P(22,62,36,44,'#2e5a46');for(let i=0;i<4;i++)P(25+i*8,70,5,26,['#c8242c','#e8c35a','#2a5ab8','#3a8a4a'][i]);
  P(22,62,36,1,'#7fd0a8');g.fillStyle='#f0c766';g.font='bold 7px Georgia';texte('Boutique',26,118);halo(40,84,30,'rgb(120,220,170)',.2);
  vgrad(SOL,H,'#6a6470','#3e3944');P(0,SOL,W,1,'#b0a9b8');for(let x=0;x<W;x+=40)P(x,SOL+6,30,1,'#58525e');
};
SCENES.quai.dessinAvant=()=>vignette();
const chariot=SCENES.quai.objets.find(o=>o.id==='chariot');
chariot.dessin=()=>{const m=S.f.traverse;if(m)return;
  P(236,112,22,48,'rgba(0,0,0,.25)'); // ombre dans le mur
  P(212,124,26,3,'#b8b8c0');P(212,124,26,1,'#e6e6ee');P(208,112,2,14,'#b8b8c0');P(208,112,6,2,'#b8b8c0');
  P(214,128,22,22,'#6b4426');P(214,128,22,2,'#8a5a34');P(216,131,18,7,'#c8a060');P(216,131,18,1,'#e8c890');P(220,141,10,7,'#3a5a8a');P(224,140,2,2,'#e8c35a');
  P(213,150,26,3,'#b8b8c0');[[218,156],[234,156]].forEach(([x,y])=>{P(x-2,y-2,5,5,'#1a1a1a');P(x-1,y-1,2,2,'#666')});
  P(236,112,4,48,shade('#7a3b2e',.7)); // la moitié avalée par le mur
};

SCENES.autre.dessin=()=>{const t=T0();
  vgrad(0,SOL,'#120c2a','#3a2a5e');
  couche(4,()=>{for(let i=0;i<60;i++){const a=.4+.6*Math.abs(Math.sin(t/700+i*1.7));g.globalAlpha=a;P((i*53)%W,(i*29)%86,1,1,'#fff');}g.globalAlpha=1;
  g.fillStyle='rgba(160,140,220,.25)';g.beginPath();g.arc(270,30,14,0,7);g.fill();P(266,24,8,8,'#e8e2ff');
  for(let i=0;i<5;i++){P(i*80-20,64,60,22,'#1d1538');P(i*80,54,20,10,'#1d1538');P(i*80+8,46,4,8,'#1d1538')}});
  // lanternes flottantes
  for(let i=0;i<6;i++){const x=22+i*52,y=30+Math.sin(t/600+i)*4;halo(x+3,y+4,18,'rgb(255,190,90)',.45);P(x,y,7,9,'#ffcf6a');P(x+1,y+1,5,7,'#fff0b8');P(x,y,7,1,'#8a5a2a');P(x,y+8,7,1,'#8a5a2a')}
  g.fillStyle='#e8c35a';g.font='bold 7px Georgia';texte("QUAI DES BRUMES — départ pour l'Académie d'Hiverlune",22,80);
  // train
  P(0,88,W,50,'#174f3b');P(0,88,W,3,'#2f8a68');P(0,132,W,4,'#0e3326');P(0,108,W,2,'#c9a44a');
  for(let x=8;x<W;x+=36){P(x,94,22,12,'#ffe3a0');P(x,94,22,1,'#fff6d8');halo(x+11,100,16,'rgb(255,220,150)',.25)}
  for(let x=12;x<W;x+=40){P(x,136,14,9,'#1a1a1a');P(x+4,139,6,3,'#444')}
  // vapeur
  for(let i=0;i<5;i++){const k=((t/40+i*30)%150),a=1-k/150;g.fillStyle=`rgba(230,230,245,${a*.5})`;g.beginPath();g.arc(300-k*.6,84-k*.3,4+k/12,0,7);g.fill()}
  vgrad(SOL-14,SOL,'#4a4260','#2f2944');vgrad(SOL,H,'#2a2436','#17121f');
  g.fillStyle='rgba(190,180,230,.12)';for(let i=0;i<4;i++){g.beginPath();g.ellipse((i*97+t/50)%(W+80)-40,SOL-4,60,6,0,0,7);g.fill()}
};
SCENES.autre.dessinAvant=()=>vignette();

// ===== Ambiances, lumières, particules, premiers plans =====
Object.assign(SCENES.londres,{reflet:1,
  ambiance:{nuit:.3,voile:'#1a2440',teinte:'rgba(90,130,200,.35)'},
  lumieres:()=>[{x:280,y:40,r:50,c:'rgba(255,200,120,.35)'},{x:289,y:130,r:34,c:'rgba(255,190,110,.25)'},{x:39,y:124,r:26,c:'rgba(255,230,160,.2)'},
    {x:168,y:110,r:60,c:'rgba(255,220,170,.12)'},{x:12,y:72,r:40,c:'rgba(255,210,130,.35)',vacille:1},...persoLumiere(36)],
  particules(){emettre(70,()=>({k:'pluie',scene:'londres',x:Math.random()*W+20,y:-5,vx:-.6,vy:4+Math.random()*2,vie:60,t:1,h:3,c:'#c8d8ec',a:.5}));
    if(Math.random()<.4)PART.push({k:'gouttes',scene:'londres',x:Math.random()*W,y:SOL+2+Math.random()*16,vx:0,vy:0,vie:8,t:2,h:1,c:'#dfe8f4',a:.6})},
  premierPlan(){couche(-18,()=>flou(1.2,()=>{P(6,40,4,140,'#0c0f16');P(0,36,18,6,'#0c0f16');P(2,42,14,8,'#ffe2a0');P(24,150,40,30,'#0c0f16');g.beginPath();g.fillStyle='#0c0f16';g.ellipse(44,152,26,10,0,0,7);g.fill()}))}});
Object.assign(SCENES.quai,{
  ambiance:{nuit:.5,voile:'#140a12',teinte:'rgba(255,160,90,.25)'},
  lumieres:()=>[{x:232,y:126,r:72,c:'rgba(255,210,150,.4)'},{x:40,y:84,r:44,c:'rgba(120,230,170,.3)'},{x:180,y:44,r:36,c:'rgba(255,220,150,.3)'},{x:90,y:30,r:30},{x:150,y:12,r:40},...persoLumiere(30)],
  particules(){emettre(26,()=>({k:'poussiere',scene:'quai',x:200+Math.random()*64,y:40+Math.random()*110,vx:(Math.random()-.5)*.15,vy:-.05-Math.random()*.1,vie:200+Math.random()*200,t:1,c:'#ffe8c0',a:.7}))},
  premierPlan(){faisceau(214,10,192,80,0,SOL,'rgba(255,220,160,.18)');couche(-22,()=>flou(1.5,()=>{P(300,0,30,H,'#120a0c');P(296,0,4,H,'#2a1a18');P(-10,150,60,30,'#120a0c')}))}});
Object.assign(SCENES.autre,{
  ambiance:{nuit:.55,voile:'#0a0620',teinte:'rgba(140,90,220,.35)'},
  lumieres:()=>{const t=Date.now();return[...[0,1,2,3,4,5].map(i=>({x:25+i*52,y:34+Math.sin(t/600+i)*4,r:42,c:'rgba(255,180,80,.35)',vacille:1})),
    ...[0,1,2,3,4,5,6,7,8].map(i=>({x:19+i*36,y:100,r:22,c:'rgba(255,220,150,.18)'})),{x:270,y:30,r:40,c:'rgba(190,180,255,.2)'},...persoLumiere(28)]},
  particules(){emettre(40,()=>({k:'etincelle',scene:'autre',x:Math.random()*W,y:SOL+Math.random()*20,vx:(Math.random()-.5)*.3,vy:-.2-Math.random()*.4,vie:150+Math.random()*150,t:1,c:['#ffd86a','#b9a8ff','#8ff0d0'][Math.random()*3|0],glow:1}))},
  premierPlan(){couche(-20,()=>flou(1.4,()=>{g.fillStyle='#07040f';for(let i=0;i<7;i++){g.beginPath();g.ellipse(8+i*7,180-i%3*4,6,22,(i-3)*.25,0,7);g.fill()}P(306,0,20,H,'#07040f');P(300,20,26,6,'#07040f')}))}});
// halo doux autour du héros actif, pour qu'il reste lisible dans le noir
function persoLumiere(r){return S.pos[S.perso]!=null?[{x:S.pos[S.perso],y:SOL-20,r}]:[]}
