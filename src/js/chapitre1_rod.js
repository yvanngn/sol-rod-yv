// ===== Chapitre 1 : la partie de Rod (pub anglais, toilettes, ballon au singe) =====
Object.assign(AUTRES,{barman:'Le barman',joueur:'Joueur de fléchettes',client:'Un client'});
Object.assign(COUL,{barman:'#ffd0a0',joueur:'#a0d0ff',client:'#d0c0a0'});
Object.assign(SPEC,{
  barman:{skin:'#e8b896',hair:'#3a2a1a',coiffure:'court',top:'#f0ece0',veste:'#1a1a1a',pants:'#1a1a22',shoes:'#111',moust:'#3a2a1a'},
  client1:{skin:'#e8c0a0',hair:'#9a9a9a',coiffure:'court',top:'#3a5a3a',pants:'#2a2a30',shoes:'#2a1a10'},
  client2:{skin:'#f0c8a8',hair:'#d8b060',coiffure:'long',top:'#7a2a2a',pants:'#2a2a3a',shoes:'#1a1a1a'},
  client3:{skin:'#c89070',hair:'#1a1410',coiffure:'boucle',top:'#2a3a6a',pants:'#3a3028',shoes:'#1a1a1a'},
  joueur1:{skin:'#f0c0a0',hair:'#c86a2a',coiffure:'court',top:'#c8a030',pants:'#2a3a5a',shoes:'#eee',barbe:'#c86a2a'},
  joueur2:{skin:'#d8a080',hair:'#2a2a2a',coiffure:'court',top:'#5a2a6a',pants:'#2a2a2a',shoes:'#111',lunettes:1},
});
Object.assign(OBJETS,{
  paille:{nom:'Paille',desc:"Une paille en plastique. Une espèce en voie de disparition.",icone:c=>{R(5,1,2,10,'#f2f2f2',c);R(5,3,2,1,'#e04a4a',c);R(5,6,2,1,'#e04a4a',c)}},
  flechette:{nom:'Fléchette',desc:"Une fléchette piquante comme la sauce.",icone:c=>{R(2,5,6,2,'#c0c0c8',c);R(1,5,1,2,'#888',c);R(8,3,3,6,'#f0c040',c)}},
  sarbacane:{nom:'Sarbacane',desc:"Une sarbacane, c'est ingénieux !",icone:c=>{R(1,5,10,2,'#f2f2f2',c);R(3,5,1,2,'#e04a4a',c);R(10,4,2,4,'#f0c040',c)}},
  boulette:{nom:'Boulette de papier',desc:"Une simple boule de papier.",icone:c=>{R(3,3,6,6,'#efe8d0',c);R(4,4,2,1,'#b8b0a0',c);R(6,7,2,1,'#b8b0a0',c)}},
});
// combinaisons d'objets de l'inventaire
COMBOS[cle('flechette','paille')]=async()=>{retirer('flechette');retirer('paille');ajouter('sarbacane');sfx('clic');
  await say('rod',"Hey c'est pas bête ça, je vais pouvoir tirer plus fort.")};

// ----- passage d'Yvan à Rod -----
async function debutRod(){
  S.f.finYvan=1;S.verrou='rod';S.perso='rod';S.tenue='';ui();
  await go('devanture',{rod:292,yvan:null,solene:null});
}

// ----- Le pub -----
function cibleFlechettes(cx,cy){const r=[[11,'#1a1a1a'],[10,'#e8dcc0'],[7.5,'#c8242c'],[6,'#e8dcc0'],[3.5,'#2a7a3a'],[1.6,'#c8242c']];
  for(const[rr,c]of r){g.fillStyle=c;g.beginPath();g.arc(cx,cy,rr,0,7);g.fill()}
  g.strokeStyle='rgba(0,0,0,.4)';for(let i=0;i<10;i++){const a=i*Math.PI/5;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*10,cy+Math.sin(a)*10);g.stroke()}}
