// ===== Chapitre 3 : la partie de Solène (magasin de bonbons, joute avec le vigile) puis retrouvailles =====
Object.assign(AUTRES,{vigile:'Le vigile',enfant:'Un enfant',tous:'Yvan, Rod et Solène'});
Object.assign(COUL,{vigile:'#c0c8ff',enfant:'#ffe080',tous:'#f0c766'});
Object.assign(SPEC,{
  vigile:{skin:'#8a5a3a',hair:'#111',coiffure:'court',top:'#151515',veste:'#0a0a0a',pants:'#0a0a0a',shoes:'#050505',lunettes:1},
  enfant1:{skin:'#f0c8a8',hair:'#6a4020',coiffure:'court',top:'#f0c030',pants:'#3a6ab0',shoes:'#e84a4a'},
  enfant2:{skin:'#e8b890',hair:'#e8c060',coiffure:'long',top:'#ff7ab0',pants:'#7a4ab0',shoes:'#ffffff'},
});
OBJETS.nounours={nom:'Gros nounours en chocolat',desc:"Un gros nounours en chocolat, au fond de mon sac à dos. Je n'ai rien vu. Je ne sais rien.",
  icone:c=>{R(3,2,2,2,'#6a3a1a',c);R(7,2,2,2,'#6a3a1a',c);R(3,3,6,8,'#7a4a24',c);R(4,4,4,3,'#9a6a3a',c)}};
const melange=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
// Phrases du vigile (dans l'ordre) et la bonne réplique de Solène pour chacune
const JOUTE=[
  ["Je vous ai vue.","Et mes fesses aussi ?"],
  ["Vous allez me suivre.","Sur instagroom ?"],
  ["Venez ou j'appelle la police.","Ohla, don't stand so close to me."],
  ["Payez ou partez.","J'ai un 3e choix ?"],
  ["Cette jeunesse…","Cette vieillesse…"],
  ["Bon, ça ira pour cette fois.","Pour la prochaine aussi, j'espère."],
  ["Dépêchez-vous de partir avant que je ne change d'avis.","OK, mais je peux avoir un bonbon ?"],
];

async function debutSolene(){
  S.f.finRod=1;S.verrou='solene';S.perso='solene';S.tenue='';S.posY={};ui();
  await go('bonbons',{solene:30,yvan:null,rod:null});
}

// ----- Le magasin de bonbons -----
const enfantX=i=>{const t=Date.now()/1000+i*2.3,c=(t%6)/6,u=c<.5?c*2:2-c*2;return 50+u*170};
const enfantDir=i=>{const t=Date.now()/1000+i*2.3,c=(t%6)/6;return c<.5?'d':'g'};
function bocal(x,y,c1,c2){P(x,y,16,20,'rgba(220,240,255,.35)');P(x+1,y+6,14,13,c1);for(let i=0;i<10;i++)P(x+2+(i*5)%12,y+7+(i*3)%11,2,2,i%2?c2:'#fff');P(x-1,y-2,18,3,'#e84a8a');P(x+2,y,1,18,'rgba(255,255,255,.5)')}
function singeChoco(x,y){P(x-4,y-8,8,9,'#6a3a1a');P(x-5,y-6,2,3,'#6a3a1a');P(x+3,y-6,2,3,'#6a3a1a');P(x-3,y-6,6,5,'#9a6a3a');P(x-2,y-5,2,2,'#f0e8d8');P(x+1,y-5,2,2,'#f0e8d8');P(x-2,y-4,1,1,'#000');P(x+2,y-5,1,1,'#000');P(x-1,y-2,3,1,'#3a1a0a');
  P(x-4,y+1,8,9,'#7a4a24');P(x-3,y+2,6,3,'#c8242c');P(x-8,y+2,4,4,'#f0c766');P(x+4,y+2,4,4,'#f0c766');P(x-7,y+3,2,2,'#fff3b0');P(x+5,y+3,2,2,'#fff3b0');P(x-1,y-9,3,1,'#2a1408')}
