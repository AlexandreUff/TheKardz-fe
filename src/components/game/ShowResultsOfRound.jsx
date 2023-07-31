import { useEffect, useState } from "react"
import CardToShow from "./CardToShow";
import APIService from "../../services/APIService"

export default function ShowResultsOfRound(props){

    const [show, setShow] = useState(false)

    const saveWinnerResultsInAPI = async (winner) => {
        const winnerWithNewDatas = {...winner}
        if(props.myId === winnerWithNewDatas._id){
            console.log(`${winnerWithNewDatas.name} gravou os dados.`)
    
            winnerWithNewDatas.victories++
    
            await APIService.post("/user/update",{...winnerWithNewDatas})
        }
    }

    console.log("ESTOU RENDERIZANDO!!!!!!!!",props.player1.playerData)

    const player1Data = props.player1.playerData
    const player2Data = props.player2.playerData

    const movementSelectedPlayerI = props.player1.movement
    const movementSelectedPlayerII = props.player2.movement

    //Ataques do player I
    const p1_attack_p2_attack = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "attack"
    const p1_attack_p2_defense = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "defense"
    const p1_attack_p2_recharging = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "recharging"

    //Ataques do player II
    const p2_attack_p1_attack = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "attack"
    const p2_attack_p1_defense = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "defense"
    const p2_attack_p1_recharging = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "recharging"

    let matchResult = "Empate"

    //Aqui entram apenas as estruturas de ataque com vitória do player I
    if(p1_attack_p2_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        saveWinnerResultsInAPI(player1Data)
        matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        saveWinnerResultsInAPI(player1Data)
        matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_recharging){
        saveWinnerResultsInAPI(player1Data)
        matchResult = "P1 Venceu"
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        saveWinnerResultsInAPI(player2Data)
        matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        saveWinnerResultsInAPI(player2Data)
        matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_recharging){
        saveWinnerResultsInAPI(player2Data)
        matchResult = "P2 Venceu"
    }

    useEffect(()=>{
        const resultTimeout = setTimeout(()=>{
            setShow(true)
        },500)

        return ()=>{
            clearTimeout(resultTimeout)
        }
    },[])

    return (
      <>
        {/* <h1>{matchResult}</h1>
        <p>({movementSelectedPlayerI.cardName} | {movementSelectedPlayerI.type})</p>
        <p>({movementSelectedPlayerII.cardName} | {movementSelectedPlayerII.type})</p> */}
        <div className="show-result">
            <div className="player-2-card-bringer">
                <CardToShow
                    moviment={movementSelectedPlayerII.cardName}
                    type={movementSelectedPlayerII.type}
                    show={show}
                    /* amount={card.amount} */
                    chooseMov={() => {}}
                />
            </div>
            <div className="player-1-card-bringer">
                <CardToShow
                    moviment={movementSelectedPlayerI.cardName}
                    type={movementSelectedPlayerI.type}
                    show={show}
                    /* amount={card.amount} */
                    chooseMov={() => {}}
                />
            </div>
        </div>
      </>
    )
}