// ----- Les joueurs de fléchettes : lancers, ratés, commentaires, ramassage au bout de 10 -----
const DARTS={list:[],vol:null,next:0,tour:0,ramasse:null,px:{joueur1:62,joueur2:88},bulle:null};
const RATES=["Aïe, encore raté !","Je suis nul ce soir.","La cible a bougé ou… ?"];
function pubFlechettes(){const t=Date.now(),D=DARTS;
  if(!D.next)D.next=t+1500;
  if(D.ramasse){const r=D.ramasse,a=anim(r.n);
    if(r.phase==='aller'){D.px[r.n]-=.6;a.marche=true;a.dir='g';a.pas++;if(D.px[r.n]<=50){D.px[r.n]=50;r.phase='prend';r.t=t;a.marche=false;a.dir='dos'}}
    else if(r.phase==='prend'){if(t-r.t>350){r.t=t;D.list.pop();if(!D.list.length)r.phase='retour'}}
    else{D.px[r.n]+=.6;a.marche=true;a.dir='d';a.pas++;if(D.px[r.n]>=r.x0){D.px[r.n]=r.x0;a.marche=false;a.dir='g';D.ramasse=null;D.next=t+1500}}}
  else if(!D.vol&&t>D.next){const n=D.tour%2?'joueur2':'joueur1',touche=Math.random()<.3,an=Math.random()*7;D.tour++;
    const r=touche?Math.random()*8:13+Math.random()*10,x1=40+Math.cos(an)*r,y1=100+Math.sin(an)*r*(touche?1:.85);
    D.vol={n,x0:D.px[n]-8,y0:SOL-30,x1,y1,t0:t,touche}}
  if(D.vol){const v=D.vol,u=Math.min(1,(t-v.t0)/450),x=v.x0+(v.x1-v.x0)*u,y=v.y0+(v.y1-v.y0)*u-Math.sin(u*Math.PI)*6;
    P(x-2,y,4,1,'#c0c0c8');P(x+2,y-1,2,3,'#f0c040');
    if(u>=1){D.list.push({x:v.x1,y:v.y1});sfx('toc');
      if(!v.touche&&Math.random()<.65)D.bulle={n:v.n,txt:RATES[Math.random()*RATES.length|0],t};
      D.vol=null;D.next=t+3500+Math.random()*1500;
      if(D.list.length>=10)D.ramasse={n:'joueur1',phase:'aller',x0:D.px.joueur1}}}
  for(const d of D.list){P(Math.round(d.x),Math.round(d.y),3,1,'#c0c0c8');P(Math.round(d.x)+3,Math.round(d.y)-1,2,3,'#f0c040')}
}
function bulleJoueur(){const D=DARTS,el=$('bulleJ');if(TEST||!el)return;
  if(!D.bulle||Date.now()-D.bulle.t>2200){el.hidden=true;return}
  if(el.textContent!==D.bulle.txt)el.textContent=D.bulle.txt;el.style.left=(D.px[D.bulle.n]/W*100)+'%';el.style.top=((SOL-60)/H*100)+'%';el.hidden=false}
