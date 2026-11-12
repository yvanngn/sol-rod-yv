// ===== Effets « pixel art moderne » : parallaxe, lumière, profondeur, particules, reflets =====
// Inspirations : Eastward / Sea of Stars (lumière dynamique), Owlboy (parallaxe),
// HD-2D façon Octopath (flou de profondeur), Dex (pluie et néons).
const cam=()=>((S.pos[S.perso]??160)-160)/160; // -1 … 1
function couche(f,fn){g.save();g.translate(Math.round(-cam()*f),0);fn();g.restore()}
const FLOU='filter' in g;
function flou(px,fn){g.save();if(FLOU&&!TEST)g.filter=`blur(${px}px)`;fn();g.restore()}

// --- lumière : voile sombre percé par les sources, puis halo additif (bloom) ---
const LC=document.createElement('canvas');LC.width=W;LC.height=H;const lg=LC.getContext('2d');
function eclairer(sc){
  const A=sc.ambiance;if(!A)return;const L=typeof sc.lumieres==='function'?sc.lumieres():(sc.lumieres||[]);
  lg.globalCompositeOperation='source-over';lg.clearRect(0,0,W,H);lg.fillStyle=A.voile;lg.globalAlpha=A.nuit;lg.fillRect(0,0,W,H);lg.globalAlpha=1;
  lg.globalCompositeOperation='destination-out';
  for(const l of L){const v=l.vacille?1+Math.sin(Date.now()/90+l.x)*.06:1,d=lg.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*v);
    d.addColorStop(0,'rgba(0,0,0,1)');d.addColorStop(1,'rgba(0,0,0,0)');lg.fillStyle=d;lg.fillRect(l.x-l.r*1.1,l.y-l.r*1.1,l.r*2.2,l.r*2.2)}
  g.drawImage(LC,0,0);
  g.save();g.globalCompositeOperation='lighter';
  for(const l of L)if(l.c){const d=g.createRadialGradient(l.x,l.y,0,l.x,l.y,l.r*.7);d.addColorStop(0,l.c);d.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=d;g.fillRect(l.x-l.r,l.y-l.r,l.r*2,l.r*2)}
  g.restore();
  if(A.teinte){g.save();g.globalCompositeOperation='soft-light';g.fillStyle=A.teinte;g.fillRect(0,0,W,H);g.restore()}
}
function faisceau(x1,w1,x2,w2,y1,y2,c){g.save();g.globalCompositeOperation='lighter';const d=g.createLinearGradient(0,y1,0,y2);d.addColorStop(0,c);d.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=d;g.beginPath();g.moveTo(x1,y1);g.lineTo(x1+w1,y1);g.lineTo(x2+w2,y2);g.lineTo(x2,y2);g.fill();g.restore()}

// --- particules ---
const PART=[];
function emettre(n,f){const k=f().k;let c=PART.filter(p=>p.k===k).length;while(c++<n)PART.push(f())}
function particules(sc){
  if(sc.particules)sc.particules();
  for(let i=PART.length-1;i>=0;i--){const p=PART[i];if(p.scene!==S.scene){PART.splice(i,1);continue}
    p.x+=p.vx;p.y+=p.vy;p.vie--;if(p.vie<=0||p.y>H||p.x<-5||p.x>W+5){PART.splice(i,1);continue}
    g.globalAlpha=Math.min(1,p.vie/30)*(p.a??1);g.fillStyle=p.c;g.fillRect(Math.round(p.x),Math.round(p.y),p.t,p.h??p.t);
    if(p.glow){g.globalAlpha*=.35;g.fillRect(Math.round(p.x)-1,Math.round(p.y)-1,p.t+2,p.t+2)}}
  g.globalAlpha=1;
}

// --- reflets des personnages sur sol mouillé ---
function reflets(){g.save();g.translate(0,1.55*SOL+1);g.scale(1,-.55);g.globalAlpha=.22;S.reflet=1;
  Object.keys(NOMS).filter(n=>S.pos[n]!=null).forEach(n=>drawPerso(n,S.pos[n]));S.reflet=0;g.restore()}

// --- grain de pellicule léger ---
const GR=document.createElement('canvas');GR.width=W;GR.height=H;
(()=>{const c=GR.getContext('2d');for(let i=0;i<2500;i++){c.fillStyle=Math.random()<.5?'#fff':'#000';c.fillRect(Math.random()*W|0,Math.random()*H|0,1,1)}})();
function grain(){g.globalAlpha=.035;g.drawImage(GR,(Math.random()*6|0)-3,(Math.random()*6|0)-3);g.globalAlpha=1}

// Chaîne de rendu appelée par dessiner()
function postEffets(sc){particules(sc);eclairer(sc);sc.premierPlan&&sc.premierPlan();sc.dessinAvant&&sc.dessinAvant(g);grain()}
