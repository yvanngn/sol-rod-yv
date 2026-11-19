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
  await go('bonbons',{solene:PORTE_B,yvan:null,rod:null});
}

// Magasin de bonbons : grande boutique (640 px de large, la caméra suit Solène) en profondeur
const LGB=640,PORTE_B=618;
const enfantX=i=>{const t=Date.now()/1000+i*2.7,c=(t%7)/7,u=c<.5?c*2:2-c*2;return 150+u*300};
const enfantDir=i=>{const t=Date.now()/1000+i*2.7,c=(t%7)/7;return c<.5?'d':'g'};
function bocal(x,y,c1,c2,k=1){const w=16*k,h=20*k;P(x,y,w,h,'rgba(220,240,255,.35)');P(x+1,y+6*k,w-2,h-7*k,c1);for(let i=0;i<10;i++)P(x+2+(i*5)%(w-4),y+7*k+(i*3)%(h-9*k),2,2,i%2?c2:'#fff');P(x-1,y-2,w+2,3,'#e84a8a');P(x+2,y,1,h-2,'rgba(255,255,255,.5)')}
function singeChoco(x,y){P(x-4,y-8,8,9,'#6a3a1a');P(x-5,y-6,2,3,'#6a3a1a');P(x+3,y-6,2,3,'#6a3a1a');P(x-3,y-6,6,5,'#9a6a3a');P(x-2,y-5,2,2,'#f0e8d8');P(x+1,y-5,2,2,'#f0e8d8');P(x-2,y-4,1,1,'#000');P(x+2,y-5,1,1,'#000');P(x-1,y-2,3,1,'#3a1a0a');
  P(x-4,y+1,8,9,'#7a4a24');P(x-3,y+2,6,3,'#c8242c');P(x-8,y+2,4,4,'#f0c766');P(x+4,y+2,4,4,'#f0c766');P(x-7,y+3,2,2,'#fff3b0');P(x+5,y+3,2,2,'#fff3b0');P(x-1,y-9,3,1,'#2a1408')}
const ell=(x,y,rx,ry,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()};
function grosNounours(x,y){ // nounours au chocolat façon guimauve enrobée, à hauteur de Solène
  const c='#5a2e14',cl='#7a4422',co='#3e1e0a';
  ell(x,y-2,15,3,'rgba(0,0,0,.3)');
  ell(x-7,y-4,6,4,co);ell(x+7,y-4,6,4,co);ell(x-7,y-5,4.5,3,cl);ell(x+7,y-5,4.5,3,cl);
  ell(x,y-15,13,13,c);ell(x-3,y-18,6,7,'rgba(255,255,255,.06)');
  ell(x-12,y-18,4,7,c);ell(x+12,y-18,4,7,c);
  ell(x-8,y-37,4.5,4.5,c);ell(x+8,y-37,4.5,4.5,c);ell(x-8,y-37,2.5,2.5,cl);ell(x+8,y-37,2.5,2.5,cl);
  ell(x,y-30,10,9,c);ell(x,y-27,5,3.5,cl);P(x-1,y-29,3,2,co);P(x-5,y-33,2,2,co);P(x+3,y-33,2,2,co);P(x-1,y-25,3,1,co);
  g.fillStyle='rgba(255,240,220,.5)';P(x-6,y-36,3,1,'rgba(255,240,220,.5)');P(x-9,y-22,2,4,'rgba(255,240,220,.3)');P(x+4,y-34,2,1,'rgba(255,240,220,.4)')}
const ETALS=[ // étals au premier plan : x, largeur, enseigne
  [40,74,'SUCETTES'],[134,74,'CHOCOLATS'],[228,74,'NOUNOURS'],[322,74,'BONBONS BLEUS'],[480,74,'CANNES & BERLINGOTS']];