SCENES.pub={nom:'Chaos Order',
  dessin(){const t=Date.now();
    vgrad(0,96,'#1f3a2c','#16281f');for(let x=0;x<W;x+=10)P(x,8,1,88,'rgba(255,255,255,.04)');
    P(0,0,W,8,'#1a0e08');for(let x=20;x<W;x+=70)P(x,0,8,10,'#2a160c');
    P(0,94,W,3,'#6a4020');vgrad(97,SOL,'#4a2a18','#2e1a10');for(let x=4;x<W;x+=32){P(x,104,26,48,'#3e2214');P(x,104,26,1,'#6a4020')}
    // cible + tableau des scores
    P(22,82,36,36,'#2a160c');cibleFlechettes(40,100);P(64,84,20,26,'#1a1a18');P(64,84,20,1,'#6a4020');for(let i=0;i<5;i++)P(67,88+i*4,6+(i*5)%9,1,'#d8d8d0');
    // porte des toilettes
    P(106,92,28,68,'#2a160c');if(S.porteWC){P(109,95,22,65,'#0e1a14');vgrad(95,160,'rgba(150,255,190,.25)','rgba(0,0,0,0)',109,22)}else{P(109,95,22,65,'#5a3420');P(112,100,16,24,'#4a2a18');P(112,130,16,24,'#4a2a18');P(126,128,3,3,'#c9a040')}
    P(112,82,16,9,'#c9a040');g.fillStyle='#2a160c';g.font="bold 7px Georgia";g.fillText('WC',114,89);
    // enseigne + étagères de bouteilles + miroir
    P(176,22,120,14,'#1a0e08');P(176,22,120,1,'#c9a040');g.fillStyle='#e8c35a';g.font="bold 8px Georgia";g.fillText('CHAOS ORDER',206,32);
    P(166,40,140,58,'#2a160c');vgrad(44,94,'rgba(200,220,230,.18)','rgba(120,140,150,.08)',196,80);
    for(let r=0;r<2;r++){P(166,64+r*26,140,3,'#6a4020');for(let i=0;i<22;i++){const x=168+i*6.2,h=10+(i*7+r*3)%6;P(x,64+r*26-h,4,h,['#2a6a3a','#8a4a1a','#c8c0a0','#3a2a5a','#a02a2a','#d8a030'][(i+r)%6]);P(x+1,64+r*26-h-2,2,2,'#222')}}
    // porte d'entrée
    P(300,92,20,68,'#2a160c');P(303,96,17,40,'#c8b070');P(303,96,17,40,'rgba(30,40,60,.6)');P(304,140,14,18,'#4a2a18');
    vgrad(SOL,H,'#3a2214','#20120a');for(let x=0;x<W;x+=22)P(x,SOL,1,20,'#2a160c');for(let y=SOL+5;y<H;y+=6)P(0,y,W,1,'rgba(0,0,0,.15)');
    // lampes
    [[200,8,26],[262,8,26],[40,8,58]].forEach(([x,y,l])=>{P(x,y,1,l,'#111');y+=l-26;P(x-6,y+26,13,5,'#1a3a2a');P(x-5,y+31,11,1,'#ffe0a0')});
    pubFlechettes();
  },
  objets:[
    {id:'joueurs',nom:'joueurs de fléchettes',humain:true,x:52,y:118,w:46,h:42,dessin(){['joueur1','joueur2'].forEach(n=>{const a=anim(n);if(!DARTS.ramasse||DARTS.ramasse.n!==n){a.marche=false;a.dir='g'}drawPerso(n,DARTS.px[n])})},
      regarder:"Ils ont l'air irra…cibles ! Haha",
      parler:()=>dire([['joueur',"Chut. Je vise."],['moi',"…Il vise depuis dix minutes."]])},
    {id:'cible',nom:'cible',x:26,y:86,w:28,h:28,regarder:"Une cible de fléchettes.",prendre:"Je ne suis pas un voleur."},
    {id:'flechette',nom:'fléchette',x:30,y:150,w:18,h:10,defaut:'prendre',cache:()=>S.f.flechette,
      dessin(){P(34,156,8,1,'#c0c0c8');P(33,156,1,1,'#888');P(42,155,3,3,'#f0c040')},
      regarder:"Quelqu'un a raté son coup.",
      prendre:async()=>{S.f.flechette=1;ajouter('flechette');await say('rod',"Personne ne la réclame ? Je la garde.")}},
    {id:'toilettes',nom:'toilettes',x:106,y:82,w:28,h:78,defaut:'utiliser',regarder:"C'est soit les toilettes, soit la cuisine vu l'odeur.",utiliser:allerToilettes},
    {id:'barman',nom:'barman',humain:true,x:261,y:96,w:20,h:18,
      dessin(){const a=anim('barman');a.marche=false;a.dir='face';drawPerso('barman',270,SOL-12);
        const t=Date.now()/220;P(271+Math.round(Math.cos(t)*2),112,6,8,'rgba(220,240,255,.6)');P(270+Math.round(Math.sin(t)*3),115,7,4,'#f0ece0')},
      regarder:"Le barman n'a pas l'air commode. Ni armoire.",
      parler:()=>dire([['barman',"Qu'est-ce que je vous sers ?"],['rod',"Juste les toilettes, merci."],['barman',"Là-bas au fond. Et on consomme après, hein."]])},
    {id:'comptoir',nom:'comptoir',x:150,y:124,w:150,h:36,loin:1,
      dessin(){P(150,122,150,5,'#7a4a24');P(150,122,150,1,'#a8784a');P(150,127,150,33,'#4a2814');for(let x=154;x<296;x+=24){P(x,131,20,20,'#3e2210');P(x,131,20,1,'#6a4020')}P(150,154,150,2,'#c9a040');
        [[238],[248]].forEach(([x])=>{P(x,108,3,14,'#c9a040');P(x-1,104,5,5,'#1a1a1a')});
        g.fillStyle='#e8d8b8';g.beginPath();g.ellipse(198,121,8,3,0,0,7);g.fill();if(!S.f.cacahuetesFin)for(let i=0;i<6;i++)P(192+i*2,118+(i%2),2,2,'#c89050');
        P(222,108,7,14,'rgba(220,240,255,.5)');for(let i=0;i<7;i++)P(222+i,101+(i%3),1,9,['#f2f2f2','#e04a4a','#4a8ae0'][i%3]);
        [178,226,286].forEach(x=>{P(x+8,112,5,10,'rgba(230,170,60,.85)');P(x+8,111,5,2,'#fff8e0')})},
      regarder:"Un vrai comptoir en bois."},
    {id:'clients',nom:'clients au comptoir',humain:true,x:162,y:114,w:136,h:46,
      dessin(){[['client1',172],['client2',222],['client3',284]].forEach(([n,x])=>{const a=anim(n);a.marche=false;a.dir='dos';drawPerso(n,x,152);P(x-7,140,14,3,'#6a4020');P(x-1,143,2,17,'#2a160c')})},
      regarder:"Des poivrots, ça fait pitié… Si j'avais le temps, je me serais bien joint à eux.",
      parler:()=>dire([['client',"Mmmh."],['moi',"Conversation passionnante. Je reviendrai."]])},
    {id:'cacahuetes',nom:'cacahuètes',x:188,y:112,w:20,h:12,defaut:'prendre',regarder:"Un bol de cacahuètes qui ont dû être touchées par cinquante mains sales avant moi.",
      prendre:async()=>{sfx('manger');if(!S.f.cacahuetes){S.f.cacahuetes=1;await say('rod',"Mmh. La différence avec la barre du métro, c'est que ça a du goût.")}else await say('rod',"Encore une poignée… Comme ça je ne viens plus les mains vides la prochaine fois chez Solène.")}},
    {id:'pailles',nom:'verre de pailles',x:219,y:98,w:13,h:24,defaut:'regarder',cache:()=>false,
      regarder:"Un verre plein de pailles.",
      prendre:async()=>{if(S.f.paille)return say('rod',"J'en ai déjà une. Pensons aux tortues.");S.f.paille=1;ajouter('paille');await say('rod',"Je t'emprunte une paille.")}},
    {id:'entree',nom:'porte du pub',x:300,y:92,w:20,h:68,regarder:"La porte qui donne sur la rue.",utiliser:"Pas tout de suite. Je suis venu pour les toilettes, je repars avec les toilettes. Enfin… façon de parler."},
    {id:'manteau_pub',nom:'',x:0,y:0,w:0,h:0,cache:()=>S.pnj.wc==null,dessin(){drawPerso('manteau',S.pnj.wc)}},
  ],
  ambiance:{nuit:.42,voile:'#120804',teinte:'rgba(255,160,70,.3)'},
  lumieres:()=>[{x:200,y:60,r:70,c:'rgba(255,200,120,.35)',vacille:1},{x:262,y:60,r:70,c:'rgba(255,200,120,.35)',vacille:1},{x:40,y:96,r:44,c:'rgba(255,220,150,.3)'},{x:310,y:120,r:30},...(S.porteWC?[{x:120,y:120,r:30,c:'rgba(150,255,190,.3)'}]:[]),...persoLumiere(30)],
  particules(){emettre(16,()=>({k:'fumee',scene:'pub',x:150+Math.random()*150,y:60+Math.random()*50,vx:(Math.random()-.5)*.1,vy:-.04,vie:300,t:1,c:'#f0d8b0',a:.3}))},
  devant:bulleJoueur,
  dessinAvant:()=>vignette(),
  async entree(){
    await noir(false);
    await dire([['rod',"Ah, un vrai pub anglais. Odeur d'urine, fléchettes et bière tiède. Parfait."],['rod',"Mais d'abord : les toilettes."]]);
  },
};
async function allerToilettes(){
  await marcher('rod',98);anim('rod').dir='d';
  if(!S.f.manteauWC){S.f.manteauWC=1;S.porteWC=1;sfx('chasse');await pause(700);
    const a=anim('manteau');S.pnj.wc=120;
    if(!TEST&&!S.passe)while(S.pnj.wc<330){a.marche=true;a.dir='d';a.pas++;S.pnj.wc+=.55;await pause(16)}
    S.pnj.wc=null;a.marche=false;
    await say('rod',"Quel drôle de zigoto. Il fait peur.");
  }
  S.porteWC=0;
  await go('toilettes',{rod:40});
}

