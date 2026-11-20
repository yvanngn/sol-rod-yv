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
    halo(MUR_X-10,120,80,'rgb(255,214,150)',.3);
    vgrad(SOL,H,'#6a6470','#3e3944',0,LGS);P(0,SOL,LGS,1,'#b0a9b8');for(let x=0;x<LGS;x+=40)P(x,SOL+6,30,1,'#58525e');
  },
  objets:[
    {id:'boutique',nom:'boutique',x:18,y:58,w:84,h:76,regarder:"Des écharpes, des mugs, des stylos ! Tout à 100 £… l'unité. Et des baguettes de sorcier ! 500 £.",
      utiliser:()=>say('moi',S.perso==='solene'?"Plus tard. On a déjà assez dépensé en bonbons…":"Plus tard, pour l'instant c'est l'heure de profiter.")},
    {id:'loup',nom:'statue de loup-garou',x:150,y:88,w:40,h:72,defaut:'utiliser',dessin(){loupGarou(170,SOL)},
      regarder:"Une statue de loup-garou grandeur nature. Y'a marqué quoi là ? « Ne pas mordre ? ».",
      utiliser:async()=>{if(S.perso!=='rod')return say('moi',"Je ne monte pas là-dessus. Je laisse ça à Rod.");
        await marcher('rod',188);anim('rod').dir='g';
        if(!TEST)for(let i=0;i<20;i++){S.posY.rod=SOL-i*.5;await pause(16)}
        await say('rod',"Aouuuuuh !");sfx('hurlement');
        anim('rod').tremble=true;await dire([['rod',"Rodolphe, le loup-garou des salles des profs !"]]);anim('rod').tremble=false;
        delete S.posY.rod;await say('rod',"…Bon, assez fait le mariole.")}},
    {id:'balai',nom:'balai volant',x:258,y:118,w:64,h:42,defaut:'utiliser',dessin(){if(!S.balai)balaiStand(282,SOL)},
      regarder:"Un balai de sorcier pour les photos.",
      utiliser:async()=>{if(S.perso!=='yvan')return say('moi',"Le balai, c'est pour Yvan qui en a un bien enfoncé dans le derrière.");
        await marcher('yvan',282);anim('yvan').dir='d';S.balai=1;
        await say('yvan',"Accrochez-vous… Décollage !");sfx('whoosh');
        if(!TEST){const t0=Date.now();while(Date.now()-t0<2200){S.posY.yvan=SOL-4-Math.abs(Math.sin((Date.now()-t0)/180))*7;await pause(16)}}
        delete S.posY.yvan;S.balai=0;
        await say('yvan',"…Je suis pas un peu vieux pour ces conneries ?")}},
    {id:'chariot',nom:'chariot à bagages',get x(){return 404+(S.chariotDx||0)},y:116,w:44,h:44,
      dessin(){if(S.avale)return;dessinChariot(S.chariotDx||0);murDevant(422,436)},
      regarder:"Un chariot à moitié encastré dans le mur.",
      prendre:"Il est vissé au sol. Dommage, ça aurait fait joli dans mes toilettes.",
      utiliser:"Il faudrait que quelqu'un nous prenne en photo en train de le pousser."},
    {id:'touriste',nom:'touriste',humain:true,x:553,y:118,w:14,h:42,
      dessin(){const a=anim('touriste');a.marche=false;a.dir='g';drawPerso('touriste',560);P(550,132,7,5,'#222');P(551,133,2,2,'#8ac')},
      regarder:"Un touriste en chemise à fleurs, avec un gros appareil photo. Il a l'air serviable.",
      parler:async()=>{if(S.perso!=='solene')return say('moi',"Je parle pas aux gens.");await photoTouriste()}},
  ],
  heros:{},
  devant(){if(S.avale){dessinChariot(S.chariotDx||0);murDevant(422,520)}
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
  await dire([['solene',"Excusez-moi ! Vous pourriez nous prendre en photo ? Can you take me in the ass ?"],['touriste',"Of course ! Mettez-vous bien ensemble, derrière le chariot."]]);
  S.verrou='solene';
  await Promise.all([marcher('yvan',372),marcher('rod',386),marcher('solene',400)]);
  ['yvan','rod','solene'].forEach(n=>anim(n).dir='d');
  await dire([['solene',"Allez, les garçons, on pousse !"],['touriste',"Un…"],['touriste',"Deux…"],['touriste',"Trois !"]]);
  sfx('magie');S.studioBrille=1;await pause(700);
  // flash de la photo : d'un coup, le chariot et les trois basculent dans le mur
  sfx('photo');S.flash=1;S.avale=1;sfx('whoosh');
  if(!TEST&&!S.passe){const d0={yvan:S.pos.yvan,rod:S.pos.rod,solene:S.pos.solene},t0=Date.now();
    while(Date.now()-t0<260){const u=(Date.now()-t0)/260,dx=u*u*120;S.chariotDx=dx;
      for(const n of['yvan','rod','solene'])if(S.pos[n]!=null){S.pos[n]=d0[n]+dx;anim(n).dir='d';if(S.pos[n]>440)S.pos[n]=null}
      await pause(16)}}
  ['yvan','rod','solene'].forEach(n=>{S.pos[n]=null;anim(n).marche=false});
  await noir(true);S.studioBrille=0;S.avale=0;S.chariotDx=0;
  await pause(1200);
  await go('reveil',{yvan:null,rod:null,solene:null});
}

