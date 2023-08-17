async function MyNotification(){
    /* if('Notification' in window){
        Notification.requestPermission().then(function (permission){
            if(permission === 'granted'){
                new Notification('Notif Exem', {
                    body: "Texto texto texto"
                })
            }
        })
    } */

    const permission = await Notification.requestPermission()

    /* if(window.Notification && window.Notification.permission !== "denied"){ */
        /* window.Notification.requestPermission().then(function (permission){ */
            if(permission === 'granted'){
                new Notification('Notif Exem', {
                    body: "Texto texto texto"
                })
            }
        /* }) */

        /* window.Notification.requestPermission */
    /* } */
}

export default MyNotification