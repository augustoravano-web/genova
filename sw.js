const V='genova-v1';
const HOSTS=['www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin!==location.origin&&!HOSTS.includes(u.hostname))return;
  e.respondWith(caches.open(V).then(c=>fetch(r).then(n=>{if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(()=>c.match(r).then(m=>m||(r.mode==='navigate'?c.match('index.html'):undefined)))));
});
