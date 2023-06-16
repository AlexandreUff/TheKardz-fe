import { useEffect, useState } from "react"
import { IcoTimer } from "../Icons"

export default function Timer(props){

    let [time,setTime] = useState(props.time)

    const colorTimer = props.type === "match" ? "green" : "red"

    useEffect(()=>{
        const regressiveTime = setInterval(()=>{
            setTime(prevTime => {
                if(prevTime <= 0){
                    clearInterval(regressiveTime)
                    return prevTime
                }
                return prevTime-1
            })
        },1000)
    },[])

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