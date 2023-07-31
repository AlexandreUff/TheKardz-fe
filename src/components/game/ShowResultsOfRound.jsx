import { useEffect, useState } from "react"
import CardToShow from "./CardToShow";

export default function ShowResultsOfRound(props){

    const [show, setShow] = useState(false)

    console.log("ESTOU RENDERIZANDO!!!!!!!!")

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
      matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_recharging){
      matchResult = "P1 Venceu"
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_recharging){
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