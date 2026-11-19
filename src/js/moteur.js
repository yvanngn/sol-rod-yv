// ===== Moteur point and click =====
const W=320,H=180,SOL=160;
const TEST=typeof window!=='undefined'&&window.TEST;
const cv=document.getElementById('cv'),g=cv.getContext('2d');
const $=id=>document.getElementById(id);
const S={posY:{},scene:null,perso:'yvan',f:{},verbe:'regarder',sel:null,busy:false,
  persos:{yvan:{inv:['telephone']},rod:{inv:['echarpe']},solene:{inv:['billets']}},
  pos:{yvan:70,rod:110,solene:150},cache:{}};
const NOMS={yvan:'Yvan',rod:'Rod',solene:'Solène'};
const COUL={yvan:'#9fd3ff',rod:'#ff8a7a',solene:'#ffd27a',narr:'#cfc6e6'};
const VERBES={regarder:'Regarder',prendre:'Prendre',utiliser:'Utiliser',parler:'Parler',donner:'Donner'};
const DEF={regarder:"Rien de spécial.",prendre:"Je ne peux pas prendre ça.",utiliser:"Ça ne donne rien.",
  parler:"Ça ne répond pas. Heureusement.",donnerSansObjet:"Donner quoi ? Choisis d'abord un objet.",
  donnerPasHumain:"On ne donne pas d'objets à ce qui n'est pas une personne.",donnerRefus:"Non merci, garde-le.",
  utiliserSurPersonne:"Pour une personne, essaie plutôt Donner."};
const OBJETS={}; // id -> {nom, icone(g)}
const SCENES={};
const R=(x,y,w,h,c,ctx=g)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)};

