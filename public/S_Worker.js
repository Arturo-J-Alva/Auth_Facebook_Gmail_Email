//Este archivo, desde que el cliente se registra, siempre va estar activo, asi cierre la ventana, y enviará las notificaciones

self.addEventListener('push', ev => {
    let { title, temp, hum, time } = ev.data.json()
    time = new Date(time)
    const minutos = time.getMinutes()
    const horas = time.getHours()
    const segundos = time.getSeconds()
    console.log('notif:', { title, temp, hum, time })
    function date2cifras(date) {
        if (date < 10) return `0${date}`
        return date
    }
    self.registration.showNotification(title, {
        body: `T: ${temp} °C - H.R: ${hum} % - ${date2cifras(horas)}h ${date2cifras(minutos)}m `,
        icon: 'https://elasticbeanstalk-us-east-2-770705900185.s3.us-east-2.amazonaws.com/PintoStore/fotos/iot_icon.png',
        silent: true,
        image: "https://elasticbeanstalk-us-east-2-770705900185.s3.us-east-2.amazonaws.com/PintoStore/fotos/hortgaia2.jpg"
    });
})

self.addEventListener('notificationclick', ev => {
    ev.notification.close();
    //console.log('notificationclick4!!! ')
    ev.waitUntil(
        clients.openWindow("https://hort-gaia-iot.netlify.app/")
    );
})