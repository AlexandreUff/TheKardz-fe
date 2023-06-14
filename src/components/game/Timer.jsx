import { useEffect, useState } from "react"

export default function Timer(props){

    let [time,setTime] = useState(props.time)

    let regressiveTime

    useEffect(()=>{
        startTimer()
    },[])

    function startTimer(){
        regressiveTime = setInterval(()=>{
            setTime(prevTime => {
                if(prevTime <= 0){
                    clearInterval(regressiveTime)
                    return prevTime
                }
                return prevTime-1
            })
        },1000)
    }

    return (
        <div className="timer">
            <h6>
                {time}
            </h6>
        </div>
    )
}