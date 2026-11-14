// ===== Son : musiques et bruitages synthétisés (Web Audio, aucun fichier) =====
const SON={ctx:null,mus:true,sfx:true,voulu:null,joue:null,voix:[],timer:null,amb:null};
try{SON.mus=localStorage.getItem('witchrok_mus')!=='0';SON.sfx=localStorage.getItem('witchrok_sfx')!=='0'}catch(e){}
const MIDI=m=>440*2**((m-69)/12);

function initSon(){
  if(TEST)return;if(SON.ctx){if(SON.ctx.state!=='running')SON.ctx.resume();return}
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  const c=SON.ctx=new AC();
  SON.master=c.createGain();SON.master.connect(c.destination);
  SON.musG=c.createGain();SON.musG.gain.value=SON.mus?.32:0;
  SON.sfxG=c.createGain();SON.sfxG.gain.value=SON.sfx?.7:0;
  // réverbération (impulsion générée)
  const n=c.sampleRate*2.2,ir=c.createBuffer(2,n,c.sampleRate);
  for(let k=0;k<2;k++){const d=ir.getChannelData(k);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n)**3}
  SON.rev=c.createConvolver();SON.rev.buffer=ir;const rg=c.createGain();rg.gain.value=.35;SON.rev.connect(rg);rg.connect(SON.master);
  SON.musG.connect(SON.master);SON.musG.connect(SON.rev);SON.sfxG.connect(SON.master);
  SON.bruit=c.createBuffer(1,c.sampleRate*2,c.sampleRate);const b=SON.bruit.getChannelData(0);for(let i=0;i<b.length;i++)b[i]=Math.random()*2-1;
  if(S.scene)sonScene(S.scene)
}
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,initSon));

// ----- instruments -----
function osc(type,f,t,d,vol,dest,att=.01,rel){const c=SON.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+att);
  if(rel){g.gain.setValueAtTime(vol,t+Math.max(att,d-rel));g.gain.linearRampToValueAtTime(.0001,t+d)}else g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(dest);o.start(t);o.stop(t+d+.05);return o}
function bruit(t,d,vol,type,f,dest,f2){const c=SON.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();s.buffer=SON.bruit;
  fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.05,d/3));g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.connect(fl);fl.connect(g);g.connect(dest);s.start(t,Math.random());s.stop(t+d+.05)}
const INST={
  boite:(f,t,d,o)=>{osc('sine',f,t,1.4,.16,o);osc('sine',f*2,t,.6,.05,o);osc('triangle',f*4,t,.15,.02,o)},
  celesta:(f,t,d,o)=>{osc('sine',f,t,1,.11,o);osc('sine',f*3,t,.35,.025,o)},
  flute:(f,t,d,o)=>{const x=osc('triangle',f,t,d,.09,o,.08,.15),l=SON.ctx.createOscillator(),lg=SON.ctx.createGain();l.frequency.value=5;lg.gain.value=f*.006;l.connect(lg);lg.connect(x.frequency);l.start(t);l.stop(t+d)},
  pad:(f,t,d,o)=>{[-6,6].forEach(dt=>{const x=osc('sawtooth',f,t,d,.018,o,Math.min(.8,d/2),Math.min(1,d/2));x.detune.value=dt})},
  basse:(f,t,d,o)=>osc('triangle',f,t,Math.min(d,1.2),.16,o,.01),
  pizz:(f,t,d,o)=>osc('triangle',f,t,.3,.13,o),
  epiano:(f,t,d,o)=>{osc('sine',f,t,1.8,.08,o);osc('sine',f*2,t,.5,.02,o)},
};