// ----- Les toilettes -----
function singeBallon(x,y){g.fillStyle='#d8242c';g.beginPath();g.ellipse(x,y,15,18,0,0,7);g.fill();P(x-8,y-12,4,6,'rgba(255,255,255,.35)');P(x-1,y+18,3,2,'#a01a20');
  P(x-6,y-6,12,11,'#8a5a2a');P(x-9,y-3,3,4,'#8a5a2a');P(x+6,y-3,3,4,'#8a5a2a');P(x-4,y-4,8,7,'#e0b080');P(x-4,y-3,3,3,'#fff');P(x+1,y-3,3,3,'#fff');P(x-3,y-2,1,1,'#000');P(x+3,y-3,1,1,'#000');P(x-2,y+1,4,1,'#6a1010');
  P(x-12,y+1,4,4,'#f0c766');P(x+8,y+1,4,4,'#f0c766');P(x-1,y-7,3,1,'#000')}
SCENES.toilettes={nom:'Toilettes du pub',
  dessin(){const t=Date.now(),fl=(t/70|0)%40===0?.5:1;
    P(0,0,W,SOL,'#d8e8dc');for(let y=0;y<SOL;y+=8)P(0,y,W,1,'#b0c8b8');for(let x=0;x<W;x+=8)P(x,0,1,SOL,'#b0c8b8');P(0,96,W,64,'#2a6a4a');for(let y=96;y<SOL;y+=8)P(0,y,W,1,'#1e5038');for(let x=0;x<W;x+=8)P(x,96,1,64,'#1e5038');P(0,94,W,3,'#e8f0ea');
    P(60,0,90,4,'#888');P(64,4,82,3,`rgba(240,255,250,${fl})`);
    [80,110,140].forEach(x=>{P(x-8,104,16,30,'#f4f4f0');P(x-6,108,12,22,'#d8dcd8');P(x-1,96,2,8,'#c0c0c0')});
    P(166,70,40,90,'#3a5a4a');P(168,72,36,86,'#4a7a62');P(198,112,3,4,'#c0c0c0');
    P(232,84,34,26,'#9ab0b8');P(234,86,30,22,'#c8d8e0');P(236,112,30,8,'#f4f4f0');P(249,108,2,4,'#c0c0c0');P(248,120,4,40,'#d8dcd8');
    P(286,96,18,14,'#e0e0e0');P(288,110,14,2,'#888');
    P(0,92,14,68,'#4a2a18');P(10,126,2,4,'#c9a040');
    vgrad(SOL,H,'#c8d0c8','#98a098');for(let x=0;x<W;x+=12)for(let y=SOL;y<H;y+=12)if(((x+y)/12)%2)P(x,y,12,12,'rgba(0,0,0,.12)');
    if(!S.f.ballon){const y=34+Math.sin(t/900)*2;g.strokeStyle='#eee';g.beginPath();g.moveTo(186,y+18);g.quadraticCurveTo(180,y+40,190,y+56);g.stroke();singeBallon(186,y)}
    else if(!S.f.ballonParti){P(196,155,12,4,'#c8242c');P(198,153,5,3,'#a01a20');P(205,156,6,2,'#e04a4a')}
    if(S.f.ballon&&!S.f.boulette){P(178,153,7,6,'#efe8d0');P(179,154,3,1,'#b8b0a0');P(181,157,3,1,'#b8b0a0')}
  },
  objets:[
    {id:'sortie_wc',nom:'retour au pub',x:0,y:92,w:16,h:68,defaut:'utiliser',regarder:"La porte du pub.",utiliser:()=>go('pub',{rod:98})},
    {id:'urinoirs',nom:'urinoirs',x:70,y:100,w:80,h:36,regarder:"Bon. Je suis venu pour ça.",utiliser:"…C'est fait. On n'en parlera plus jamais."},
    {id:'lavabo',nom:'lavabo',x:232,y:84,w:36,h:40,regarder:"Un lavabo et un miroir. J'ai une tête de bleureurlour.",utiliser:"Bon allez je me lave les mains pour une fois."},
    {id:'sechemain',nom:'sèche-mains',x:284,y:94,w:22,h:20,regarder:"Un sèche-mains. Ça me rappelle un dessin animé. Blanche-Fesse et le sèche-main.",utiliser:"Vrrrrr… Il marche celui-là au moins."},
    {id:'cabine_wc',nom:'cabine',x:166,y:70,w:40,h:90,regarder:"Une cabine fermée. « OCCUPÉ ». Je préfère ne rien savoir.",utiliser:"C'est occupé. « It's occupède !! »"},
    {id:'ballon',nom:'ballon rouge',x:168,y:14,w:36,h:60,cache:()=>S.f.ballon,
      regarder:"Un ballon rouge. C'est quoi ce dessin bizarre ?",
      prendre:"Trop haut. Même en sautant.",
      with:{flechette:async()=>{sfx('fleche');await pause(500);await dire([['rod',"Allez… dans le mille !"],['rod',"…Pas assez de force."],['rod',"Je la ramasse. Il me faudrait quelque chose en plus je pense."]])},
        paille:"Souffler dans une paille vide sur un ballon ? Je vais juste le décoiffer.",
        sarbacane:async()=>{sfx('souffle');await pause(450);sfx('pop');S.f.ballon=1;S.flash=.5;await pause(400);
          await dire([['rod',"BAM ! En plein dans le mille."],['rod',"Tiens, keskecé ?"]])}}},
    {id:'boulette',nom:'boulette de papier',x:172,y:148,w:18,h:14,defaut:'prendre',cache:()=>!S.f.ballon||S.f.boulette,regarder:"Une boulette de papier.",prendre:lireBoulette},
  ],
  ambiance:{nuit:.22,voile:'#000',teinte:'rgba(140,255,190,.2)'},
  lumieres:()=>[{x:104,y:10,r:120,c:'rgba(220,255,240,.25)'},...(S.papierBrille?[{x:S.pos.rod??180,y:120,r:60,c:'rgba(255,230,150,.6)'}]:[]),...persoLumiere(30)],
  particules(){if(S.papierBrille)emettre(60,()=>({k:'papier',scene:'toilettes',x:(S.pos.rod??180)+(Math.random()-.5)*50,y:110+(Math.random()-.5)*50,vx:(Math.random()-.5),vy:-.3-Math.random(),vie:40+Math.random()*30,t:1,c:'#fff3b0',glow:1}))},
  dessinAvant:()=>vignette(),
  async entree(){await say('rod',"Qu'est-ce que c'est que ça ?")},
};
async function lireBoulette(){
  S.f.boulette=1;ajouter('boulette');
  await say('rod',"Une boulette de papier… Il y a quelque chose d'écrit.");
  await say('rod',"« Je t'appelle… »");
  sfx('magie');S.papierBrille=1;await pause(1200);sfx('eblouit');S.flash=1;await pause(300);
  S.papierBrille=0;retirer('boulette');S.f.ballonParti=1;S.flash=1;await pause(500);
  await dire([['rod',"Hein ? Le papier… le ballon… Plus rien. J'ai rêvé ou quoi ?"],['rod',"Et j'ai même pas encore bu."]]);
  // Rod ressort : la devanture porte son vrai nom
  await noir(true);S.f.vraiNom=1;
  await go('devanture',{rod:160});anim('rod').dir='face';
  await noir(false);await pause(600);
  await dire([['rod',"…« The English Pub » ?"],['rod',"Il y a quelque chose d'étrange dans ce coin…"]]);
  await noir(true);
  await carton("Pendant ce temps, du côté de Solène…");
  await debutSolene();
}
MUSIQUE_SCENE.pub='pub';MUSIQUE_SCENE.toilettes='pub';AMBIANCE_SCENE.pub='brouhaha';

