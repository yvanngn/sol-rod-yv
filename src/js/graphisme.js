// ===== Graphisme : personnages animés et outils de dessin =====
function shade(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,v=(n>>8)&255,b=n&255;
  r=Math.min(255,Math.round(r*f));v=Math.min(255,Math.round(v*f));b=Math.min(255,Math.round(b*f));
  return'#'+((1<<24)|(r<<16)|(v<<8)|b).toString(16).slice(1)}
const P=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
function vgrad(y0,y1,c1,c2,x0=0,w=W){const d=g.createLinearGradient(0,y0,0,y1);d.addColorStop(0,c1);d.addColorStop(1,c2);g.fillStyle=d;g.fillRect(x0,y0,w,y1-y0)}
function halo(x,y,r,c,a=.5){const d=g.createRadialGradient(x,y,0,x,y,r);d.addColorStop(0,c.replace(')',`,${a})`).replace('rgb','rgba'));d.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=d;g.fillRect(x-r,y-r,r*2,r*2)}
function vignette(){const d=g.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H);d.addColorStop(0,'rgba(0,0,0,0)');d.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=d;g.fillRect(0,0,W,H)}

// Apparence d'après les photos
const SPEC={
  yvan:{skin:'#d9a77c',hair:'#141414',coiffure:'court',top:'#3b2442',veste:'#1c1a1f',pants:'#2b2b33',shoes:'#111',lunettes:1,moust:'#2a2018',sac:1,capuche:1},
  rod:{skin:'#e8b896',hair:'#6b4528',coiffure:'boucle',top:'#c8242c',pants:'#24262e',shoes:'#e8e8e8',barbe:'#6e4a2c',capuche:1,blason:1},
  solene:{skin:'#f0c7a6',hair:'#4a2a1c',coiffure:'long',top:'#9a3328',pants:'#2a2a38',shoes:'#3a2a20',boucles:1,maille:1}};
S.anim={};
const anim=n=>S.anim[n]||(S.anim[n]={dir:'face',pas:0,marche:false});

