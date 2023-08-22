import MainIcon from "../assets/images/main-icon.png"

async function MyNotification(title, textBody){
    const permission = await Notification.requestPermission()
        if(permission === 'granted'){
            new Notification(title, {
                body: textBody,
                icon: MainIcon
            })
        }
}

export default MyNotification