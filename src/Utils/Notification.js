function Notification(){
    if('Notification' in window){
        Notification.requestPermission().then(function (permission){
            if(permission === 'granted'){
                new Notification('Notif Exem', {
                    body: "Texto texto texto"
                })
            }
        })
    }
}

export default Notification