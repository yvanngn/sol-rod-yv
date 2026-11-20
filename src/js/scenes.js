// ===== Objets =====
Object.assign(OBJETS,{
  telephone:{nom:'Téléphone',desc:"Mon téléphone. 12 % de batterie, 4 000 photos de bouffe.",icone:c=>{R(3,1,6,10,'#222',c);R(4,2,4,7,'#6ad',c)}},
  billets:{nom:'Billets',desc:"Trois billets pour la visite du studio. Créneau de 14 h.",icone:c=>{R(1,3,10,6,'#e8c35a',c);R(3,5,6,1,'#7a5',c)}},
  echarpe:{nom:'Écharpe de foot',desc:"Mon écharpe porte-bonheur. Elle a vu plus de défaites que de victoires.",icone:c=>{for(let i=0;i<5;i++)R(1+i*2,2+i,2,3,i%2?'#fff':'#c22',c)}},
});

// ===== Scène 1 : une rue de Londres =====
SCENES.londres={nom:'Londres',
  dessin(g){
    R(0,0,W,90,'#8a9bb0');R(0,40,W,50,'#9aa8ba');
    [[0,30,60,'#6b5a52'],[60,45,50,'#7c6a5e'],[110,25,70,'#5e5050'],[180,40,60,'#706260']].forEach(([x,y,w,c])=>{
      R(x,y,w,SOL-y,c);for(let i=x+6;i<x+w-6;i+=12)for(let j=y+8;j<SOL-20;j+=16)R(i,j,6,9,'#cfd8e0')});
    // studio
    R(240,20,80,SOL-20,'#2b2140');R(244,26,72,12,'#e8c35a');g.fillStyle='#2b2140';g.font='7px monospace';texte('STUDIO TOUR',252,35);
    R(274,110,30,50,'#140e22');R(276,112,26,46,'#3a2d5c');
    R(0,SOL,W,20,'#4b4b55');R(0,SOL,W,2,'#8b8b95');
    // cabine
    R(30,104,18,56,'#c3202b');R(32,110,14,32,'#f7e7a0');R(30,100,18,5,'#a51a24');
    // bus
    R(120,96,96,58,'#c8242c');R(124,102,88,14,'#ffe9b8');R(124,124,88,14,'#ffe9b8');R(128,150,12,10,'#111');R(196,150,12,10,'#111');
  },
  objets:[
    {id:'cabine',nom:'cabine téléphonique',x:30,y:100,w:18,h:60,
      regarder:"Une cabine rouge. Plus personne ne s'en sert, sauf pour les selfies.",
      utiliser:async()=>dire([['moi',"Je décroche… tonalité. Personne au bout."],['rod',"Appelle le club, dis-leur qu'on achète un vrai numéro 9."]])},
    {id:'bus',nom:'bus rouge',x:120,y:96,w:96,h:64,regarder:"Un bus à impériale. Rod a voulu monter devant en haut \"pour la vue\". On a vu la pluie."},
    {id:'porte',nom:'entrée du studio',x:274,y:110,w:30,h:50,
      regarder:"L'entrée du studio des films de sorciers. File d'attente modérée, excitation maximale.",
      utiliser:async()=>{
        if(!aObjet('billets'))return say('moi',S.perso==='solene'?"Les billets sont dans mon sac, il faut que je les présente.":"Sans billets, on ne passe pas. C'est Solène qui les a.");
        sfx('bip');await say('narr',"Le contrôleur scanne les trois billets. Bip, bip, bip.");
        await go('quai',{yvan:80,rod:120,solene:160});
      }},
  ],
  heros:{
    solene:{parler:async()=>{
      await say('moi',"Solène ?");
      const c=await choose([["Tu as les billets ?",'b'],["Rien.",'x']]);
      if(c==='b')await dire([['solene',"Dans mon sac. Si quelqu'un veut les tenir, qu'il me les demande gentiment."]]);
    }},
    rod:{parler:async()=>{
      const c=await choose([["Prêt pour le studio ?",'s'],["Le match de ce soir ?",'m']]);
      if(c==='s')await dire([['rod',"Grave. Mais je te préviens : si y a pas de section sur l'écologie des créatures magiques, je fais une réclamation."]]);
      if(c==='m')await dire([['rod',"On va perdre. Mais on va perdre avec panache."]]);
    },with:{billets:async()=>{retirer('billets');ajouter('billets','rod');await say('rod',"Ok, je les garde. Comme je gardais la setlist du groupe. Enfin… presque.")}}},
    yvan:{with:{billets:async()=>{retirer('billets');ajouter('billets','yvan');await say('yvan',"Merci ! Je fonce.")}}},
  },
  async entree(){
    await noir(false);
    await say('narr',"Et nous voici à Londres.");
    await titreJeu();
    await tuto();
    await dire([['rod',"Bon, le studio c'est juste là. Après, pub. Après, re-pub."],
      ['solene',"Après, on joue. C'est moi qui masterise, je vous rappelle."]])}
};

