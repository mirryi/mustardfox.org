const registry=[];let observerStarted=false;let nextSentinel=0;export function ready(fn){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn);}else{fn();}}
export function onMorph(fn){window.addEventListener('EMAHotReload',fn);}
export function onElement(selector,fn){const tag='emanoteWired_'+nextSentinel++;registry.push({selector,tag,fn});ready(()=>{scan(document,selector,tag,fn);if(!observerStarted)startObserver();});}
function scan(root,selector,tag,fn){if(root.nodeType===1&&root.matches?.(selector)){wire(root,tag,fn);}
root.querySelectorAll?.(selector).forEach((el)=>wire(el,tag,fn));}
function wire(el,tag,fn){if(el.dataset[tag])return;el.dataset[tag]='1';fn(el);}
function startObserver(){observerStarted=true;const mo=new MutationObserver((mutations)=>{for(const m of mutations){m.addedNodes.forEach((node)=>{if(node.nodeType!==1)return;for(const{selector,tag,fn}of registry){scan(node,selector,tag,fn);}});}});mo.observe(document.body,{childList:true,subtree:true});}