// ----- La devanture du pub (avant d'entrer, puis avec son vrai nom) -----
SCENES.devanture={nom:'Devanture du pub',reflet:1,
  dessin(){const t=Date.now(),vrai=S.f.vraiNom;
    vgrad(0,60,'#3a4660','#6a7890');
    for(let x=0;x<W;x+=16)for(let y=0;y<92;y+=6)P(x+((y/6)%2)*8,y,15,5,shade('#6a3a2a',.8+((x*7+y*3)%9)/40));
    P(0,58,W,2,'#2a1810');for(let i=0;i<5;i++){P(14+i*64,18,26,30,'#2a2a38');P(16+i*64,20,22,26,'#e8c890');P(26+i*64,20,2,26,'#2a2a38');P(16+i*64,32,22,2,'#2a2a38')}
    // façade en bois vert
    P(20,60,280,100,'#1e4a34');P(20,60,280,2,'#3a7a5a');P(20,158,280,2,'#12301f');
    // enseigne
    P(30,64,260,22,'#0e2618');P(32,66,256,18,'#163a28');P(32,66,256,1,'#c9a040');P(32,83,256,1,'#c9a040');
    g.fillStyle='#f0c766';g.font="bold 13px Georgia";g.textAlign='center';g.fillText(vrai?'THE ENGLISH PUB':'CHAOS ORDER',160,80);g.textAlign='left';
    // vitrines éclairées
    [[34,92],[196,92]].forEach(([x,y])=>{P(x,y,90,52,'#c8902a');vgrad(y,y+52,'#ffd890','#c87a2a',x+2,86);
      for(let i=0;i<3;i++){P(x+8+i*28,y+24,10,28,'#3a2214');P(x+10+i*28,y+18,6,7,'#3a2214')}P(x+44,y,2,52,'#1e4a34');P(x,y+26,90,2,'#1e4a34');P(x,y+50,90,4,'#12301f')});
    // porte
    P(140,90,40,70,'#12301f');P(144,94,32,66,'#3a2214');P(148,98,24,26,'#e8b060');P(159,98,2,26,'#3a2214');P(170,130,3,3,'#c9a040');
    // enseigne suspendue + lanternes
    P(296,40,2,30,'#222');P(286,44,22,2,'#222');P(288,46,18,22,'#163a28');P(290,48,14,18,'#c9a040');P(292,50,10,14,'#163a28');
    [[132,96],[188,96]].forEach(([x,y])=>{P(x-3,y,7,10,'#222');P(x-2,y+2,5,6,'#ffe0a0')});
    // ardoise
    P(232,124,26,34,'#3a2214');P(234,126,22,24,'#1a1a1a');for(let i=0;i<4;i++)P(237,130+i*5,10+(i*5)%8,1,'#e8e8e0');P(236,150,3,8,'#3a2214');P(252,150,3,8,'#3a2214');
    vgrad(SOL,H,'#55555f','#383840');P(0,SOL,W,1,'#9c9ca6');
    // pluie
    for(let i=0;i<50;i++){const x=(i*61+t/12)%W,y=(i*37+t/3)%H;P(x,y,1,3,'rgba(210,225,240,.4)')}
  },
  objets:[
    {id:'porte_pub',nom:'porte du pub',x:140,y:90,w:40,h:70,defaut:'utiliser',regarder:()=>say('rod',S.f.vraiNom?"La porte du pub. Je n'y retourne pas tout de suite.":"Ça sent la bière d'ici."),
      utiliser:async()=>{if(S.f.vraiNom)return say('rod',"Non. J'ai eu ma dose de mystère pour aujourd'hui.");await marcher('rod',160);anim('rod').dir='dos';await go('pub',{rod:296})}},
    {id:'enseigne',nom:'enseigne',x:30,y:64,w:260,h:22,loin:1,regarder:()=>say('rod',S.f.vraiNom?"« The English Pub ». Original. Très original.":"« Chaos Order ». Drôle de nom pour un pub. Ça promet.")},
    {id:'vitrines',nom:'vitrines',x:34,y:92,w:90,h:52,loin:1,regarder:"Ça a l'air chaleureux. Et poisseux."},
    {id:'vitrines2',nom:'vitrines',x:196,y:92,w:90,h:52,loin:1,regarder:"Ça a l'air chaleureux. Et poisseux."},
    {id:'ardoise',nom:'ardoise',x:232,y:124,w:26,h:34,regarder:"« Happy hour de 17 h à 19 h ». Il est 14 h. Évidemment."},
  ],
  ambiance:{nuit:.3,voile:'#1a2440',teinte:'rgba(90,130,200,.3)'},
  lumieres:()=>[{x:79,y:118,r:60,c:'rgba(255,200,120,.35)'},{x:241,y:118,r:60,c:'rgba(255,200,120,.35)'},{x:160,y:110,r:30,c:'rgba(255,190,110,.3)'},{x:132,y:100,r:18,c:'rgba(255,220,150,.5)',vacille:1},{x:188,y:100,r:18,c:'rgba(255,220,150,.5)',vacille:1},{x:160,y:76,r:80,c:'rgba(240,200,100,.15)'},...persoLumiere(30)],
  dessinAvant:()=>vignette(),
  async entree(){await noir(false);await say('rod',"« Chaos Order »… Drôle de nom pour un pub. Bon, tant qu'il y a des toilettes.")},
};
MUSIQUE_SCENE.devanture='magie';AMBIANCE_SCENE.devanture='pluie';