// ===== Scène 2 : le quai du studio =====
SCENES.quai={nom:'Studio',
  dessin(g){
    R(0,0,W,SOL,'#3a2a2a');
    for(let y=0;y<SOL;y+=8)for(let x=(y/8%2)*8;x<W;x+=16)R(x,y,15,7,'#7a3b2e');
    R(0,0,W,22,'#1b1424');g.fillStyle='#e8c35a';g.font='7px monospace';texte('— PHOTO SOUVENIR : TRAVERSEZ LE MUR —',58,14);
    R(150,40,60,18,'#1b1424');g.fillStyle='#fff';texte('QUAI  ?',163,52);
    R(0,SOL,W,20,'#5a5560');R(0,SOL,W,2,'#9a95a0');
    R(20,60,40,70,'#22202a');R(24,64,32,40,'#5e7');g.fillStyle='#123';texte('Boutique',25,118);
  },
  objets:[
    {id:'chariot',nom:'chariot à bagages',x:212,y:116,w:40,h:44,cache:()=>S.f.traverse,
      dessin(g){R(232,116,20,44,'#7a3b2e');R(212,128,28,4,'#999');R(214,132,20,20,'#5a3a20');R(216,134,16,6,'#c8a060');R(214,152,24,3,'#999');R(216,155,4,5,'#222');R(230,155,4,5,'#222');R(210,118,2,12,'#999')},
      regarder:"Un chariot à moitié encastré dans le mur. Tout le monde fait la même photo. On va faire la même photo.",
      prendre:"Il est vissé au sol. Logique, sinon les gens partiraient avec.",
      utiliser:"Il faut quelqu'un qui pose et quelqu'un qui prend la photo.",
      with:{telephone:()=>photo()}},
    {id:'boutique',nom:'boutique',x:20,y:60,w:40,h:70,regarder:"Des écharpes à 40 £. Rod a déjà la sienne, de foot.",utiliser:"Plus tard. Solène a confisqué ma carte bleue."},
  ],
  heros:{
    rod:{parler:async()=>{
      if(S.f.pose)return say('rod',"Je bouge pas, je tiens la pose. Prends la photo !");
      const c=await choose([["Pose avec le chariot, Rod !",'p'],["Rien.",'x']]);
      if(c==='p'){await dire([['rod',"Attends, je fais la pose du rappeur qui part en tournée."]]);
        await marcher('rod',226);S.f.pose=1;await say('rod',"Vas-y, shoote !")}
    },useOK:true,with:{telephone:()=>photo()}},
    solene:{parler:async()=>dire([['solene',"On dirait que ce mur a été pensé pour qu'on ait envie de le traverser."],['solene',"Note pour plus tard : demander aux concepteurs ce que ça dit d'eux."]])},
  },
  async entree(){await dire([['narr',"Dans le studio, un décor de gare. Un chariot sort à moitié d'un mur de briques."],['rod',"Ah, LA photo. Allez, on la fait."]])}
};
async function photo(){
  if(S.perso!=='yvan'&&!aObjet('telephone'))return say('moi',"C'est Yvan qui a le téléphone.");
  if(!S.f.pose)return say('moi',"Personne ne pose. Faut que Rod se mette au chariot.");
  if(S.perso==='rod')return say('rod',"Je peux pas me prendre en photo en poussant. Je suis pas une pieuvre.");
  sfx('photo');S.flash=1;await pause(400);
  await dire([['moi',"Clic ! Attends… Rod, pousse un peu, pour faire genre."],['rod',"Comme ça ?"]]);
  anim('rod').dir='d';anim('rod').marche=true;for(let i=0;i<20;i++){S.pos.rod+=1;anim('rod').pas++;await pause(40)}anim('rod').marche=false;
  await dire([['rod',"Euh. Les gars. Le mur. Il est… mou."],['solene',"Rod ? ROD !"]]);
  sfx('whoosh');S.pos.rod=null;S.f.traverse=1;await pause(500);
  await dire([['solene',"Il a disparu. Dans le mur. Ok. Respire, Solène."],['moi',"On le suit ?"],['solene',"Évidemment qu'on le suit."]]);
  await marcher('solene',232);S.pos.solene=null;await marcher('yvan',232);S.pos.yvan=null;
  sfx('whoosh');S.flash=1;await pause(800);
  await go('autre',{yvan:120,rod:160,solene:200});
}