// ----- Dialogues -----
let clicSuivant=null;
function say(qui,txt){
  const q=qui==='moi'?S.perso:qui;
  const b=$('bulle');b.innerHTML=`<b style="color:${COUL[q]||COUL.narr}">${NOMS[q]||AUTRES[q]||''}</b>${txt}`;b.hidden=false;
  S.derniere=b.innerHTML;sfx('voix',q);
  if(TEST)TEST.log.push(q+': '+txt);
  if((TEST&&!TEST.lent)||S.passe){b.hidden=true;return Promise.resolve()}
  $('passer').hidden=false;
  return new Promise(r=>{clicSuivant=()=>{b.hidden=true;$('passer').hidden=true;clicSuivant=null;r()}});
}
async function dire(lignes){for(const[q,t]of lignes)await say(q,t)}
function choose(opts){ // opts: [[texte,valeur],...]
  S.passe=false;$('passer').hidden=true;
  if(TEST){const v=TEST.choix.shift();return Promise.resolve(v===undefined?opts[0][1]:v)}
  const c=$('choix');c.innerHTML=`<div class="tete">${S.derniere||''}</div>`;c.hidden=false;
  return new Promise(r=>opts.forEach(([t,v])=>{const b=document.createElement('button');b.textContent=t;
    b.onclick=e=>{e.stopPropagation();c.hidden=true;r(v)};c.appendChild(b)}));
}
// Passer : saute toute la séquence de dialogue en cours (s'arrête au prochain choix)
function passer(){if(!clicSuivant)return;S.passe=true;clicSuivant()}
$('passer').onclick=e=>{e.stopPropagation();passer()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')passer();else if((e.key===' '||e.key==='Enter')&&clicSuivant){e.preventDefault();clicSuivant()}});
$('bulle').onclick=e=>{e.stopPropagation();clicSuivant&&clicSuivant()};

// ----- Inventaire -----
const inv=()=>S.persos[S.perso].inv;
const aObjet=(o,p=S.perso)=>S.persos[p].inv.includes(o);
function ajouter(o,p=S.perso){if(!aObjet(o,p))S.persos[p].inv.push(o);ui()}
function retirer(o,p=S.perso){const i=S.persos[p].inv.indexOf(o);if(i>=0)S.persos[p].inv.splice(i,1);if(S.sel===o)S.sel=null;ui()}
function switchPerso(n){if(S.busy||(S.verrou&&n!==S.verrou))return;S.perso=n;S.sel=null;ui()}

// ----- Interface (sans barre de verbes) -----
const ICONES={regarder:'👁',prendre:'✋',utiliser:'⚙',parler:'💬'};
function ui(){
  $('inv').innerHTML='';for(const o of inv()){const b=document.createElement('button');b.className='slot'+(S.sel===o?' on':'');
    const c=document.createElement('canvas');c.width=12;c.height=12;OBJETS[o].icone(c.getContext('2d'));
    const l=document.createElement('span');l.textContent=OBJETS[o].nom;b.append(c,l);b.title=OBJETS[o].nom;
    b.onclick=()=>clicObjetInv(o);b.oncontextmenu=e=>{e.preventDefault();regarderInv(o)};$('inv').appendChild(b)}
  if(!inv().length)$('inv').innerHTML='<span class="vide">Inventaire vide</span>';
  $('heros').innerHTML='';for(const n in NOMS){const b=document.createElement('button');b.className='avatar'+(S.perso===n?' on':'')+(S.verrou&&n!==S.verrou?' verrou':'');
    b.style.setProperty('--c',COUL[n]);b.textContent=NOMS[n][0];b.title=NOMS[n];b.onclick=()=>switchPerso(n);$('heros').appendChild(b)}
  info();
}
function info(){$('info').textContent=S.sel?`${OBJETS[S.sel].nom} → sur quoi ?`:''}
async function regarderInv(o){if(S.busy)return;S.busy=true;await say('moi',OBJETS[o].desc||OBJETS[o].nom);S.busy=false}
const COMBOS={},cle=(a,b)=>[a,b].sort().join('+');
async function combiner(a,b){const f=COMBOS[cle(a,b)];S.sel=null;if(!f)return say('moi',"Ces deux-là ne vont pas ensemble.");await f();ui()}
function clicObjetInv(o){if(S.busy)return;
  if(S.sel&&S.sel!==o){const a=S.sel;S.busy=true;combiner(a,o).finally(()=>{S.busy=false;ui()});return}
  S.sel=S.sel===o?null:o;ui()}
function verbeParDefaut(o){if(S.sel)return o.humain?'donner':'utiliser';return o.defaut||(o.humain?'parler':o.utiliser||o.with?'utiliser':'regarder')}
// ----- Scène -----
function heroObjets(){
  const sc=SCENES[S.scene];return Object.keys(NOMS).filter(n=>n!==S.perso&&S.pos[n]!=null).map(n=>({
    id:n,nom:NOMS[n],humain:true,x:S.pos[n]-7,y:SOL-40,w:14,h:40,...(sc.heros?.[n]||{}),
    regarder:sc.heros?.[n]?.regarder||PORTRAITS[n]}));
}
const PORTRAITS={yvan:"Yvan. Lunettes, moustache, sac de parc d'attractions. Ex-guitariste du groupe.",
  rod:"Rod. Barbe, pull rouge, avis tranché sur le foot, le rap et la politique.",
  solene:"Solène. Psy, lectrice de BD compulsive, amie d'enfance des deux autres."};
function objetsCliquables(){const sc=SCENES[S.scene];return[...(sc.objets||[]).filter(o=>!o.cache||!o.cache()),...heroObjets()]}
function dessiner(){
  const sc=SCENES[S.scene];if(TEST)return;requestAnimationFrame(dessiner);if(!sc)return;g.clearRect(0,0,W,H);sc.dessin(g);
  (sc.objets||[]).forEach(o=>o.dessin&&(!o.cache||!o.cache())&&o.dessin(g));
  sc.reflet&&reflets();
  Object.keys(NOMS).filter(n=>S.pos[n]!=null).sort((a,b)=>S.pos[a]-S.pos[b]).forEach(n=>drawPerso(n,S.pos[n],S.posY[n]??SOL));
  sc.devant&&sc.devant();
  postEffets(sc);
  if(S.flash>0){g.fillStyle=`rgba(255,255,255,${S.flash})`;g.fillRect(0,0,W,H);S.flash-=.05}
}
function marcher(n,x){x=Math.max(8,Math.min(W-8,x));if(TEST){S.pos[n]=x;return Promise.resolve()}return new Promise(r=>{const pas=()=>{
  const d=x-S.pos[n];if(Math.abs(d)<2){S.pos[n]=x;return r()}S.pos[n]+=Math.sign(d)*2;setTimeout(pas,16)};pas()})}
const pause=ms=>TEST?Promise.resolve():new Promise(r=>setTimeout(r,ms));
async function go(id,positions){S.scene=id;if(!TEST&&$('bulleJ'))$('bulleJ').hidden=true;sonScene(id);S.passe=false;if(positions)Object.assign(S.pos,positions);S.sel=null;ui();
  const sc=SCENES[id];if(sc.entree&&!S.f['vu_'+id]){S.f['vu_'+id]=1;S.busy=true;await sc.entree();S.busy=false;S.passe=false}}

async function lancer(h){if(typeof h==='string')await say('moi',h);else await h()}
async function agir(o,v=verbeParDefaut(o)){
  if(!o.loin&&S.pos[S.perso]!=null&&!SCENES[S.scene].fixe){const cx=o.x+o.w/2;if(Math.abs(S.pos[S.perso]-cx)>20)await marcher(S.perso,cx+(S.pos[S.perso]<cx?-16:16))}
  if(v==='donner'){
    if(!S.sel)return say('moi',DEF.donnerSansObjet);
    if(!o.humain&&!o.giveOK)return say('moi',DEF.donnerPasHumain);
    return lancer(o.with?.[S.sel]||DEF.donnerRefus);
  }
  if(v==='utiliser'&&S.sel){
    if(o.humain&&!o.useOK)return say('moi',DEF.utiliserSurPersonne);
    return lancer(o.with?.[S.sel]||DEF.utiliser);
  }
  return lancer(o[v]||DEF[v]);
}
function cible(e){const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;
  return{x,y,o:objetsCliquables().reverse().find(o=>x>=o.x&&x<=o.x+o.w&&y>=o.y&&y<=o.y+o.h)}}
async function executer(o,v,x){S.busy=true;fermerRoue();$('etiquette').hidden=true;
  try{if(o)await agir(o,v);else{S.sel=null;if(S.pos[S.perso]!=null&&!SCENES[S.scene].fixe)await marcher(S.perso,x)}}finally{S.busy=false;S.passe=false;if(o&&S.sel&&v!=='regarder')S.sel=null;ui()}}
function fermerRoue(){$('roue').hidden=true}
function ouvrirRoue(e,o){const r=$('scene').getBoundingClientRect(),w=$('roue');w.innerHTML=`<div class="titre">${o.nom}</div>`;
  for(const v of['regarder','prendre','utiliser','parler']){const b=document.createElement('button');b.innerHTML=`<span>${ICONES[v]}</span>${v==='prendre'&&o.voler?'Voler':v[0].toUpperCase()+v.slice(1)}`;
    b.onclick=ev=>{ev.stopPropagation();const s0=S.sel;S.sel=null;executer(o,v)};w.appendChild(b)}
  w.style.left=Math.min(e.clientX-r.left,r.width-170)+'px';w.style.top=Math.max(0,e.clientY-r.top-60)+'px';w.hidden=false}
let appui=null,longOK=false;
cv.addEventListener('pointerdown',e=>{longOK=false;if(e.pointerType!=='mouse'){appui=setTimeout(()=>{const{o}=cible(e);if(o&&!S.busy&&!clicSuivant){longOK=true;ouvrirRoue(e,o)}},450)}});
cv.addEventListener('pointerup',()=>clearTimeout(appui));
cv.addEventListener('click',e=>{
  if(clicSuivant)return clicSuivant();
  if(longOK){longOK=false;return}
  if(!$('roue').hidden)return fermerRoue();
  if(S.busy||!$('choix').hidden)return;
  const{o,x}=cible(e);executer(o,undefined,x);
});
cv.addEventListener('contextmenu',e=>{e.preventDefault();if(S.busy||clicSuivant)return;const{o}=cible(e);if(o)ouvrirRoue(e,o);else fermerRoue()});
cv.addEventListener('mousemove',e=>{const t=$('etiquette');if(S.busy){t.hidden=true;return}const{o}=cible(e);
  if(!o){t.hidden=true;return}const r=$('scene').getBoundingClientRect(),v=verbeParDefaut(o);
  t.innerHTML=`<span>${ICONES[v==='donner'?'prendre':v]||''}</span> ${v==='prendre'&&o.voler&&!S.sel?'Voler ':''}${S.sel?OBJETS[S.sel].nom+' → ':''}${o.nom}`;
  t.style.left=(e.clientX-r.left+14)+'px';t.style.top=(e.clientY-r.top+10)+'px';t.hidden=false});
cv.addEventListener('mouseleave',()=>$('etiquette').hidden=true);
// Pour les tests : action(id, verbe?, objetSélectionné?)
async function action(id,v,sel){S.sel=sel||null;const o=objetsCliquables().find(o=>o.id===id);if(!o)throw new Error('introuvable: '+id+' dans '+S.scene);await agir(o,v);S.sel=null}

// ----- Mise en scène : fondus, cartons, titre, tutoriel -----
function attendreClic(el,ms){return new Promise(r=>{let fini=false;const f=()=>{if(fini)return;fini=true;clicSuivant=null;$('passer').hidden=true;r()};
  clicSuivant=f;$('passer').hidden=false;el.onclick=e=>{e.stopPropagation();f()};if(ms)setTimeout(f,ms)})}
async function noir(on){if(TEST)return;$('noir').classList.toggle('on',on);if(!S.passe)await pause(900)}
async function carton(txt,ms=2800){if(TEST){TEST.log.push('carton: '+txt);return}if(S.passe)return;
  sfx('gong');const c=$('carton');c.textContent=txt;c.style.animationDuration=ms+'ms';c.hidden=false;await attendreClic(c,ms);c.hidden=true}
async function titreJeu(){if(TEST){TEST.log.push('titre');return}sfx('titre');const t=$('titre');t.classList.remove('part');t.hidden=false;
  await attendreClic(t,7000);t.classList.add('part');await pause(600);t.hidden=true}
async function tuto(){if(TEST){TEST.log.push('tuto');return}const t=$('tuto');t.hidden=false;
  await new Promise(r=>$('tutoOK').onclick=e=>{e.stopPropagation();r()});t.hidden=true;S.passe=false}