function drawPerso(n,x,y=SOL){
  const s=SPEC[n],a=anim(n);x=Math.round(x);
  if(!S.reflet){g.fillStyle='rgba(0,0,0,.32)';g.beginPath();g.ellipse(x,y,9,2.5,0,0,7);g.fill()}
  const f=a.marche?Math.floor(a.pas/5)%4:0,bob=f%2?-1:0;
  g.save();g.translate(x,y);if(a.dir==='g')g.scale(-1,1);
  if(a.dir==='g'||a.dir==='d')profil(s,f,bob);else face(s,f,bob,a.dir==='dos');
  g.restore();
  if(n===S.perso&&!TEST&&!S.reflet){const t=Date.now()/300;P(x-1,y-48+Math.round(Math.sin(t)),3,2,'#f0c766');P(x,y-46+Math.round(Math.sin(t)),1,1,'#f0c766')}
}
function cligne(){return(Date.now()/120|0)%35===0}
function face(s,f,bob,dos){
  const L=13,lg=f===1?2:0,ld=f===3?2:0,T=-L-15+bob,H0=T-11,ey=H0+5,arm=s.veste||shade(s.top,.85),sw=f===1?1:f===3?-1:0;
  // jambes
  P(-5,-L,4,L-2-lg,s.pants);P(1,-L,4,L-2-ld,s.pants);P(-2,-L,1,L-4,shade(s.pants,.75));P(4,-L,1,L-3,shade(s.pants,.8));
  P(-6,-2-lg,5,2,s.shoes);P(1,-2-ld,5,2,s.shoes);P(-6,-1-lg,5,1,shade(s.shoes,.7));P(1,-1-ld,5,1,shade(s.shoes,.7));
  if(s.coiffure==='long')P(-7,H0+2,14,16,shade(s.hair,.8));
  // bras
  P(-9,T+1+sw,2,11,arm);P(-9,T+12+sw,2,2,s.skin);P(7,T+1-sw,2,11,shade(arm,.85));P(7,T+12-sw,2,2,shade(s.skin,.9));
  // torse
  P(-7,T,14,15,s.top);P(-7,T,1,15,shade(s.top,1.2));P(6,T,1,15,shade(s.top,.8));P(-7,T+13,14,2,shade(s.top,.78));
  if(s.maille)for(let i=T+2;i<T+13;i+=3)for(let j=-6;j<6;j+=3)P(j,i,1,1,shade(s.top,.85));
  if(s.capuche){P(-5,T-1,10,2,shade(s.top,.8));P(0,T+1,1,12,shade(s.top,.65));if(!dos){P(-2,T+1,1,5,shade(s.top,1.35));P(2,T+1,1,5,shade(s.top,1.35))}
    P(-5,T+8,10,4,shade(s.top,.9))}
  if(s.veste){P(-7,T,4,15,s.veste);P(3,T,4,15,s.veste);P(-4,T,1,15,'#2e2b33');P(-6,T+3,1,1,'#888')}
  if(s.blason&&!dos){P(2,T+4,4,4,'#f2f2f2');P(3,T+5,2,1,s.top)}
  if(s.sac&&!dos){P(-6,T,2,9,'#d8473c');P(-6,T+2,2,1,'#f5d33b');P(-6,T+5,2,1,'#3b8ad8')}
  if(s.sac&&dos){P(-5,T+2,10,10,'#2d3e78');P(-5,T+2,10,1,'#4b62b0');P(-3,T+5,6,4,'#d8473c')}
  // tête
  P(-1,T-1,2,1,shade(s.skin,.85));P(-5,H0,10,10,s.skin);P(4,H0+1,1,9,shade(s.skin,.88));P(-5,H0+9,10,1,shade(s.skin,.9));
  P(-6,H0+4,1,2,s.skin);P(5,H0+4,1,2,shade(s.skin,.9));
  const h=s.hair,hi=shade(h,1.6);
  if(dos){P(-5,H0-2,10,s.coiffure==='court'?9:11,h);if(s.coiffure==='long')P(-6,H0,12,17,h);if(s.coiffure==='boucle'){P(-6,H0-3,12,9,h);P(-3,H0-1,1,1,hi);P(2,H0+2,1,1,hi)}return}
  if(s.coiffure==='court'){P(-5,H0-2,10,3,h);P(-5,H0,1,3,h);P(4,H0,1,2,h);P(-3,H0-3,6,1,h);P(-2,H0+1,4,1,h);P(-2,H0-2,2,1,hi)}
  else if(s.coiffure==='boucle'){P(-6,H0-3,12,4,h);P(-7,H0-1,2,5,h);P(5,H0-1,2,5,h);[[-5,-4],[-1,-5],[3,-4],[-4,1],[2,1]].forEach(([i,j])=>P(i,H0+j,2,1,h));[[-4,-3],[1,-4],[4,-2]].forEach(([i,j])=>P(i,H0+j,1,1,hi))}
  else{P(-5,H0-2,10,3,h);P(0,H0-2,1,2,shade(h,.6));P(-6,H0,2,15,h);P(4,H0,2,15,h);P(-6,H0+14,2,3,shade(h,.85));P(4,H0+14,2,3,shade(h,.85));P(-4,H0-1,2,1,hi);P(-5,H0+3,1,6,hi)}
  // visage
  const bc=shade(h,.8),oe='#1a1210';
  P(-3,ey-2,2,1,bc);P(1,ey-2,2,1,bc);
  if(cligne()){P(-3,ey,2,1,oe);P(1,ey,2,1,oe)}else{P(-3,ey,2,1,'#f4efe8');P(1,ey,2,1,'#f4efe8');P(-2,ey,1,1,oe);P(1,ey,1,1,oe)}
  if(s.lunettes){const k='#0c0c0c';P(-4,ey-1,3,1,k);P(1,ey-1,3,1,k);P(-4,ey+1,3,1,k);P(1,ey+1,3,1,k);P(-4,ey,1,1,k);P(3,ey,1,1,k);P(-1,ey,2,1,k)}
  P(0,ey+2,1,1,shade(s.skin,.78));
  if(s.barbe){const b=s.barbe;P(-5,ey+1,1,4,b);P(4,ey+1,1,4,b);P(-5,ey+3,10,3,b);P(-4,ey+6,8,1,b);P(-3,ey+7,6,1,shade(b,.85));P(-2,ey+3,4,1,b);P(-1,ey+4,2,1,'#8a4038');P(-3,ey+5,1,1,shade(b,1.3));P(2,ey+6,1,1,shade(b,1.3))}
  else if(s.moust){P(-2,ey+3,4,1,s.moust);P(-1,ey+4,2,1,'#a65a50');P(-1,ey+5,2,2,s.moust)}
  else{P(-1,ey+4,2,1,'#b24a4a');P(-3,ey+2,1,1,shade(s.skin,.93));P(2,ey+2,1,1,shade(s.skin,.93))}
  if(s.boucles){P(-6,ey+2,1,2,'#e8c35a');P(5,ey+2,1,2,'#e8c35a')}
}
function profil(s,f,bob){ // regarde vers la droite
  const L=13,o=[0,2,0,-2][f],T=-L-15+bob,H0=T-11,ey=H0+5,arm=s.veste||shade(s.top,.85);
  P(-2-o,-L,4,L-2,shade(s.pants,.72));P(-2-o,-2,5,2,shade(s.shoes,.7));
  if(s.coiffure==='long')P(-7,H0+1,6,16,shade(s.hair,.85));
  P(-1-o,T+1,3,11,shade(arm,.7));P(-1-o,T+12,3,2,shade(s.skin,.85));
  P(-2+o,-L,4,L-2,s.pants);P(-2+o,-L,1,L-3,shade(s.pants,1.15));P(-2+o,-2,6,2,s.shoes);P(-2+o,-1,6,1,shade(s.shoes,.7));
  if(s.sac){P(-8,T+2,4,10,'#2d3e78');P(-8,T+2,1,10,'#4b62b0');P(-7,T+5,2,3,'#d8473c')}
  P(-4,T,9,15,s.veste||s.top);P(4,T,1,15,shade(s.veste||s.top,1.2));P(-4,T+13,9,2,shade(s.veste||s.top,.8));
  if(s.veste)P(3,T+1,2,13,s.top);
  if(s.maille)for(let i=T+2;i<T+13;i+=3)for(let j=-3;j<4;j+=3)P(j,i,1,1,shade(s.top,.85));
  if(s.capuche)P(-5,T-1,4,4,shade(s.top,.8));
  P(0,T-1,2,1,shade(s.skin,.85));P(-4,H0,9,10,s.skin);P(5,H0+4,1,2,s.skin);P(-4,H0+9,9,1,shade(s.skin,.9));P(-1,H0+4,2,2,shade(s.skin,.82));
  const h=s.hair,hi=shade(h,1.6);
  if(s.coiffure==='court'){P(-5,H0-2,10,3,h);P(-5,H0,4,5,h);P(-2,H0-3,6,1,h);P(2,H0+1,3,1,h);P(0,H0-2,2,1,hi)}
  else if(s.coiffure==='boucle'){P(-6,H0-3,11,4,h);P(-6,H0,4,6,h);P(-7,H0+1,1,3,h);[[3,1],[4,-1],[-5,6]].forEach(([i,j])=>P(i,H0+j,2,1,h));P(-3,H0-3,1,1,hi);P(1,H0-4,1,1,hi)}
  else{P(-5,H0-2,10,3,h);P(-6,H0,5,8,h);P(2,H0,1,2,h);P(-3,H0-1,2,1,hi)}
  if(cligne())P(2,ey,2,1,'#1a1210');else{P(2,ey,2,1,'#f4efe8');P(3,ey,1,1,'#1a1210')}
  P(2,ey-2,3,1,shade(h,.8));
  if(s.lunettes){const k='#0c0c0c';P(1,ey-1,4,1,k);P(1,ey+1,4,1,k);P(4,ey,1,1,k);P(-1,ey,2,1,k)}
  if(s.barbe){const b=s.barbe;P(-1,ey+1,2,4,b);P(-1,ey+3,7,3,b);P(0,ey+6,5,1,b);P(1,ey+7,3,1,shade(b,.85));P(3,ey+3,3,1,b);P(5,ey+4,1,1,'#8a4038');P(1,ey+5,1,1,shade(b,1.3))}
  else if(s.moust){P(3,ey+3,3,1,s.moust);P(4,ey+4,1,1,'#a65a50');P(3,ey+5,2,2,s.moust)}
  else P(4,ey+4,1,1,'#b24a4a');
  if(s.boucles)P(-1,ey+2,1,2,'#e8c35a');
  P(-1+o,T+1,3,11,arm);P(-1+o,T+1,1,11,shade(arm,1.2));P(-1+o,T+12,3,2,s.skin);
}
// marche animée (remplace celle du moteur)
marcher=function(n,x){x=Math.max(8,Math.min(W-8,x));const a=anim(n);
  if(TEST){S.pos[n]=x;return Promise.resolve()}
  return new Promise(r=>{const pas=()=>{const d=x-S.pos[n];
    if(Math.abs(d)<1.5){S.pos[n]=x;a.marche=false;a.dir='face';return r()}
    a.marche=true;a.dir=d>0?'d':'g';a.pas++;S.pos[n]+=Math.sign(d)*Math.min(1.5,Math.abs(d));setTimeout(pas,16)};pas()})};