// ----- Le réveil : gros plan sur Solène, la caméra recule, puis tourne vers le château -----
S.rv={z:7,cx:62,cy:121};
const tween=async(o,k,v,ms)=>{if(TEST||S.passe){o[k]=v;return}const a=o[k],t0=Date.now();while(Date.now()-t0<ms){const u=(Date.now()-t0)/ms,e=u<.5?2*u*u:1-(-2*u+2)**2/2;o[k]=a+(v-a)*e;await pause(16)}o[k]=v};
function chateau(x0,y0){ // grand château original et somptueux, perché sur une falaise au-dessus d'un lac
  const t=Date.now(),m='#2c2646',l='#433a6a',o='#1c1830',toit='#3a2a5a',toitL='#5a4488',or='#e8c35a',f='#ffd88a',f2='#ffb060';
  const lum=(x,y,w,h,k)=>{const v=.75+.25*Math.sin(t/(500+k*37)+k);g.globalAlpha=v;P(x,y,w,h,(k%3)?f:f2);g.globalAlpha=1};
  // aura magique et aurore derrière le château
  halo(x0,y0-60,170,'rgb(255,190,140)',.22);
  for(let i=0;i<4;i++){g.globalAlpha=.12;g.fillStyle=['#8af0d0','#b9a8ff','#ff9ad0','#8af0d0'][i];g.beginPath();g.moveTo(x0-160+i*20,y0-150);g.bezierCurveTo(x0-60,y0-110+Math.sin(t/2000+i)*10,x0+60,y0-170,x0+170-i*20,y0-130);g.lineTo(x0+170-i*20,y0-124);g.bezierCurveTo(x0+60,y0-160,x0-60,y0-100,x0-160+i*20,y0-142);g.fill()}g.globalAlpha=1;
  // falaise
  poly([[x0-150,y0+40],[x0-128,y0+10],[x0-96,y0-2],[x0-40,y0-8],[x0+50,y0-10],[x0+104,y0-2],[x0+132,y0+12],[x0+158,y0+40]],'#221c34');
  for(let i=0;i<22;i++)P(x0-130+i*12,y0+4+((i*7)%4)*7,8,1,'#30284a');for(let i=0;i<10;i++)P(x0-110+i*24,y0+14+(i%3)*6,1,10,'#18142a');
  // cascade qui tombe de la falaise
  for(let y=y0-4;y<y0+40;y+=2){const k=(y+t/30)%6;P(x0+112+Math.sin(y/3)*1,y,4,2,k<3?'rgba(210,230,255,.75)':'rgba(170,200,255,.5)')}
  halo(x0+114,y0+38,10,'rgb(220,240,255)',.4);
  // enceinte basse avec créneaux et tours d'angle
  P(x0-122,y0-16,244,20,m);P(x0-122,y0-16,244,2,l);for(let x=x0-122;x<x0+122;x+=6)P(x,y0-20,4,4,m);
  for(let i=0;i<20;i++)lum(x0-114+i*12,y0-9,2,3,i);
  // porte monumentale + pont-levis
  P(x0-8,y0-14,16,18,o);g.fillStyle=o;g.beginPath();g.arc(x0,y0-14,8,Math.PI,0);g.fill();vgrad(y0-20,y0+4,'rgba(255,200,120,.6)','rgba(255,160,80,.2)',x0-6,12);
  // pont de pierre à arches vers la gauche
  P(x0-200,y0+2,80,4,m);P(x0-200,y0+2,80,1,l);for(let i=0;i<6;i++){g.fillStyle=m;P(x0-198+i*13,y0+6,3,26,m);g.fillStyle='#14102a';g.beginPath();g.arc(x0-191+i*13,y0+16,5,Math.PI,0);g.fill()}
  for(let i=0;i<7;i++){P(x0-196+i*12,y0-3,1,5,'#555');halo(x0-196+i*12,y0-4,4,'rgb(255,210,140)',.7)}
  // grand hall central : vitrail, rosace, toit à pignon
  P(x0-40,y0-64,80,50,m);P(x0-40,y0-64,2,50,l);P(x0+38,y0-64,2,50,o);
  poly([[x0-44,y0-64],[x0,y0-92],[x0+44,y0-64]],toit);poly([[x0-44,y0-64],[x0,y0-92],[x0-2,y0-92],[x0-46,y0-64]],toitL);
  for(let k=-1;k<=1;k++){const wx=x0+k*22;g.fillStyle='#14102a';P(wx-5,y0-50,10,26,'#14102a');g.beginPath();g.arc(wx,y0-50,5,Math.PI,0);g.fill();
    vgrad(y0-54,y0-24,'#ffe0a0','#ff9a50',wx-4,8);P(wx-4,y0-40,8,1,'#3a2a50');P(wx,y0-54,1,30,'#3a2a50')}
  const rr=8;g.fillStyle='#14102a';g.beginPath();g.arc(x0,y0-74,rr+1,0,7);g.fill();g.fillStyle='#ffcf7a';g.beginPath();g.arc(x0,y0-74,rr,0,7);g.fill();
  g.strokeStyle='#3a2a50';for(let i=0;i<8;i++){const a=i*Math.PI/4+t/6000;g.beginPath();g.moveTo(x0,y0-74);g.lineTo(x0+Math.cos(a)*rr,y0-74+Math.sin(a)*rr);g.stroke()}
  g.fillStyle='#ff8ab0';g.beginPath();g.arc(x0,y0-74,2.5,0,7);g.fill();
  // tours : [décalage x, hauteur, largeur, drapeau]
  const tours=[[-114,58,12],[-96,74,11,1],[-74,88,14],[-56,66,10],[-26,104,12,1],[28,98,12,1],[56,70,10],[76,92,15],[98,78,11,1],[116,60,12]];
  for(const[dx,h,w,dr]of tours){const x=x0+dx,top=y0-h;
    P(x-w/2,top,w,h-14,m);P(x-w/2,top,1,h-14,l);P(x+w/2-1,top,1,h-14,o);
    for(let k=0;k<w;k+=3)P(x-w/2+k,top-3,2,3,m);
    P(x-w/2-1,top+10,w+2,2,l);P(x-w/2-1,top+h*.5,w+2,2,l);
    for(let r=0;r<Math.floor((h-24)/12);r++){const wy=top+16+r*12;g.fillStyle='#14102a';P(x-2,wy,4,6,'#14102a');g.beginPath();g.arc(x,wy,2,Math.PI,0);g.fill();lum(x-1,wy,2,5,dx+r)}
    const rh=w*2.4;poly([[x-w/2-3,top-3],[x,top-3-rh],[x+w/2+3,top-3]],toit);poly([[x-w/2-3,top-3],[x,top-3-rh],[x-1,top-3-rh],[x-w/2-2,top-3]],toitL);
    for(let k=1;k<4;k++)P(x-w/2-3+k*2,top-3-k*(rh/8),w+6-k*4,1,'rgba(0,0,0,.18)');
    P(x,top-3-rh-6,1,6,or);P(x-1,top-3-rh-6,3,1,or);
    if(dr){const fy=top-3-rh-12,ph=t/260+dx;P(x,fy,1,8,'#888');g.fillStyle=dx%2?'#c8242c':'#3a6ab0';g.beginPath();g.moveTo(x+1,fy);
      for(let i=0;i<=6;i++)g.lineTo(x+1+i*2,fy+Math.sin(ph+i*.8)*1.5);for(let i=6;i>=0;i--)g.lineTo(x+1+i*2,fy+4+Math.sin(ph+i*.8)*1.5);g.fill();P(x+3,fy+1,2,2,or)}}
  // passerelles couvertes entre les tours
  [[-96,-74,48],[-26,28,64],[76,98,52]].forEach(([a,b,hh])=>{const xa=x0+a,xb=x0+b,y=y0-hh;P(xa,y,xb-xa,5,m);P(xa,y,xb-xa,1,l);for(let x=xa+3;x<xb-2;x+=5)lum(x,y+2,2,2,x)});
  // reflets dorés sur le lac de part et d'autre de la falaise
  for(let i=0;i<26;i++){const x=x0-150+i*12,s=Math.sin(t/400+i);if(Math.abs(x-x0)<150){g.globalAlpha=.25+.2*s;P(x+s,y0+22+(i%3)*3,6,1,f);g.globalAlpha=1}}
  // barques à lanternes
  [[x0-170,y0+24],[x0+160,y0+20]].forEach(([bx,by],i)=>{const yy=by+Math.sin(t/700+i)*.8;P(bx-6,yy,12,2,'#2a1a14');P(bx-4,yy+2,8,1,'#1a100c');P(bx+3,yy-6,1,6,'#555');halo(bx+3,yy-7,6,'rgb(255,200,120)',.8)});
  // oiseaux
  for(let i=0;i<5;i++){const bx=x0-120+((t/40+i*70)%260),by=y0-120+Math.sin(t/900+i)*6+i*4,w=(t/150+i)%2<1?1:0;P(bx,by,2,1,'#1a1428');P(bx+2,by-w,2,1,'#1a1428');P(bx-2,by-w,2,1,'#1a1428')}
}
function herbe(x){for(let i=-17;i<18;i++)P(x+i,145+((i*7)&3),1,16,['#2e6a3e','#3a7a4a','#24583a'][(i+18)%3])}
const CHATEAU_X=900; // à l'opposé des personnages : la caméra fait un demi-tour pour le découvrir
SCENES.reveil={nom:'…',fixe:1,
  dessin(){const t=Date.now(),R=S.rv;
    g.save();if(R.flou&&FLOU)g.filter=`blur(${R.flou}px)`;g.translate(W/2,H/2);g.scale(R.z,R.z);g.translate(-R.cx,-R.cy);
    // ciel d'aube, étoiles, montagnes
    vgrad(-200,140,'#1a1440','#e8906a',-300,1600);
    for(let i=0;i<140;i++){g.globalAlpha=.3+.7*Math.abs(Math.sin(t/900+i));P((i*53)%1500-200,(i*29)%70-40,1,1,'#fff')}g.globalAlpha=1;
    g.fillStyle='#3a2a50';g.beginPath();g.moveTo(-300,110);for(let x=-300;x<=1300;x+=40)g.lineTo(x,70+Math.sin(x/70)*18+((x/40)%2)*10);g.lineTo(1300,140);g.lineTo(-300,140);g.fill();
    // lac au pied du château
    vgrad(110,162,'#4a5a8a','#2a3460',640,700);for(let i=0;i<30;i++)P(660+i*20,118+(i%5)*8,10,1,'rgba(255,220,180,.3)');
    chateau(CHATEAU_X,112);
    // prairie (côté personnages) et rive (côté château)
    vgrad(130,200,'#2e5a3a','#1a3a24',-300,1000);vgrad(160,200,'#2e5a3a','#1a3a24',700,700);
    g.fillStyle='#2e5a3a';g.beginPath();g.moveTo(690,130);g.quadraticCurveTo(712,150,732,160);g.lineTo(690,160);g.fill();
    for(let x=-300;x<700;x+=5)P(x,128+((x*7)%5),1,4,'#3a7a4a');for(let x=700;x<1300;x+=5)P(x,158+((x*7)%5),1,4,'#3a7a4a');
    [[20,'#ff8ab0'],[86,'#ffe080'],[150,'#b9a8ff'],[210,'#ff8ab0'],[260,'#ffe080'],[360,'#b9a8ff'],[480,'#ffe080'],[590,'#ff8ab0']].forEach(([x,c])=>{P(x,150,2,2,c);P(x+30,158,2,2,c)});
    for(let i=0;i<6;i++){const x=300+i*70;P(x,96,3,34,'#1e3a28');ell(x+1,92,9,12,'#1e3a28');ell(x-2,90,5,6,'#24452f')}
    // Solène assise ; Yvan et Rod allongés qui se redressent (rotation autour des pieds)
    S.dort={solene:R.yeuxSolene===0,yvan:R.leveYvan<.3,rod:R.leveRod<.3};
    S.anim.solene={dir:'face',pas:0,marche:false};drawPerso('solene',62,SOL);herbe(62);
    [['yvan',112,R.leveYvan],['rod',150,R.leveRod]].forEach(([n,x,k])=>{S.anim[n]={dir:'face',pas:0,marche:false};
      // jambes allongées dans l'herbe (devant), buste qui pivote sur les hanches : allongé (k=0) → appuyé sur un coude → assis (k=1)
      const s=tenue(n),hy=SOL-12,ang=-Math.PI/2*(1-k)*(1-k*.15)+(k>0&&k<1?Math.sin(t/45)*.02:0);
      P(x,hy,16,4,s.pants);P(x+16,hy,3,4,s.shoes);
      g.save();g.translate(x,hy);g.rotate(ang);g.beginPath();g.rect(-30,-60,60,61);g.clip();drawPerso(n,0,12);g.restore();
      if(k>.15&&k<.95){const ax=x-10*(1-k),ay=hy+1;P(ax-1,ay-8*k,3,8*k+2,s.top==='#24202c'?'#24202c':shade(s.top,.85))}
      herbe(x+6)});
    S.dort=null;
    // lucioles
    for(let i=0;i<20;i++){const x=(i*61+t/40)%1000-40,y=110+Math.sin(t/700+i)*20;halo(x,y,4,'rgb(255,240,150)',.8)}
    g.restore();
  },
  objets:[],
  ambiance:{nuit:.1,voile:'#000',teinte:'rgba(200,150,255,.15)'},
  lumieres:()=>[],
  dessinAvant:()=>vignette(),
  async entree(){
    const R=S.rv;Object.assign(R,{z:7,cx:62,cy:121,yeuxSolene:0,leveYvan:0,leveRod:0,flou:0});
    await noir(false);await pause(1200);
    R.yeuxSolene=1;await pause(700);R.yeuxSolene=0;await pause(300);R.yeuxSolene=1;await pause(600);
    await tween(R,'z',3,2200);
    await say('solene',"Euuuh… les gars ?");
    await Promise.all([tween(R,'z',1.6,2200),tween(R,'cx',105,2200),tween(R,'cy',135,2200)]);
    // Rod se redresse (en deux temps : il s'appuie sur un coude, puis s'assoit)
    await tween(R,'leveRod',.4,700);await pause(350);await tween(R,'leveRod',1,900);
    await say('rod',"What ?");
    await tween(R,'leveYvan',.4,700);await pause(350);await tween(R,'leveYvan',1,900);
    await say('yvan',"C'est quoi ça ?");
    await pause(500);
    // demi-tour de la caméra : on découvre le château, à l'opposé
    R.flou=1.2;
    await Promise.all([tween(R,'cx',CHATEAU_X,4200),tween(R,'z',.8,4200),tween(R,'cy',76,4200)]);
    R.flou=0;
    await pause(3500);
    await carton("Fin du chapitre 1",5000);
    S.f.finChapitre1=1;
  },
};
MUSIQUE_SCENE.reveil='brumes';

// briques identiques au mur du fond, redessinées par-dessus (le chariot et les héros « entrent » dans le mur)
function murDevant(x0,x1){g.save();g.beginPath();g.rect(x0,22,x1-x0,SOL-22);g.clip();
  P(x0,22,x1-x0,SOL-22,'#3a221d');for(let y=22;y<SOL;y+=8)for(let x=(y/8%2)*8-8;x<LGS;x+=16){if(x+15<x0||x>x1)continue;const v=.85+((x*13+y*7)%9)/30;P(x,y,15,7,shade('#7a3b2e',v));P(x,y,15,1,shade('#7a3b2e',v*1.2))}
  g.restore();P(x0,108,1,52,'rgba(0,0,0,.35)');P(x0+1,108,2,52,'rgba(0,0,0,.15)')}
