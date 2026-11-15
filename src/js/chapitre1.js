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
  regarder:()=>say('moi',S.f.piece?"La cabine. Le téléphone est raccroché, sage comme une image. Trop sage.":"Une cabine rouge. Plus personne ne s'en sert, sauf pour les selfies."),
  utiliser:async()=>{await marcher('yvan',39);
    if(S.f.piece)return say('moi',"Je ne décroche plus. Ce téléphone a des projets pour moi, et moi aucun pour lui.");
    if(!S.f.cabine){S.f.cabine=1;return say('moi',"Il fait sombre là-dedans… Tiens ? Une pièce qui brille, posée à côté du combiné.")}
    return say('moi',"La pièce brille toujours à côté du combiné.")}});
Object.assign(ob('bus'),{nom:'bus-musée',defaut:'utiliser',
  regarder:()=>say('moi',S.f.busNormal?"Un bus. Juste un bus. Ça me rassure et ça m'inquiète à la fois.":"Un bus rouge avec une pancarte : « MUSÉE DES CURIOSITÉS — ENTRÉE LIBRE ». Des gens entrent, ressortent… l'air un peu secoués."),
  utiliser:entrerBus});
SCENES.londres.objets.push(
  {id:'pancarte',nom:'pancarte du bus',x:154,y:141,w:34,h:9,loin:1,dessin(){if(S.f.busNormal)return;P(154,141,34,9,'#f3e2b0');P(154,141,34,1,'#fff6d8');g.fillStyle='#5a1020';g.font="bold 7px Georgia";g.fillText('MUSÉE',159,148)},
    cache:()=>S.f.busNormal,regarder:()=>ob('bus').regarder()},
  {id:'passants',nom:'',x:0,y:0,w:0,h:0,dessin:passants},
  {id:'hote',nom:"l'hôte",humain:true,x:222,y:118,w:14,h:42,cache:()=>S.f.busNormal,dessin(){anim('hote').dir='face';drawPerso('hote',229)},
    regarder:"Un monsieur à moustache blanche et gilet bordeaux. Il sourit beaucoup. Peut-être trop.",
    parler:()=>dire([['hote',"Entrez, entrez ! C'est gratuit ! N'ayez pas peur !"],['moi',"C'est le « n'ayez pas peur » qui me fait peur."]]),
    with:{piece:()=>say('hote',"Gardez-la, mon ami. Ici, tout est gratuit… presque tout.")}},
  {id:'manteau',nom:'',x:0,y:0,w:0,h:0,cache:()=>S.pnj.manteau==null,dessin(){drawPerso('manteau',S.pnj.manteau)}},
  {id:'piece',nom:'pièce brillante',x:36,y:117,w:11,h:11,defaut:'prendre',cache:()=>!S.f.cabine||S.f.piece,
    dessin(){const b=.5+.5*Math.sin(Date.now()/150);g.globalAlpha=.4+b*.4;P(39,120,6,6,'#fff3b0');g.globalAlpha=1;P(40,121,4,4,'#f0c766');P(41,122,2,2,'#ffe9a0')},
    regarder:"Une pièce dorée, toute chaude. Je n'ai jamais vu cette monnaie.",prendre:prendrePiece},
);
Object.assign(SCENES.londres,{lumieres:(f=>()=>[...f(),...(S.f.cabine&&!S.f.piece?[{x:42,y:123,r:12,c:'rgba(255,220,120,.5)',vacille:1}]:[])])(SCENES.londres.lumieres)});

function passants(){if(S.f.busNormal)return;const t=Date.now()/1000;
  [['visiteur',0],['visiteuse',4.5]].forEach(([n,ph])=>{const c=(t+ph)%9;let x,d;
    if(c<3.5){x=-10+c/3.5*218;d='d'}else if(c>=5&&c<8.5){x=208-(c-5)/3.5*218;d='g'}else return;
    const a=anim(n);a.dir=d;a.marche=true;a.pas=t*12|0;drawPerso(n,x)})}

