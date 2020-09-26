const KEY_VAPID = "BKrC44_47c_iajmUXnaPnibU6tzsuVVssnBrY30TSckPLy9-lrhpEv00kvkN4mLLA0DN2mdujU0MMiC318F_xRU"
//const Url = "http://localhost:3050/dhtTest/"
const Url = "https://hort-gaia-back.herokuapp.com/dht/"

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async () => {
    //Service Worked
    const register = await navigator.serviceWorker.register('/S_Worker.js', {
        scope: '/'
    })

    console.log('new service worked:', register)

    const subcriptionRegister = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(KEY_VAPID)
    })
    console.log('subcription:', subcriptionRegister)
    await fetch(Url + 'subscription', {
        method: 'POST',
        body: JSON.stringify(subcriptionRegister),
        headers: {
            "Content-type": "application/json"
        }
    })
}
if (!navigator.serviceWorker.controller) {
    setTimeout(() => {
        subscription()
    }, 1000);
}