// ===== Scène 3 : de l'autre côté =====
SCENES.autre={nom:'Quai des Brumes',
  dessin(g){
    R(0,0,W,SOL,'#231a3d');for(let i=0;i<40;i++)R((i*53)%W,(i*29)%80,1,1,'#fff');
    for(let i=0;i<6;i++){const y=30+Math.sin(Date.now()/600+i)*4;R(20+i*50,y,6,8,'#ffcf6a');R(22+i*50,y+8,2,3,'#a86')}
    R(0,92,W,46,'#1e6b4f');for(let x=8;x<W;x+=36)R(x,98,22,14,'#ffe9a8');R(0,136,W,4,'#111');
    for(let x=10;x<W;x+=40){R(x,138,14,8,'#222')}
    R(0,SOL-14,W,14,'#3a3448');R(0,SOL,W,20,'#2a2436');
    g.fillStyle='#e8c35a';g.font='7px monospace';texte('QUAI DES BRUMES — départ pour l\'Académie d\'Hiverlune',20,84);
  },
  objets:[
    {id:'train',nom:'train vert',x:0,y:92,w:W,h:48,loin:1,regarder:"Un train à vapeur vert émeraude. Il fume des volutes qui ont la forme de petits oiseaux."},
    {id:'lanternes',nom:'lanternes flottantes',x:10,y:20,w:300,h:30,loin:1,regarder:"Des lanternes qui flottent. Sans fil. J'ai vérifié."},
  ],
  heros:{
    solene:{parler:async()=>{await dire([['solene',"Bon. Petit souci de cadre : d'habitude, c'est moi qui masterise la partie."],['solene',"Là, j'ai l'impression que quelqu'un d'autre tient l'écran du MJ."]]);fin()}},
    rod:{parler:async()=>{await dire([['rod',"Je retire ce que j'ai dit. C'était pas un décor."]]);fin()}},
  },
  async entree(){await dire([['narr',"De l'autre côté du mur, pas de boutique. Une gare plongée dans une nuit violette."],['rod',"…On est où, là ?"]])}
};
async function fin(){if(S.f.fin)return;S.f.fin=1;sfx('sifflet');await say('narr',"Un sifflet retentit. Le train ouvre ses portes, rien que pour eux.");await say('narr',"FIN DE L'INTRODUCTION — à suivre…")}