SCENES.bonbons={nom:'Le magasin de bonbons',largeur:LGB,
  dessin(){const t=Date.now();
    // fond : mur du fond lointain, haut et petit (profondeur)
    vgrad(0,92,'#ffd6e8','#ffc2dc');for(let x=0;x<LGB;x+=16)P(x,0,8,92,'rgba(255,255,255,.22)');
    P(0,0,LGB,8,'#e84a8a');for(let x=0;x<LGB;x+=12){g.fillStyle=(x/12)%3?((x/12)%3===1?'#ffe080':'#7ad0ff'):'#ff9ad0';g.beginPath();g.moveTo(x,8);g.lineTo(x+12,8);g.lineTo(x+6,15);g.fill()}
    P(250,18,140,14,'#e84a8a');P(250,18,140,1,'#fff');g.fillStyle='#fff';g.font="bold 9px Georgia";g.textAlign='center';g.fillText('CONFISERIE',320,28);g.textAlign='left';
    for(let r=0;r<2;r++){P(10,52+r*20,LGB-20,2,'#c88a5a');for(let i=0;i<46;i++){const cc=[['#ff4a4a','#ffe040'],['#4ab0ff','#fff'],['#7ae07a','#ff7ab0'],['#ffa040','#7a4ab0'],['#c84aff','#ffe040']][(i+r)%5];bocal(14+i*13.5,38+r*20,cc[0],cc[1],.65)}}
    // sol en perspective : lignes qui fuient vers le fond
    vgrad(92,H,'#f6e6f2','#e0c4dc');for(let i=-12;i<=12;i++){g.strokeStyle='rgba(232,74,138,.12)';g.beginPath();g.moveTo(320+i*28,92);g.lineTo(320+i*60,H);g.stroke()}
    for(let k=1;k<6;k++){const y=92+(H-92)*(k/6)**1.5;P(0,y,LGB,1,'rgba(232,74,138,.12)')}
    // îlots du milieu (plus loin, plus petits)
    [[90,'#7ad0ff'],[250,'#ffe080'],[410,'#b8f08a']].forEach(([x,c])=>{P(x,96,90,18,'#d88aa8');P(x,96,90,2,'#f0b0c8');for(let i=0;i<9;i++){P(x+4+i*9.5,88,7,8,i%2?c:'#ff9ad0');P(x+5+i*9.5,86,5,2,'#fff')}});
    // étals du premier plan
    for(const[x,w,nom]of ETALS){P(x,118,w,24,'#c8783a');P(x,118,w,2,'#e8a060');P(x+4,124,w-8,16,'#a85a2a');P(x+2,142,4,18,'#8a4a20');P(x+w-6,142,4,18,'#8a4a20');
      P(x+6,127,w-12,10,'#fff3f8');P(x+6,127,w-12,1,'#e84a8a');g.fillStyle='#c8246a';g.font="bold 7px Georgia";g.textAlign='center';g.fillText(nom,x+w/2,135);g.textAlign='left'}
    // contenus
    [[48,'#ff4a8a'],[62,'#4ab0ff'],[76,'#7ae07a'],[90,'#ffa040'],[104,'#c84aff']].forEach(([x,c],i)=>{P(x,98-i%2*4,1,20,'#f2f2f2');for(let k=0;k<3;k++){g.strokeStyle=k%2?'#fff':c;g.lineWidth=2;g.beginPath();g.arc(x,94-i%2*4,6-k*2,0,7);g.stroke()}g.lineWidth=1});
    for(let i=0;i<10;i++){P(140+i*6,112-(i%3)*3,5,8,i%2?'#5a2a10':'#7a3a18');P(141+i*6,113-(i%3)*3,3,1,'#c99a3a')}
    for(let i=0;i<12;i++){const c=['#ff4a4a','#ffe040','#7ae07a','#ffa040','#ff7ab0','#fff'][i%6];P(234+i*5,112,4,5,c);P(235+i*5,110,2,2,c)}
    for(let i=0;i<14;i++)P(328+i*4.5,111+(i%2)*2,3,5,'#4ab0ff');
    [[486,0],[492,1],[498,0],[504,1]].forEach(([x,k])=>{P(x,94,2,24,'#fff');for(let y=96;y<118;y+=4)P(x,y,2,2,'#e82a2a');P(x-4+k,90,6,2,'#fff');P(x-5+k,90,2,6,'#fff')});
    for(let i=0;i<6;i++){g.fillStyle=['#ff4a4a','#ffe040','#7ae07a'][i%3];g.beginPath();g.moveTo(516+i*6,118);g.lineTo(519+i*6,112);g.lineTo(522+i*6,118);g.fill()}
    // barbe à papa
    P(566,112,24,48,'#e8e8f0');P(564,108,28,6,'#c0c0d0');for(let i=0;i<6;i++)ell(572+i*2+Math.sin(t/300+i),98-(i%3)*3,6,6,'#ffb0e0');P(577,96,2,14,'#f2f2f2');
    // porte d'entrée (à droite)
    P(604,56,36,104,'#7a3a5a');if(S.porteB){P(608,60,28,100,'#3a6a8a');vgrad(60,160,'rgba(255,255,255,.25)','rgba(0,0,0,0)',608,28)}else{P(608,60,28,46,'#cfe6ff');P(608,110,28,48,'#8a4a6a')}P(610,52,6,4,'#f0c766');
    // le singe en chocolat dans la main de Solène
    if(S.choco&&S.pos.solene!=null)singeChoco(S.pos.solene+12,SOL-26);
  },
  objets:[
    {id:'etageres',nom:'bocaux du fond',x:10,y:30,w:620,h:50,loin:1,regarder:"Des centaines de bocaux, jusqu'au fond du magasin. Réglisse, fraises, crocodiles… Mon dentiste va pleurer."},
    {id:'ilots',nom:'îlots de bonbons',x:90,y:84,w:410,h:30,loin:1,regarder:"Encore des îlots de bonbons, plus loin. Ce magasin n'a pas de fin."},
    {id:'sucettes',nom:'étal des sucettes',x:40,y:88,w:74,h:54,regarder:"Des sucettes en spirale de toutes les couleurs. N'importe quel enfant serait aux anges. Moi aussi, d'ailleurs."},
    {id:'chocolats',nom:'étal des chocolats',x:134,y:100,w:74,h:42,regarder:"Des tablettes de chocolat. Au lait, noir, aux noisettes. Mes trois amours."},
    {id:'nounours_etal',nom:'étal des nounours',x:228,y:100,w:74,h:42,regarder:"Des nounours en guimauve de toutes les couleurs. Ils me regardent avec leurs petits yeux tout mous."},
    {id:'bonbons_bleus',nom:'étal des schtroumpfs',x:322,y:100,w:74,h:42,regarder:"Des schtroumpfs en bonbon. Bleus, gélatineux, et d'un goût que personne n'a jamais su décrire."},
    {id:'cannes',nom:'étal des cannes et berlingots',x:480,y:88,w:74,h:54,regarder:"Des cannes en sucre rayées rouge et blanc, et des berlingots. Les bonbons de grand-mère, ceux qui collent aux dents pour toujours."},
    {id:'barbe',nom:'barbe à papa',x:562,y:88,w:30,h:72,regarder:"Une machine à barbe à papa. Un nuage rose qui tourne tout seul. Hypnotique."},
    {id:'gros_nounours',nom:'gros nounours en chocolat',x:416,y:116,w:30,h:44,defaut:'prendre',voler:1,cache:()=>S.f.nounours,dessin(){grosNounours(431,SOL)},
      regarder:"Un énorme nounours en chocolat, de ma taille. Comme les petits nounours à la guimauve, mais géant. Il me fait de l'œil. Enfin… il me semble.",
      prendre:async()=>{S.f.nounours=1;ajouter('nounours');sfx('papier');await dire([['solene',"Hop. Dans le sac à dos. Il rentre… de justesse."],['solene',"…J'ai fait ça, moi ? Une psy. Qui vole un nounours. Il faudra que j'en parle à quelqu'un."]])}},
    {id:'enfants',nom:'enfants',humain:true,get x(){return enfantX(0)-6},y:126,w:12,h:34,
      dessin(){[0,1].forEach(i=>{const n='enfant'+(i+1),a=anim(n);a.marche=true;a.dir=enfantDir(i);a.pas=Date.now()/40|0;g.save();g.translate(enfantX(i),SOL-4+i*3);g.scale(.7,.7);drawPerso(n,0,0);g.restore()})},
      regarder:"Deux enfants qui courent partout, du sucre plein les poches. Ils ne vont pas dormir avant jeudi.",
      parler:()=>dire([['enfant',"On a le droit à UN bonbon ! UN ! UN !"],['solene',"…Et vous en êtes à combien ?"],['enfant',"Quarante-deux !"]])},
    {id:'vigile',nom:'vigile',humain:true,x:576,y:104,w:24,h:56,
      dessin(){const a=anim('vigile');a.marche=false;a.dir='face';g.save();g.translate(588,SOL);g.scale(1.25,1.25);drawPerso('vigile',0,0);g.restore()},
      regarder:"Un vigile immense, près de l'entrée. Il n'a pas bougé d'un millimètre depuis que je suis entrée. Il cligne, au moins ?",
      parler:()=>dire([['solene',"Bonjour !"],['vigile',"…"],['solene',"Très bavard. J'adore."]])},
    {id:'porte_bonbons',nom:'sortie',x:604,y:56,w:36,h:104,defaut:'utiliser',regarder:"La porte du magasin, avec sa petite clochette.",utiliser:sortirBonbons},
  ],
  ambiance:{nuit:.12,voile:'#200010',teinte:'rgba(255,150,200,.2)'},
  lumieres:()=>[{x:160,y:20,r:150,c:'rgba(255,230,240,.22)'},{x:480,y:20,r:150,c:'rgba(255,230,240,.22)'},{x:431,y:130,r:30,c:'rgba(255,200,120,.3)'},...persoLumiere(30)],
  particules(){emettre(30,()=>({k:'sucre',scene:'bonbons',x:Math.random()*LGB,y:Math.random()*150,vx:(Math.random()-.5)*.1,vy:.05,vie:300,t:1,c:['#fff','#ffb0e0','#b0e0ff'][Math.random()*3|0],a:.6}));
    if(S.papierBrille)emettre(60,()=>({k:'choco',scene:'bonbons',x:(S.pos.solene??500)+(Math.random()-.5)*60,y:110+(Math.random()-.5)*50,vx:(Math.random()-.5),vy:-.3-Math.random(),vie:40+Math.random()*30,t:1,c:'#fff3b0',glow:1}))},
  dessinAvant:()=>vignette(),
  async entree(){
    await noir(false);
    S.porteB=1;sfx('clochette');await pause(400);
    await marcher('solene',548);S.porteB=0;anim('solene').dir='face';
    await pause(1400);
    await say('solene',"Ohlala, j'en aurai jamais, c'est sûr et certain !");
  },
};
async function sortirBonbons(){
  await marcher('solene',572);

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
