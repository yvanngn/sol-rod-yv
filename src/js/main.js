// ===== Mots de passe des scènes du chapitre 1 (0 = intro, 1 = Yvan, 2 = Rod, 3 = Solène) =====
const CHAPITRES={
  '0':{nom:"Intro",lancer:()=>go('appart')},
  '1':{nom:"Scène 1 — Yvan",lancer:()=>{S.tenue='';S.posY={};return go('londres',{yvan:70,rod:110,solene:150})}},
  '2':{nom:"Scène 2 — Rod",lancer:()=>{S.tenue='';S.posY={};
    Object.assign(S.f,{vu_londres:1,cabine:1,piece:1,hote:1,fente:1,singe:1,busNormal:1,manteau:1});MUSIQUE_SCENE.bus='magie';
    return debutRod()}},
  '3':{nom:"Scène 3 — Solène",lancer:()=>{S.tenue='';S.posY={};
    Object.assign(S.f,{vu_londres:1,cabine:1,piece:1,hote:1,fente:1,singe:1,busNormal:1,manteau:1,finYvan:1,flechette:1,paille:1,manteauWC:1,ballon:1,boulette:1,ballonParti:1,vraiNom:1});
    MUSIQUE_SCENE.bus='magie';S.persos.rod.inv=['echarpe','sarbacane'];return debutSolene()}},
};
function demarrer(code){const c=CHAPITRES[String(code).trim()];if(!c)return false;c.lancer();return true}
function motDePasse(code){code=String(code).trim();const c=CHAPITRES[code];
  if(!c){$('mdpMsg').textContent='Mot de passe inconnu';return false}
  if(TEST){demarrer(code);return true}
  $('mdpMsg').textContent=c.nom+'…';
  try{location.hash='ch'+code;location.reload()}catch(e){demarrer(code)}return true}
$('mdpOK').onclick=e=>{e.stopPropagation();motDePasse($('mdp').value)};
$('mdp').onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')motDePasse($('mdp').value)};
$('mdp').onclick=e=>e.stopPropagation();

// ===== Démarrage =====
if(!TEST){let d='0';const m=(location.hash||'').match(/^#ch(\d+)/);
  if(m&&CHAPITRES[m[1]]){d=m[1];try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}}
  demarrer(d);dessiner()}else{ui()}