SCENES.bonbons={nom:'Le magasin de bonbons',
  dessin(){const t=Date.now();
    vgrad(0,SOL,'#ffd6e8','#ffb8d6');for(let x=0;x<W;x+=16)P(x,0,8,SOL,'rgba(255,255,255,.25)');
    P(0,0,W,10,'#e84a8a');for(let x=0;x<W;x+=12){g.fillStyle=x%24?'#ffe080':'#7ad0ff';g.beginPath();g.moveTo(x,10);g.lineTo(x+12,10);g.lineTo(x+6,18);g.fill()}
    // étagères à bocaux
    for(let r=0;r<3;r++){P(20,46+r*30,200,3,'#b86a3a');P(20,49+r*30,200,1,'#8a4a2a')}
    const coul=[['#ff4a4a','#ffe040'],['#4ab0ff','#ffffff'],['#7ae07a','#ff7ab0'],['#ffa040','#7a4ab0'],['#c84aff','#ffe040'],['#ff7ab0','#4ab0ff']];
    for(let r=0;r<3;r++)for(let i=0;i<9;i++){const[c1,c2]=coul[(i+r*2)%6];bocal(24+i*22,24+r*30,c1,c2)}
    // grandes sucettes au mur
    [[244,34,'#ff4a8a'],[276,30,'#4ab0ff'],[260,62,'#7ae07a']].forEach(([x,y,c])=>{P(x-1,y+10,2,26,'#f2f2f2');for(let k=0;k<5;k++){g.strokeStyle=k%2?'#fff':c;g.lineWidth=2;g.beginPath();g.arc(x,y,11-k*2,0,7);g.stroke()}g.lineWidth=1});
    // présentoir bas : chocolats, nounours, bonbons bleus, berlingots, cannes
    P(20,128,200,32,'#c8783a');P(20,128,200,2,'#e8a060');for(let x=24;x<216;x+=48){P(x,134,44,22,'#a85a2a')}
    for(let i=0;i<6;i++){P(28+i*6,120-i%2*2,5,8,'#5a2a10');P(29+i*6,121-i%2*2,3,1,'#c99a3a')}
    for(let i=0;i<7;i++){const c=['#ff4a4a','#ffe040','#7ae07a','#ffa040','#ff7ab0'][i%5];P(72+i*5,121,4,5,c);P(73+i*5,119,2,2,c)}
    for(let i=0;i<8;i++)P(114+i*4,122+(i%2),3,4,'#4ab0ff');
    for(let i=0;i<6;i++){g.fillStyle=['#ff4a4a','#ffe040','#7ae07a'][i%3];g.beginPath();g.moveTo(152+i*6,126);g.lineTo(155+i*6,120);g.lineTo(158+i*6,126);g.fill()}
    [[194,0],[200,1],[206,0]].forEach(([x,k])=>{P(x,104,2,24,'#fff');for(let y=106;y<128;y+=4)P(x,y,2,2,'#e82a2a');P(x-4+k,100,6,2,'#fff');P(x-5+k,100,2,6,'#fff')});
    // barbe à papa
    P(232,112,22,48,'#e8e8f0');P(230,108,26,6,'#c0c0d0');g.fillStyle='#ffb0e0';for(let i=0;i<6;i++){g.beginPath();g.arc(238+i*2+Math.sin(t/300+i)*1,98-(i%3)*3,6,0,7);g.fill()}P(242,96,2,14,'#f2f2f2');
    // gros nounours au chocolat sur son socle
    P(150,92,26,6,'#e84a8a');P(150,92,26,1,'#ffb0d0');
    if(!S.f.nounours){P(156,74,4,4,'#5a2a10');P(166,74,4,4,'#5a2a10');P(155,76,16,16,'#6a3a1a');P(158,79,10,6,'#8a5a2a');P(159,80,2,2,'#2a1408');P(165,80,2,2,'#2a1408');P(161,83,4,2,'#2a1408');P(157,86,12,6,'#7a4a24');P(155,90,16,2,'#c99a3a')}
    // porte et clochette
    P(296,60,24,100,'#7a3a5a');P(300,64,16,40,'#cfe6ff');P(300,64,16,40,'rgba(255,255,255,.3)');P(298,108,20,50,'#8a4a6a');P(298,58,6,4,'#f0c766');
    vgrad(SOL,H,'#f0e0f0','#d8c0d8');for(let x=0;x<W;x+=12)for(let y=SOL;y<H;y+=12)if(((x+y)/12)%2)P(x,y,12,12,'rgba(232,74,138,.15)');
    // le singe en chocolat dans la main de Solène
    if(S.choco&&S.pos.solene!=null)singeChoco(S.pos.solene+12,SOL-26);
  },
  objets:[
    {id:'etageres',nom:'bocaux de bonbons',x:20,y:20,w:200,h:96,regarder:"Des dizaines de bocaux : réglisse, fraises Tagada, bonbons acidulés, crocodiles… Mon dentiste va pleurer."},
    {id:'sucettes',nom:'sucettes géantes',x:230,y:20,w:60,h:76,regarder:"Des sucettes plus grosses que ma tête. Spirales de toutes les couleurs. N'importe quel enfant serait aux anges."},
    {id:'chocolats',nom:'chocolats',x:24,y:114,w:38,h:16,regarder:"Des tablettes de chocolat. Au lait, noir, aux noisettes. Mes trois amours."},
    {id:'nounours_etal',nom:'nounours en guimauve',x:68,y:114,w:38,h:14,regarder:"Des nounours en guimauve de toutes les couleurs. Ils me regardent avec leurs petits yeux tout mous."},
    {id:'bonbons_bleus',nom:'schtroumpfs en bonbon',x:110,y:114,w:36,h:14,regarder:"Des schtroumpfs en bonbon. Bleus, gélatineux, et d'un goût que personne n'a jamais su décrire."},
    {id:'berlingots',nom:'berlingots',x:148,y:114,w:40,h:14,regarder:"Des berlingots. Les bonbons de grand-mère, ceux qui collent aux dents pour toujours."},
    {id:'cannes',nom:'cannes en sucre',x:188,y:96,w:24,h:32,regarder:"Des cannes en sucre rayées rouge et blanc. Noël avant l'heure."},
    {id:'barbe',nom:'barbe à papa',x:228,y:88,w:30,h:72,regarder:"Une machine à barbe à papa. Un nuage rose qui tourne tout seul. Hypnotique."},
    {id:'gros_nounours',nom:'gros nounours en chocolat',x:152,y:70,w:22,h:24,defaut:'prendre',voler:1,cache:()=>S.f.nounours,
      regarder:"Un gros nounours en chocolat, de la taille d'un doudou. Il me fait de l'œil. Enfin… il me semble.",
      prendre:async()=>{S.f.nounours=1;ajouter('nounours');sfx('papier');await dire([['solene',"Hop. Dans le sac à dos."],['solene',"…J'ai fait ça, moi ? Une psy. Qui vole un nounours. Il faudra que j'en parle à quelqu'un."]])}},
    {id:'enfants',nom:'enfants',humain:true,get x(){return enfantX(0)-6},y:126,w:12,h:34,
      dessin(){[0,1].forEach(i=>{const n='enfant'+(i+1),a=anim(n);a.marche=true;a.dir=enfantDir(i);a.pas=Date.now()/40|0;g.save();g.translate(enfantX(i),SOL);g.scale(.7,.7);drawPerso(n,0,0);g.restore()})},
      regarder:"Deux enfants qui courent partout, du sucre plein les poches. Ils ne vont pas dormir avant jeudi.",
      parler:()=>dire([['enfant',"On a le droit à UN bonbon ! UN ! UN !"],['solene',"…Et vous en êtes à combien ?"],['enfant',"Quarante-deux !"]])},
    {id:'vigile',nom:'vigile',humain:true,x:270,y:104,w:24,h:56,
      dessin(){const a=anim('vigile');a.marche=false;a.dir='face';g.save();g.translate(282,SOL);g.scale(1.25,1.25);drawPerso('vigile',0,0);g.restore()},
      regarder:"Un vigile immense, près de l'entrée. Il n'a pas bougé d'un millimètre depuis que je suis entrée. Il cligne, au moins ?",
      parler:()=>dire([['solene',"Bonjour !"],['vigile',"…"],['solene',"Très bavard. J'adore."]])},
    {id:'porte_bonbons',nom:'sortie',x:296,y:60,w:24,h:100,defaut:'utiliser',regarder:"La porte du magasin, avec sa petite clochette.",utiliser:sortirBonbons},
  ],
  ambiance:{nuit:.12,voile:'#200010',teinte:'rgba(255,150,200,.2)'},
  lumieres:()=>[{x:120,y:20,r:140,c:'rgba(255,230,240,.25)'},{x:163,y:84,r:22,c:'rgba(255,200,120,.3)'},...persoLumiere(30)],
  particules(){emettre(20,()=>({k:'sucre',scene:'bonbons',x:Math.random()*W,y:Math.random()*150,vx:(Math.random()-.5)*.1,vy:.05,vie:300,t:1,c:['#fff','#ffb0e0','#b0e0ff'][Math.random()*3|0],a:.6}))},
  dessinAvant:()=>vignette(),
  async entree(){await noir(false);await say('solene',"Ohlala, j'en aurai jamais assez ! C'est sûr !")},
};
async function sortirBonbons(){
  await marcher('solene',262);
  if(!S.f.nounours)return say('solene',"Je ne vais quand même pas repartir sans rien.");
  if(S.f.joute)return;
  S.f.joute=1;
  await say('vigile',"Halte.");
  // Joute verbale : les 7 répliques sont proposées à chaque fois, dans un ordre différent ; erreur = il répète
  for(const[phrase,bonne]of JOUTE){
    for(;;){
      await say('vigile',phrase);
      let c;if(TEST&&!TEST.choix.length)c=bonne;else c=await choose(melange(JOUTE.map(x=>x[1])).map(t=>[t,t]));
      await say('solene',c);
      if(c===bonne)break;
    }
  }
  anim('vigile').tremble=true;await pause(900);anim('vigile').tremble=false;
  await say('solene',"…Bon, bon. Je fouille mon sac.");
  sfx('papier');await pause(500);retirer('nounours');S.choco=1;
  await dire([['solene',"Tenez… je pensais que c'était un nounours."],['solene',"…C'est un singe. En chocolat. Avec des cymbales. J'aurais juré que c'était un nounours."]]);
  sfx('magie');S.papierBrille=1;await pause(1100);sfx('eblouit');S.flash=1;await pause(300);S.flash=1;S.choco=0;S.papierBrille=0;
  await go('vetements',{solene:150});
}
SCENES.bonbons.particules=(f=>function(){f();if(S.papierBrille&&S.scene==='bonbons')emettre(60,()=>({k:'choco',scene:'bonbons',x:(S.pos.solene??200)+(Math.random()-.5)*60,y:110+(Math.random()-.5)*50,vx:(Math.random()-.5),vy:-.3-Math.random(),vie:40+Math.random()*30,t:1,c:'#fff3b0',glow:1}))})(SCENES.bonbons.particules);

