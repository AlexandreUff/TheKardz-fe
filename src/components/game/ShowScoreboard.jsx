import SoundPlayer from "../../Utils/SoundPlayer"

export default function ShowScoreboard(props){

    const userName = props.username
    const status = props.status

    if(status === "venceu"){
        SoundPlayer.Winner.play()
    } else {
        SoundPlayer.Loser.play()
    }

    const emojiStatusShow = () => {

        const countEmoji = new Array(20).fill(0).map((_,i) => {
            return (
            <div key={i} className="emoji-status" style={{
                position:"absolute",
                top: `${i*5+10}%`,
                left: `${Math.floor(Math.random() * 110)}%`,
            }}>
                {status === "perdeu" ? "😥" : (i % 2 === 0 ? "😁" : "🙌")}
            </div>
            )
        })

        return countEmoji
    }

    return (
        <>
            <div className={`scoreboard ${status}`}>
                    <h1>{userName.toUpperCase()}</h1>
                    <h2>{status.toUpperCase()}</h2>
                    {emojiStatusShow()}
            </div>
        </>
    )
}