// 앱 껍데기만 보관합니다. 데이터는 항상 Firebase에서 받아옵니다.
const C='flowerrice-v31';const SHELL=['./','./index.html','./firebase-config.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  const lib=u.hostname==='www.gstatic.com'||u.hostname==='cdnjs.cloudflare.com';
  if(u.origin!==location.origin&&!lib)return;
  if(lib){e.respondWith(caches.open(C).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n;}))));return;}
  // 새 버전이 올라오면 바로 반영되도록 네트워크 우선
  e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));});
