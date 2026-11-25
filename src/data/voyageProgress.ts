export type Upgrade = 'shield'|'pulse'|'drive';
export type Progress = {credits:number;xp:number;runs:number;wins:number;best:number;maxWave:number;upgrades:Record<Upgrade,number>};
const KEY='pu.voyage.progress.v2';
const bounded=(n:unknown,max=100000000)=>typeof n==='number'&&Number.isFinite(n)?Math.min(max,Math.max(0,Math.floor(n))):0;
export function fresh():Progress{return {credits:0,xp:0,runs:0,wins:0,best:0,maxWave:0,upgrades:{shield:0,pulse:0,drive:0}};}
export function normalize(raw:unknown):Progress{if(!raw||typeof raw!=='object')return fresh();const p=raw as Partial<Progress>;return {credits:bounded(p.credits),xp:bounded(p.xp),runs:bounded(p.runs),wins:bounded(p.wins),best:bounded(p.best),maxWave:bounded(p.maxWave,6),upgrades:{shield:bounded(p.upgrades?.shield,3),pulse:bounded(p.upgrades?.pulse,3),drive:bounded(p.upgrades?.drive,3)}};}
export function loadProgress():Progress{try{const p=normalize(JSON.parse(localStorage.getItem(KEY)??'null'));const old=Number(localStorage.getItem('pu.voyage.guard.best.v1'));p.best=Math.max(p.best,bounded(old));return p;}catch{return fresh();}}
export function saveProgress(p:Progress){try{localStorage.setItem(KEY,JSON.stringify(p));return true;}catch{return false;}}
export function upgradeCost(level:number){return 30+level*25;}
export function purchase(p:Progress,key:Upgrade):boolean{const level=p.upgrades[key];if(level>=3||p.credits<upgradeCost(level))return false;p.credits-=upgradeCost(level);p.upgrades[key]++;return true;}
export function recordRun(p:Progress,score:number,wave:number,won:boolean){score=bounded(score,100000);wave=bounded(wave,6);const xp=score+wave*8+(won?40:0),credits=Math.floor(score/5)+wave*3+(won?20:0);p.xp=bounded(p.xp+xp);p.credits=bounded(p.credits+credits);p.runs=bounded(p.runs+1);p.wins=bounded(p.wins+Number(won));p.best=Math.max(p.best,score);p.maxWave=Math.max(p.maxWave,wave);return {xp,credits};}
export const levelOf=(p:Progress)=>1+Math.floor(p.xp/150);
export const achievements=(p:Progress)=>[{name:'初次启航',earned:p.runs>=1},{name:'星光守卫',earned:p.wins>=1},{name:'深入星域',earned:p.maxWave>=6},{name:'百星猎手',earned:p.best>=100},{name:'资深领航员',earned:levelOf(p)>=5},{name:'飞船工程师',earned:Object.values(p.upgrades).some(v=>v===3)}];
