(()=>{'use strict';
const id=document.querySelector('[data-galaxy-visit]')?.dataset.galaxyVisit;
if(!id)return;
const key='mpc.galaxy.v02';
// Record only actual page arrivals. No click interception, no external requests.
function arrive(){try{let d=JSON.parse(localStorage.getItem(key)||'null');if(!d||d.version!==1||!d.visits||typeof d.visits!=='object'||Array.isArray(d.visits)||!Array.isArray(d.recent))d={version:1,visits:{},recent:[],motion:true};const now=new Date().toISOString();d.visits[id]={first:d.visits[id]?.first||now,last:now};d.recent=[id,...d.recent.filter(x=>x!==id)].slice(0,15);localStorage.setItem(key,JSON.stringify(d));}catch{}}
// Map controller records its own page before rendering; use this hook for all other routes.
if(!document.querySelector('[data-galaxy-v02]'))arrive();
window.addEventListener('pageshow',e=>{if(e.persisted){arrive();window.dispatchEvent(new Event('mpc:galaxy-arrival'));}});
})();