// ----- thèmes : chaque voix = [instrument, [[note(s) midi | null, temps], …]] -----
const ARP=acc=>acc.flatMap(ch=>[0,1,2,3,2,1,2,3].map(i=>[ch[i],.5]));
const THEMES={
  anniv:{bpm:112,voix:[
    ['boite',[[null,1],[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,3],[null,2]]],
    ['pizz',[[null,1],...[48,43,43,48,48,53,48,48].flatMap(r=>[[r,1],[r+19,1],[r+16,1]]),[48,3],[null,2]]]]},
  soir:{bpm:68,voix:[
    ['epiano',ARP([[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,65]])],
    ['basse',[[45,4],[41,4],[36,4],[43,4]]]]},
  magie:{bpm:96,voix:[
    ['celesta',ARP([[62,65,69,74],[58,62,65,70],[60,65,69,72],[60,64,67,72],[62,65,69,74],[58,62,65,70],[55,58,62,67],[57,61,64,69]])],
    ['flute',[[null,4],[77,2],[76,1],[74,1],[74,3],[72,1],[72,2],[74,1],[76,1],[79,4],[81,2],[79,1],[77,1],[74,3],[70,1],[67,2],[69,2],[73,4]]],
    ['pad',[[[50,57,62],4],[[46,53,58],4],[[53,57,60],4],[[48,55,60],4],[[50,57,62],4],[[46,53,58],4],[[43,50,55],4],[[45,52,57],4]]],
    ['basse',[[38,2],[38,2],[34,2],[34,2],[41,2],[41,2],[36,2],[36,2],[38,2],[38,2],[34,2],[34,2],[31,2],[31,2],[33,2],[33,2]]]]},
  brumes:{bpm:72,voix:[
    ['celesta',ARP([[64,67,71,76],[60,64,67,71],[57,60,64,69],[59,63,66,71]])],
    ['pad',[[[52,59,64],4],[[48,55,60],4],[[45,52,57],4],[[47,54,59],4]]],
    ['flute',[[null,8],[83,3],[81,1],[79,4],[null,4]]]]},
};
const MUSIQUE_SCENE={appart:'anniv',salon:'soir',londres:'magie',quai:'magie',autre:'brumes'};
const AMBIANCE_SCENE={londres:'pluie'};

function lancerTheme(nom){
  SON.joue=nom;clearInterval(SON.timer);
  const th=THEMES[nom],c=SON.ctx;if(!th||!c)return;
  const gen=SON.gen=(SON.gen||0)+1,bus=c.createGain();bus.gain.value=.0001;bus.connect(SON.musG);bus.gain.linearRampToValueAtTime(1,c.currentTime+1.5);
  if(SON.bus){const b=SON.bus;b.gain.cancelScheduledValues(c.currentTime);b.gain.setValueAtTime(b.gain.value,c.currentTime);b.gain.linearRampToValueAtTime(.0001,c.currentTime+1.2);setTimeout(()=>b.disconnect(),1500)}
  SON.bus=bus;const sb=60/th.bpm,t0=c.currentTime+.1;
  const vx=th.voix.map(([inst,notes])=>({inst,notes,i:0,t:t0}));
  SON.timer=setInterval(()=>{if(SON.gen!==gen)return;
    for(const v of vx)while(v.t<c.currentTime+.25){const[m,b]=v.notes[v.i],d=b*sb;
      if(m!=null)(Array.isArray(m)?m:[m]).forEach(n=>INST[v.inst](MIDI(n),v.t,d,bus));
      v.t+=d;v.i=(v.i+1)%v.notes.length}},40);
}
function sonScene(id){
  SON.voulu=MUSIQUE_SCENE[id]||SON.voulu;
  if(!SON.ctx)return;
  if(SON.voulu&&SON.voulu!==SON.joue)lancerTheme(SON.voulu);
  const a=AMBIANCE_SCENE[id]||null;if(a!==SON.ambNom)ambiance(a);
}
function ambiance(nom){const c=SON.ctx;SON.ambNom=nom;
  if(SON.amb){const g=SON.amb;g.gain.linearRampToValueAtTime(.0001,c.currentTime+1);setTimeout(()=>g.disconnect(),1200);SON.amb=null}
  if(nom!=='pluie')return;
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=SON.bruit;s.loop=true;f.type='bandpass';f.frequency.value=2500;f.Q.value=.4;
  g.gain.value=.0001;g.gain.linearRampToValueAtTime(.07,c.currentTime+1.5);s.connect(f);f.connect(g);g.connect(SON.sfxG);s.start();SON.amb=g}

