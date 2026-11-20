// ===== Fin du chapitre : le studio (grand), la photo au chariot, le réveil devant le château =====
Object.assign(AUTRES,{touriste:'Le touriste'});Object.assign(COUL,{touriste:'#a0f0d0'});
SPEC.touriste={skin:'#f0c0a0',hair:'#c8a060',coiffure:'court',top:'#3ab0a0',pants:'#e8d8b0',shoes:'#8a6a4a',lunettes:1};
const LGS=640,MUR_X=452;
function loupGarou(x,y){ // statue de loup-garou en pierre (création originale)
  const p='#8a8a92',pc='#a8a8b0',po='#5a5a62';
  P(x-16,y-10,32,10,'#6a6a72');P(x-16,y-10,32,2,'#9a9aa2');
  P(x-6,y-26,5,16,po);P(x+2,y-26,5,16,po);P(x-8,y-12,7,3,po);P(x+2,y-12,7,3,po);
  ell(x,y-36,11,13,p);ell(x-3,y-38,5,7,pc);
  P(x-16,y-48,5,18,p);P(x+11,y-48,5,18,p);P(x-18,y-50,4,4,po);P(x+14,y-50,4,4,po);[-1,1].forEach(k=>{P(x+k*16-1,y-52,1,3,'#eee');P(x+k*16+1,y-52,1,3,'#eee')});
  ell(x,y-54,8,8,p);P(x-1,y-52,10,5,p);P(x+8,y-51,2,2,po);P(x+1,y-48,8,1,'#eee');
  g.fillStyle=p;g.beginPath();g.moveTo(x-7,y-58);g.lineTo(x-4,y-68);g.lineTo(x-1,y-59);g.fill();g.beginPath();g.moveTo(x+1,y-59);g.lineTo(x+4,y-68);g.lineTo(x+7,y-58);g.fill();
  P(x-3,y-56,2,2,'#d02020');P(x+3,y-56,2,2,'#d02020');
}
function balaiStand(x,y){P(x-1,y-30,2,30,'#5a3a20');P(x-10,y-2,20,2,'#5a3a20');P(x-22,y-34,40,2,'#8a5a2a');g.fillStyle='#c8a050';g.beginPath();g.moveTo(x+18,y-36);g.lineTo(x+30,y-40);g.lineTo(x+30,y-28);g.lineTo(x+18,y-32);g.fill();for(let i=0;i<4;i++)P(x+20+i*3,y-38+i,1,8,'#a88030')}
SCENES.quai={nom:'Studio',largeur:LGS,
  dessin(){const t=Date.now();
    P(0,0,LGS,SOL,'#3a221d');
    for(let y=22;y<SOL;y+=8)for(let x=(y/8%2)*8-8;x<LGS;x+=16){const v=.85+((x*13+y*7)%9)/30;P(x,y,15,7,shade('#7a3b2e',v));P(x,y,15,1,shade('#7a3b2e',v*1.2))}
    vgrad(0,26,'#120d1c','#241a32',0,LGS);
    // affiches de films (génériques) et poutres
    [[120,'#2a3a6a'],[330,'#5a2a4a'],[560,'#2a5a3a']].forEach(([x,c])=>{P(x,30,34,46,'#c9a040');P(x+2,32,30,42,c);P(x+6,38,22,20,shade(c,1.5));P(x+6,62,22,2,'#e8d8a0');P(x+6,66,16,2,'#e8d8a0')});
    // boutique
    P(18,58,84,76,'#1b1824');P(22,62,76,44,'#2e5a46');for(let i=0;i<8;i++)P(25+i*9,70,6,26,['#c8242c','#e8c35a','#2a5ab8','#3a8a4a'][i%4]);P(22,62,76,1,'#7fd0a8');
    g.fillStyle='#f0c766';g.font="bold 10px Georgia";g.textAlign='center';texte('Boutique',60,120);g.textAlign='left';
    // grande enseigne photo
    P(360,22,200,16,'#1b1424');P(360,22,200,1,'#f0c766');g.fillStyle='#f0c766';g.font="bold 9px Georgia";g.textAlign='center';texte('PHOTO SOUVENIR — POUSSEZ LE CHARIOT',460,33);
    // pilier du quai avec son panneau
    P(MUR_X,44,48,116,'#5a2a20');for(let y=48;y<SOL;y+=8)for(let x=MUR_X+((y/8)%2)*6;x<MUR_X+48;x+=12)P(x,y,11,7,shade('#7a3b2e',.9+((x+y)%5)/20));
    P(MUR_X+4,52,40,16,'#1b1424');g.fillStyle='#fff';g.font="bold 10px Georgia";texte('Quai ?',MUR_X+24,64);g.textAlign='left';
    halo(MUR_X-10,120,80,'rgb(255,214,150)',.3);
    vgrad(SOL,H,'#6a6470','#3e3944',0,LGS);P(0,SOL,LGS,1,'#b0a9b8');for(let x=0;x<LGS;x+=40)P(x,SOL+6,30,1,'#58525e');
  },
  objets:[
    {id:'boutique',nom:'boutique',x:18,y:58,w:84,h:76,regarder:"Des écharpes, des baguettes en plastique, des mugs. Tout à 40 £.",
      utiliser:()=>say('moi',S.perso==='solene'?"Plus tard. On a déjà assez dépensé en bonbons… enfin, moi.":"Plus tard. Solène a confisqué ma carte bleue.")},
    {id:'loup',nom:'statue de loup-garou',x:150,y:88,w:40,h:72,defaut:'utiliser',dessin(){loupGarou(170,SOL)},
      regarder:"Une statue de loup-garou grandeur nature. Les crocs, les griffes… et une étiquette « Ne pas monter dessus ».",
      utiliser:async()=>{if(S.perso!=='rod')return say('moi',"Je ne monte pas là-dessus. Je laisse ça à Rod.");
        await marcher('rod',188);anim('rod').dir='g';
        if(!TEST)for(let i=0;i<20;i++){S.posY.rod=SOL-i*.5;await pause(16)}
        await say('rod',"Aouuuuuh !");sfx('hurlement');
        anim('rod').tremble=true;await dire([['rod',"Rodolphe, le loup-garou des salles des profs ! Terreur des réunions pédagogiques !"]]);anim('rod').tremble=false;
        delete S.posY.rod;await say('rod',"…Bon, je descends avant qu'un vigile arrive. J'ai déjà donné aujourd'hui.")}},
    {id:'balai',nom:'balai volant',x:258,y:118,w:64,h:42,defaut:'utiliser',dessin(){if(!S.balai)balaiStand(282,SOL)},
      regarder:"Un balai de sorcier sur son support, pour les photos. Paille dorée, manche verni.",
      utiliser:async()=>{if(S.perso!=='yvan')return say('moi',"Le balai, c'est le truc d'Yvan. Il a même la tenue.");
        await marcher('yvan',282);anim('yvan').dir='d';S.balai=1;
        await say('yvan',"Accrochez-vous… Décollage !");sfx('whoosh');
        if(!TEST){const t0=Date.now();while(Date.now()-t0<2200){S.posY.yvan=SOL-4-Math.abs(Math.sin((Date.now()-t0)/180))*7;await pause(16)}}
        delete S.posY.yvan;S.balai=0;
        await say('yvan',"…Bon. Ça ne vole pas. Mais dans ma tête, je suis déjà au-dessus de la Tamise.")}},
    {id:'chariot',nom:'chariot à bagages',get x(){return 404+(S.chariotDx||0)},y:116,w:44,h:44,
      dessin(){if(S.avale)return;dessinChariot(S.chariotDx||0)},
      regarder:"Un chariot à moitié encastré dans le pilier. Tout le monde fait la même photo. On va faire la même photo.",
      prendre:"Il est vissé au sol. Logique, sinon les gens partiraient avec.",
      utiliser:"Il faudrait que quelqu'un nous prenne en photo en train de le pousser. Tous les trois."},
    {id:'touriste',nom:'touriste',humain:true,x:553,y:118,w:14,h:42,
      dessin(){const a=anim('touriste');a.marche=false;a.dir='g';drawPerso('touriste',560);P(550,132,7,5,'#222');P(551,133,2,2,'#8ac')},
      regarder:"Un touriste en chemise à fleurs, avec un gros appareil photo. Il a l'air serviable.",
      parler:async()=>{if(S.perso!=='solene')return say('moi',"Je laisse Solène lui demander. Elle a le sens du contact.");await photoTouriste()}},
  ],
  heros:{},
  devant(){if(S.avale){dessinChariot(S.chariotDx||0);P(MUR_X,44,48,116,'#5a2a20');for(let y=48;y<SOL;y+=8)for(let x=MUR_X+((y/8)%2)*6;x<MUR_X+48;x+=12)P(x,y,11,7,shade('#7a3b2e',.9+((x+y)%5)/20))}
    if(S.balai&&S.pos.yvan!=null){const y=S.posY.yvan??SOL;P(S.pos.yvan-16,y-14,32,2,'#8a5a2a');g.fillStyle='#c8a050';g.beginPath();g.moveTo(S.pos.yvan-16,y-16);g.lineTo(S.pos.yvan-26,y-20);g.lineTo(S.pos.yvan-26,y-8);g.lineTo(S.pos.yvan-16,y-12);g.fill()}},
  ambiance:{nuit:.45,voile:'#140a12',teinte:'rgba(255,160,90,.25)'},
  lumieres:()=>[{x:430,y:126,r:80,c:'rgba(255,210,150,.4)'},{x:60,y:84,r:50,c:'rgba(120,230,170,.3)'},{x:170,y:110,r:46,c:'rgba(200,210,255,.25)'},{x:282,y:126,r:36,c:'rgba(255,220,150,.3)'},{x:560,y:120,r:36},...persoLumiere(30)],
  particules(){if(S.studioBrille)emettre(90,()=>({k:'trav',scene:'quai',x:380+Math.random()*90,y:100+Math.random()*60,vx:(Math.random()-.5)*.8,vy:-.4-Math.random(),vie:40+Math.random()*30,t:1,c:['#fff3b0','#b9a8ff','#8ff0d0'][Math.random()*3|0],glow:1}));
    emettre(20,()=>({k:'poussiere',scene:'quai',x:400+Math.random()*80,y:40+Math.random()*110,vx:(Math.random()-.5)*.15,vy:-.05-Math.random()*.1,vie:200+Math.random()*200,t:1,c:'#ffe8c0',a:.7}))},
  premierPlan(){faisceau(414,10,392,80,0,SOL,'rgba(255,220,160,.18)')},
  dessinAvant:()=>vignette(),
  async entree(){await dire([['narr',"Dans le studio, un décor de gare. Un chariot sort à moitié d'un mur de briques."],['rod',"Ah, LA photo. Allez, on la fait."]])},
};
function dessinChariot(dx){const x=404+dx;
  P(x,124,30,3,'#b8b8c0');P(x,124,30,1,'#e6e6ee');P(x-4,112,2,14,'#b8b8c0');P(x-4,112,6,2,'#b8b8c0');
  P(x+2,128,26,22,'#6b4426');P(x+2,128,26,2,'#8a5a34');P(x+4,131,22,7,'#c8a060');P(x+4,131,22,1,'#e8c890');P(x+9,141,12,7,'#3a5a8a');P(x+14,140,2,2,'#e8c35a');
  P(x+1,150,32,3,'#b8b8c0');[[x+8,156],[x+26,156]].forEach(([a,b])=>{P(a-2,b-2,5,5,'#1a1a1a');P(a-1,b-1,2,2,'#666')})}