// ----- Le magasin de vêtements (après le scintillement) -----
SCENES.vetements={nom:'Magasin de vêtements',
  dessin(){vgrad(0,SOL,'#e8e4dc','#cfc8bc');P(0,0,W,10,'#2a2a2a');P(20,16,80,14,'#c8242c');g.fillStyle='#fff';g.font="bold 9px Georgia";g.fillText('SOLDES -50 %',27,26);
    [[40,'#3a6ab0'],[110,'#c8a030'],[220,'#7a2a5a']].forEach(([x,c])=>{P(x,52,60,2,'#888');for(let i=0;i<8;i++){P(x+2+i*7,54,1,4,'#888');P(x+i*7,58,6,30,shade(c,.8+(i%3)*.15))}P(x+2,54,2,106,'#888');P(x+56,54,2,106,'#888')});
    [[180,'#f2f2f2'],[290,'#1a1a1a']].forEach(([x,c])=>{P(x-6,70,12,12,'#d8c8b0');P(x-8,82,16,30,c);P(x-1,112,2,36,'#888');P(x-8,148,16,3,'#888')});
    P(140,60,26,80,'#9ab0b8');P(142,62,22,76,'#c8d8e0');vgrad(SOL,H,'#b8b0a8','#988f88')},
  objets:[],
  ambiance:{nuit:.1,voile:'#000',teinte:'rgba(255,255,240,.1)'},
  lumieres:()=>[{x:160,y:20,r:160},...persoLumiere(30)],
  dessinAvant:()=>vignette(),
  async entree(){
    await dire([['solene',"…Hein ?"],['solene',"Un magasin de vêtements ? Où sont passés les bonbons… et le vigile ?"],['solene',"J'ai rêvé ou quoi ?"]]);
    await retrouvailles();
  },
};

