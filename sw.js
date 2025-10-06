let cacheName ='cache';

let cacheDynamic = 'cache2';

self.addEventListener('install', (e) =>{
    self.skipWaiting();
    /* e.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            cache.addAll([
                'assets/banner-LEGENDSGG.webp'
                ,'assets/demacia-LEGENDSGG.webp'
                ,'assets/Logo-Legends.webp'
                ,'assets/Mejora-con-los-poros.webp'
                ,'assets/search.svg'
                ,'js/api.js'
            ])
        })
    ) */
    console.log('sw instalado: ', e) //installEvent
});

self.addEventListener('activate', (e) =>{
    console.log('sw Activado: ', e) //extendableEvent
});

self.addEventListener('fetch', (e) =>{
    e.respondWith(caches.match(e.request)
        .then((response) =>{
            if(response){
                return response;
            }
            let requestToCache = e.request.clone() //clonamos la solicitud: una solicitud es un flujo y se puede consumir una sola vez
            return fetch(requestToCache)
            .then(//trata de hacer la solicitud HTTP original segun lo previsto
                (response) =>{
                    if(!response || response.status !== 200){
                        //si la respuesta falla y response con un codigo de error la devolvemos inmediatamente
                        return response;
                    }

                    let responseToCache = response.clone(); //Nuevamente, clonamos la respuesta porque necesitamos agregarla al cache y porque se usa para la respuesta final

                    caches.open(cacheDynamic) //Abre el cache
                        .then(function (cache2) {
                            cache2.put(requestToCache, responseToCache); //Agrega la solicitud y la respuesta al cache 
                        });
                }    
            )
        })
    )
})