let pilierDevant=0;
async function photoTouriste(){
  await dire([['solene',"Excusez-moi ! Vous pourriez nous prendre en photo, tous les trois, en train de pousser le chariot ?"],['touriste',"Of course ! Mettez-vous bien ensemble, derrière le chariot."]]);
  S.verrou='solene';
  await Promise.all([marcher('yvan',372),marcher('rod',386),marcher('solene',400)]);
  ['yvan','rod','solene'].forEach(n=>anim(n).dir='d');
  await dire([['solene',"Allez, les garçons, on pousse !"],['touriste',"Un…"],['touriste',"Deux…"],['touriste',"Trois !"]]);
  sfx('photo');S.flash=1;await pause(300);sfx('magie');S.studioBrille=1;await pause(900);
  // le chariot avance dans le mur et les avale
  S.avale=1;sfx('whoosh');
  if(!TEST&&!S.passe){for(let i=0;i<110;i++){S.chariotDx=(S.chariotDx||0)+.8;
    for(const n of['yvan','rod','solene'])if(S.pos[n]!=null){const a=anim(n);a.marche=true;a.dir='d';a.pas++;S.pos[n]+=.8;if(S.pos[n]>MUR_X+10){S.pos[n]=null;a.marche=false}}
    await pause(16)}}
  ['yvan','rod','solene'].forEach(n=>{S.pos[n]=null;anim(n).marche=false});
  await noir(true);S.studioBrille=0;S.avale=0;S.chariotDx=0;
  await pause(1200);
  await go('reveil',{yvan:null,rod:null,solene:null});
}