// ----- Les retrouvailles dans la rue, puis le studio -----
async function arriverGauche(n,x){S.pos[n]=-20;const a=anim(n);if(TEST||S.passe){S.pos[n]=x;return}
  while(S.pos[n]<x){a.marche=true;a.dir='d';a.pas++;if(a.pas%14===0)sfx('pas');S.pos[n]+=1.5;await pause(16)}a.marche=false;a.dir='face'}
async function arriverBas(n,x){S.pos[n]=x;const a=anim(n);if(TEST||S.passe){delete S.posY[n];return}
  a.dir='face';let y=H+50;while(y>SOL){a.marche=true;y-=1.1;S.posY[n]=y;a.pas++;if(a.pas%14===0)sfx('pas');await pause(16)}a.marche=false;delete S.posY[n]}
async function retrouvailles(){
  await noir(true);
  S.verrou=null;S.f.vu_londres=1;S.f.retrouves=1;
  await go('londres',{yvan:150,rod:null,solene:null});anim('yvan').dir='face';
  await noir(false);
  await arriverGauche('rod',110);
  await arriverBas('solene',192);
  await say('tous',"Vous n'allez pas me croire !");
  await noir(true);
  sfx('bip');await say('narr',"Le contrôleur scanne les trois billets. Bip, bip, bip.");
  S.f.vu_quai=1;await go('quai',{yvan:80,rod:120,solene:160});
  await noir(false);
  await SCENES.quai.entree();
  await carton("À suivre…");
}
MUSIQUE_SCENE.bonbons='bonbons';MUSIQUE_SCENE.vetements='magie';