async function prendrePiece(){
  await marcher('yvan',39);S.f.piece=1;ajouter('piece');
  await say('moi',"Hop, dans la poche.");
  sfx('sonnerie');await pause(1200);
  await say('moi',"…Le téléphone sonne ?!");
  await dire([['tel',"Bzrkkks… c'est toi ?"],['yvan',"Bah oui, j'suis moi !"],['tel',"Je ne reconnais pas ta voix…"],['yvan',"Qui est-ce ?"],['tel',"Ce n'est pas ce qui était prévu."]]);
  sfx('raccroche');
  await say('moi',"…Il a raccroché. Super. Très rassurant.");
}
async function entrerBus(){
  if(S.f.busNormal)return say('moi',"Non merci. J'ai assez donné.");
  await marcher('yvan',206);
  if(!S.f.hote){S.f.hote=1;
    await say('hote',"Entrez, entrez ! C'est gratuit ! N'ayez pas peur !");
    anim('yvan').tremble=true;
    await dire([['yvan',"J'ai peur. J'ai très peur."],['yvan',"…Mais c'est gratuit."]]);
    anim('yvan').tremble=false}
  await go('bus',{yvan:26});
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
    if(S.f.fente)P(158,81,4,1,'#000');
    const cy=(t/300|0)%2;P(149,93-cy,5,5,'#f0c766');P(150,94-cy,3,3,'#ffe9a0');P(166,93-cy,5,5,'#f0c766');P(167,94-cy,3,3,'#ffe9a0');
    if(br){g.save();g.globalCompositeOperation='lighter';halo(160,92,40+Math.random()*10,'rgb(255,230,150)',.9);g.restore()}
    // porte de sortie
    P(0,96,13,64,'#120610');P(0,96,13,2,'#c99a3a');P(10,126,2,4,'#c99a3a');
  },
  objets:[
    {id:'sortie',nom:'sortie',x:0,y:94,w:16,h:66,defaut:'utiliser',regarder:"La sortie. Ma meilleure amie dans ce bus.",utiliser:sortirBus},
    {id:'momie',nom:'momie',x:18,y:96,w:28,h:64,cache:BIZARRE,
      dessin(){P(18,96,28,64,'#b88a30');P(18,96,28,2,'#e8c35a');P(22,100,20,58,'#d8d0b0');for(let y=104;y<156;y+=4)P(22,y,20,1,'#b8b090');P(27,108,10,1,'#3a2a1a');P(26,110,4,2,'#120808');P(34,110,4,2,'#120808');P(21,99,22,1,'#e8c35a')},
      regarder:"Une momie dans son sarcophage. Elle a un bracelet en plastique « VISITEUR ». Je préfère ne pas savoir.",
      prendre:"Je ne prends pas de momie. Même petite. Même gratuite.",parler:"…Elle n'a pas répondu. Ouf."},
    {id:'vaudou',nom:'table vaudou',x:54,y:108,w:44,h:52,cache:BIZARRE,
      dessin(){P(54,130,44,4,'#4a2a1a');P(56,134,3,26,'#3a1e12');P(93,134,3,26,'#3a1e12');
        P(62,117,9,13,'#a08060');P(63,111,7,7,'#a08060');P(64,113,2,1,'#2a1a10');P(67,113,2,1,'#2a1a10');[[62,119,'#c22'],[69,121,'#f0c766'],[65,124,'#c22'],[66,112,'#f0c766']].forEach(([x,y,c])=>{P(x,y,1,1,c);P(x-1,y-1,1,1,'#ccc')});
        P(76,123,9,7,'#e8e0d0');P(78,125,2,2,'#1a1010');P(81,125,2,2,'#1a1010');P(79,128,3,1,'#1a1010');
        P(89,119,2,11,'#f0e0c0');P(93,121,2,9,'#f0e0c0');const f=(Date.now()/90|0)%2;P(89,117-f,2,2,'#ffb030');P(93,119+f-1,2,2,'#ffb030')},
      regarder:"Une poupée pleine d'épingles, un crâne et des bougies. L'étiquette dit : « Souvenir de vacances ». De qui ?",
      prendre:"Toucher la poupée ? Et si c'était quelqu'un que je connais ?",utiliser:"Je ne pique rien. Je ne souffle rien. Je ne touche rien."},
    {id:'citrouilles',nom:'citrouilles dorées volantes',x:80,y:20,w:160,h:46,loin:1,cache:BIZARRE,
      dessin(){const t=Date.now()/700;[[100,0],[160,2],[214,4]].forEach(([x,p])=>{const y=34+Math.sin(t+p)*6,xx=x+Math.sin(t*.7+p)*8;
        halo(xx,y,14,'rgb(255,200,80)',.35);g.fillStyle='#e8a820';g.beginPath();g.ellipse(xx,y,7,5,0,0,7);g.fill();P(xx-1,y-1-4,1,6,'#c88a10');P(xx+3,y-1-3,1,5,'#c88a10');P(xx-5,y-2,1,4,'#c88a10');P(xx,y-7,2,2,'#3a7a2a');P(xx-3,y-3,2,1,'#fff6c0')})},
      regarder:"Des citrouilles en or qui volent. Sans fil, sans aimant, sans aucune explication raisonnable.",
      prendre:"Trop haut. Et puis on ne vole pas ce qui vole déjà."},
    {id:'lennons',nom:'méditants à lunettes rondes',x:224,y:120,w:76,h:40,cache:BIZARRE,
      dessin(){[234,276].forEach((x,i)=>{const a=anim('lennon');a.marche=false;a.dir='face';drawPerso('lennon',x,SOL-8);P(x-11,SOL-10,22,10,i?'#8a3ab0':'#3a6ab0');P(x-11,SOL-10,22,1,'#ffffff40')});
        const t=Date.now()/400;for(let i=0;i<4;i++){g.fillStyle=`rgba(230,220,255,${.25-i*.05})`;g.beginPath();g.arc(255+Math.sin(t+i)*3,128-i*7,2+i,0,7);g.fill()}P(254,140,2,8,'#5a3a2a')},
      regarder:"Deux types aux cheveux longs et lunettes rondes, en blanc, qui méditent. Ils se ressemblent comme deux gouttes d'eau. Et ils fredonnent.",
      parler:async()=>dire([['moi',"Euh… bonjour ?"],['moi',"…Ils font « Ommm ». En harmonie. À deux voix."]])},
    {id:'visiteuse',nom:'visiteuse',humain:true,x:113,y:118,w:14,h:42,cache:BIZARRE,dessin(){const a=anim('visiteuse');a.marche=false;a.dir='face';drawPerso('visiteuse',120)},
      regarder:"Une dame aux cheveux roses, jumelles autour du cou. Elle observe la momie comme un oiseau rare.",
      parler:()=>dire([['visiteuse',"Chut ! Elle a cligné de l'œil. Je l'ai vu. Personne ne me croit jamais."],['moi',"…Moi, je vous crois. C'est bien ça le problème."]])},
    {id:'visiteur',nom:'visiteur',humain:true,x:189,y:118,w:14,h:42,cache:BIZARRE,dessin(){const a=anim('visiteur');a.marche=false;a.dir='face';drawPerso('visiteur',196);P(192,134,8,5,'#222');P(195,135,2,2,'#8ac')},
      regarder:"Un monsieur en bermuda, chaussettes et sandales, appareil photo au cou. Un touriste. Le seul truc rassurant ici.",
      parler:()=>dire([['visiteur',"Magnifique, n'est-ce pas ? Je viens tous les jours. Enfin, je crois. Le temps passe bizarrement ici."]])},
    {id:'singe',nom:'singe aux cymbales',x:148,y:80,w:24,h:26,cache:BIZARRE,
      regarder:async()=>{S.f.fente=1;await dire([['moi',"Un singe mécanique avec ses cymbales. Enfin quelque chose de normal."],['moi',"…Normal. Sauf ce regard. On dirait qu'il me suit des yeux."],['moi',"Et sur le dessus de sa tête… il y a une fente ?"]])},
      prendre:"Ah non. Je ne le touche pas. Il me regarde.",utiliser:"Le remonter ? Pour qu'il se mette à taper ses cymbales tout seul la nuit ? Non.",
      parler:"Je ne parle pas au singe. Je ne veux surtout pas qu'il me réponde.",
      with:{piece:singePiece}},
    {id:'siege',nom:'sièges',x:40,y:110,w:240,h:30,cache:()=>!S.f.busNormal,regarder:"Des sièges rouges, un peu râpés. Aucune momie. Aucune citrouille. Aucun singe."},
  ],
  particules(){if(S.f.busNormal)return;
    if(S.singeBrille)emettre(80,()=>({k:'singe',scene:'bus',x:160+(Math.random()-.5)*40,y:92+(Math.random()-.5)*30,vx:(Math.random()-.5)*1.5,vy:(Math.random()-.5)*1.5,vie:30+Math.random()*30,t:1,c:'#fff3b0',glow:1}));
    emettre(18,()=>({k:'pous',scene:'bus',x:Math.random()*W,y:40+Math.random()*100,vx:(Math.random()-.5)*.1,vy:-.05,vie:200+Math.random()*200,t:1,c:'#f0c0ff',a:.5}))},
  get ambiance(){return S.f.busNormal?{nuit:.12,voile:'#000',teinte:'rgba(255,240,200,.12)'}:{nuit:.5,voile:'#10040c',teinte:'rgba(200,80,160,.3)'}},
  lumieres:()=>S.f.busNormal?[{x:160,y:40,r:160}]:[{x:160,y:92,r:44,c:'rgba(255,220,140,.4)'},{x:91,y:118,r:22,c:'rgba(255,180,80,.45)',vacille:1},{x:160,y:36,r:90,c:'rgba(255,200,80,.2)'},{x:255,y:130,r:30},{x:32,y:120,r:30},{x:120,y:130,r:26},{x:196,y:130,r:26},...persoLumiere(30)],
  dessinAvant:()=>vignette(),
  async entree(){await dire([['moi',"…Waouh. C'est beaucoup plus grand dedans que dehors."],['moi',"Comment c'est possible ? C'est un bus. J'ai vu les roues."]])},
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
  await dire([['moi',"…"],['moi',"Hein ? C'est… un bus. Juste un bus normal. Où sont passés la momie, les citrouilles, les méditants… ?"],['moi',"Et je suis tout seul."]]);
}
async function sortirBus(){
  await go('londres',{yvan:192});
  if(!S.f.busNormal||S.f.manteau)return;
  S.f.manteau=1;
  await say('moi',"Ouf. De l'air. De la pluie, mais de l'air.");
  const a=anim('manteau');S.pnj.manteau=330;
  if(!TEST&&!S.passe)while(S.pnj.manteau>210){a.marche=true;a.dir='g';a.pas++;S.pnj.manteau-=1.3;await pause(16)}
  S.pnj.manteau=null;a.marche=false;
  await dire([['moi',"…Un type aux cheveux longs, long manteau noir et lunettes noires, vient d'entrer dans le bus. Sans même me regarder."],['moi',"Il a l'air de savoir exactement où il va. Lui."]]);
  await noir(true);
  await carton("Pendant ce temps, du côté de Rod…");
  S.f.finYvan=1;
  await carton("À suivre…");
  await noir(false);
}
