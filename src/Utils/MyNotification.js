import MainIcon from "../assets/images/main-icon.png"

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
                    body: "Texto texto texto",
                    icon: MainIcon
                })
            }
        /* }) */

        /* window.Notification.requestPermission */
    /* } */
}

export default MyNotification