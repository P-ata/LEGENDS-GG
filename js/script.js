if('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('/sw.js')
        .then((registration)=>{
            console.log('ServiceWorker registrado ok, alcance: alcance:' + registration.scope);
        })
    })
}