// ----- Le réveil : gros plan sur Solène, la caméra recule, puis tourne vers le château -----
S.rv={z:7,cx:62,cy:121};
const tween=async(o,k,v,ms)=>{if(TEST||S.passe){o[k]=v;return}const a=o[k],t0=Date.now();while(Date.now()-t0<ms){const u=(Date.now()-t0)/ms,e=u<.5?2*u*u:1-(-2*u+2)**2/2;o[k]=a+(v-a)*e;await pause(16)}o[k]=v};
function chateau(x0,y0){ // grand château original, perché au-dessus d'un lac
  const m='#2a2440',l='#3a3458',f='#ffd88a';
  g.fillStyle='#1a1630';g.beginPath();g.moveTo(x0-70,y0+40);g.lineTo(x0-40,y0+6);g.lineTo(x0+40,y0+2);g.lineTo(x0+90,y0+40);g.fill();
  const tours=[[-46,-30,8],[-30,-46,9],[-12,-22,7],[4,-62,11],[22,-38,8],[38,-50,9],[56,-26,7],[70,-34,7]];
  P(x0-52,y0-18,130,24,m);P(x0-52,y0-18,130,2,l);
  for(const[dx,h,w]of tours){P(x0+dx-w/2,y0+h,w,-h+6,m);P(x0+dx-w/2,y0+h,1,-h+6,l);g.fillStyle='#3a2a5a';g.beginPath();g.moveTo(x0+dx-w/2-2,y0+h);g.lineTo(x0+dx,y0+h-w*2.2);g.lineTo(x0+dx+w/2+2,y0+h);g.fill();
    for(let k=0;k<3;k++)if((dx+k)%2===0)P(x0+dx-1,y0+h+6+k*8,2,3,f);P(x0+dx,y0+h-w*2.2-4,1,4,'#888')}
  for(let i=0;i<16;i++)P(x0-48+i*8,y0-10+(i%3)*5,2,3,(i*7)%3?f:'#ffb060');
  // pont
  P(x0-110,y0+22,64,3,'#2a2440');for(let i=0;i<5;i++){g.fillStyle='#2a2440';g.beginPath();g.arc(x0-102+i*13,y0+30,5,Math.PI,0);g.fill()}
}
function herbe(x){for(let i=-17;i<18;i++)P(x+i,145+((i*7)&3),1,16,['#2e6a3e','#3a7a4a','#24583a'][(i+18)%3])}
SCENES.reveil={nom:'…',fixe:1,
  dessin(){const t=Date.now(),R=S.rv;
    g.save();g.translate(W/2,H/2);g.scale(R.z,R.z);g.translate(-R.cx,-R.cy);
    // ciel d'aube, étoiles, montagnes
    vgrad(-200,140,'#1a1440','#e8906a',-200,1100);
    for(let i=0;i<80;i++){g.globalAlpha=.3+.7*Math.abs(Math.sin(t/900+i));P((i*53)%900-100,(i*29)%70-40,1,1,'#fff')}g.globalAlpha=1;
    g.fillStyle='#3a2a50';g.beginPath();g.moveTo(-200,110);for(let x=-200;x<=900;x+=40)g.lineTo(x,70+Math.sin(x/70)*18+((x/40)%2)*10);g.lineTo(900,140);g.lineTo(-200,140);g.fill();
    // lac
    vgrad(110,150,'#4a5a8a','#2a3460',300,600);for(let i=0;i<14;i++)P(320+i*20,118+(i%4)*6,10,1,'rgba(255,220,180,.35)');
    chateau(520,92);
    for(let i=0;i<12;i++){const k=i/12;P(470+i*9,112+(i%3)*4,3,1,'rgba(255,216,138,.45)')}
    // prairie
    vgrad(130,200,'#2e5a3a','#1a3a24',-200,1100);for(let x=-200;x<900;x+=5)P(x,128+((x*7)%5),1,4,'#3a7a4a');
    [[20,'#ff8ab0'],[86,'#ffe080'],[150,'#b9a8ff'],[210,'#ff8ab0'],[260,'#ffe080']].forEach(([x,c])=>{P(x,150,2,2,c);P(x+30,158,2,2,c)});
    // Solène assise (sa tête est le centre du gros plan au début)
    S.dort={solene:R.yeuxSolene===0,yvan:!R.reveilYvan,rod:!R.reveilRod};
    S.anim.solene={dir:'face',pas:0,marche:false};drawPerso('solene',62,SOL);herbe(62);
    // Yvan et Rod allongés, puis assis
    [['yvan',112,R.reveilYvan],['rod',150,R.reveilRod]].forEach(([n,x,ok])=>{S.anim[n]={dir:'face',pas:0,marche:false};
      if(ok){drawPerso(n,x,SOL);herbe(x)}else{g.save();g.translate(x,SOL-2);g.rotate(-Math.PI/2);drawPerso(n,0,0);g.restore()}});
    S.dort=null;
    // lucioles
    for(let i=0;i<14;i++){const x=(i*61+t/40)%420-40,y=110+Math.sin(t/700+i)*20;halo(x,y,4,'rgb(255,240,150)',.8)}
    g.restore();
  },
  objets:[],
  ambiance:{nuit:.1,voile:'#000',teinte:'rgba(200,150,255,.15)'},
  lumieres:()=>[],
  dessinAvant:()=>vignette(),
  async entree(){
    const R=S.rv;Object.assign(R,{z:7,cx:62,cy:121,yeuxSolene:0,reveilYvan:0,reveilRod:0});
    await noir(false);await pause(1200);
    R.yeuxSolene=1;await pause(700);R.yeuxSolene=0;await pause(300);R.yeuxSolene=1;await pause(600);
    await tween(R,'z',3,2200);
    await say('solene',"Euuuh… les gars ?");
    await Promise.all([tween(R,'z',1.6,2200),tween(R,'cx',105,2200),tween(R,'cy',135,2200)]);
    R.reveilRod=1;await say('rod',"What ?");
    R.reveilYvan=1;await say('yvan',"C'est quoi ça ?");
    await pause(500);
    await Promise.all([tween(R,'z',1,4200),tween(R,'cx',500,4200),tween(R,'cy',96,4200)]);
    await pause(3500);
    await carton("Fin du chapitre 1",5000);
    S.f.finChapitre1=1;
  },
};
MUSIQUE_SCENE.reveil='brumes';