// ----- bruitages -----
const VOIX={yvan:520,rod:360,solene:680,narr:300};
function sfx(nom,arg){
  if(!SON.ctx||!SON.sfx)return;const c=SON.ctx,t=c.currentTime,o=SON.sfxG;
  switch(nom){
    case 'clic':osc('square',900,t,.04,.03,o);break;
    case 'voix':{const f=VOIX[arg]||440;osc('sine',f,t,.07,.05,o);osc('sine',f*1.5,t+.06,.07,.035,o);break}
    case 'pas':bruit(t,.07,.08,'lowpass',380,o);break;
    case 'papier':for(let i=0;i<7;i++)bruit(t+i*.06+Math.random()*.03,.06,.18,'bandpass',2500+Math.random()*2500,o);break;
    case 'magie':[0,2,4,7,9,12,14,16,19,21].forEach((n,i)=>osc('sine',MIDI(84+n),t+i*.07,.8,.06,SON.rev));break;
    case 'rire':[0,1,2,3].forEach(i=>{osc('square',300-i*25,t+i*.16,.1,.025,o);osc('square',420-i*30,t+.08+i*.16,.08,.02,o)});break;
    case 'photo':bruit(t,.05,.3,'highpass',3000,o);bruit(t+.07,.08,.25,'bandpass',1800,o);osc('sine',2400,t,.15,.04,o);break;
    case 'whoosh':bruit(t,1.1,.35,'bandpass',200,o,3000);[0,4,7,11,14].forEach((n,i)=>osc('sine',MIDI(72+n),t+.4+i*.08,.9,.05,SON.rev));break;
    case 'gong':osc('sine',110,t,3,.2,SON.rev);osc('sine',220.5,t,2,.08,SON.rev);osc('sine',331,t,1.2,.04,SON.rev);break;
    case 'titre':for(let i=0;i<14;i++)osc('sine',MIDI(72+[0,2,4,7,9][i%5]+12*Math.floor(i/5)),t+i*.06,1.2,.05,SON.rev);break;
    case 'bip':[0,.25,.5].forEach(d=>osc('square',1800,t+d,.1,.04,o,.005,.02));break;
    case 'sifflet':[0,.05].forEach(d=>{const x=osc('sawtooth',880,t+d,1.6,.04,SON.rev,.1,.4);x.frequency.linearRampToValueAtTime(940,t+1.4)});bruit(t,1.8,.1,'highpass',4000,o);break;
  }
}
document.addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest('button'))sfx('clic')});

// ----- menu -----
function majMenu(){$('tMus').textContent=(SON.mus?'🎵 Musique : oui':'🎵 Musique : non');$('tSfx').textContent=(SON.sfx?'🔔 Bruitages : oui':'🔔 Bruitages : non');
  $('menuBtn').textContent=SON.mus||SON.sfx?'⚙':'🔇'}
function regler(type,val){SON[type]=val;try{localStorage.setItem('witchrok_'+type,val?'1':'0')}catch(e){}
  if(SON.ctx){const g=type==='mus'?SON.musG:SON.sfxG;g.gain.setTargetAtTime(val?(type==='mus'?.32:.7):0,SON.ctx.currentTime,.1)}majMenu()}
$('menuBtn').onclick=e=>{e.stopPropagation();initSon();$('menu').hidden=!$('menu').hidden};
$('tMus').onclick=e=>{e.stopPropagation();regler('mus',!SON.mus)};
$('tSfx').onclick=e=>{e.stopPropagation();regler('sfx',!SON.sfx)};
$('tTuto').onclick=e=>{e.stopPropagation();$('menu').hidden=true;tuto()};
document.addEventListener('pointerdown',e=>{if(!$('menu').hidden&&e.target.closest&&!e.target.closest('#menu,#menuBtn'))$('menu').hidden=true});
majMenu();
