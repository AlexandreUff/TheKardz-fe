import { useEffect, useState } from "react"
import { IcoTimer } from "../Icons"
import SoundPlayer from "../../Utils/SoundPlayer"

export default function Timer(props){

    let [time,setTime] = useState(props.time)

    const colorTimer = props.type === "match" ? "green" : "red"
    const soundBeepTimer = props.type === "match" && props.isMyMatch ? SoundPlayer.TimerRead : SoundPlayer.TimerRound

    useEffect(()=>{
        const regressiveTime = setInterval(()=>{
            setTime(prevTime => {
                if(prevTime <= 0){
                    props.action()
                    clearInterval(regressiveTime)
                    return prevTime
                }
                return prevTime-1
            })
        },1000)

        return () => {
            clearInterval(regressiveTime)
        }
    },[])

    useEffect(()=>{
        soundBeepTimer.play()
    },[time])

    return (
        <div className="timer" style={{border:`${colorTimer} solid 5px`, color: colorTimer}}>
            <h6>
                {time}
            </h6>
            <div className="timer-ico-container" style={{border:`${colorTimer} solid 2px`, backgroundColor: colorTimer}}>
                <IcoTimer />
            </div>
        </div>
    )
}