import { useContext, useEffect, useState } from "react"
import CardToShow from "./CardToShow";
import SocketContext from "../../context/socketContext";
import SoundPlayer from "../../Utils/SoundPlayer";

export default function HandlerResultsOfRound(props){

    const [show, setShow] = useState(false)

    const socket = useContext(SocketContext);

    const setResultsInAPI = async (winner, loser) => {
        //Caso seja o player perdedor, suas cartas voltam ao estado inicial
        if(props.myId === loser._id){
            socket.send("reset-my-cards")
        }

        //Caso seja o player vencedor, ele faz o update dos players
        if(props.myId === winner._id){
            const fightersData = {
                winner: {...winner},
                loser: {...loser}
            }
            
            //Ele também reinicia suas próprias cartas para o estado inicial
            socket.send("reset-my-cards")

            //Ele também começa uma nova partida
            socket.send("start-new-fight", fightersData)
        }
    }

    

    const player1Data = props.player1.playerData
    const player2Data = props.player2.playerData

    const movementSelectedPlayerI = props.player1.movements
    const movementSelectedPlayerII = props.player2.movements

    //Ataques do player I
    const p1_attack_p2_attack = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "attack"
    const p1_attack_p2_defense = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "defense"
    const p1_attack_p2_recharging = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "recharging"

    //Ataques do player II
    const p2_attack_p1_attack = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "attack"
    const p2_attack_p1_defense = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "defense"
    const p2_attack_p1_recharging = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "recharging"

    let matchResult = {
        isThereAWinner: false,
        winner: {},
        loser: {},
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player I
    if(p1_attack_p2_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_recharging){
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerII.type > movementSelectedPlayerI.type){
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_defense && movementSelectedPlayerII.type > movementSelectedPlayerI.type){
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_recharging){
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    useEffect(()=>{
        const showCardsTimeout = setTimeout(()=>{
            setShow(true)
        },500)

        const giveResultTimeout = setTimeout(()=>{
            props.takeResult(matchResult)
        },1000)

        const startOtherFightTimeout = setTimeout(()=>{
            if(matchResult.isThereAWinner){
                setResultsInAPI(matchResult.winner, matchResult.loser)
            } else {
                socket.send("starting-round");
            }
        },3000)

        SoundPlayer.DropCards.play()

        return ()=>{
            //Caso algum player saia antes da apresentação resultado, o setTimeout deve ser abortado
            clearTimeout(showCardsTimeout)
            clearTimeout(giveResultTimeout)
            clearTimeout(startOtherFightTimeout)
            props.resetCards(matchResult.isThereAWinner)
        }
    },[])

    return (
      <>
        <div className="show-result">
            <div className="player-2-card-bringer">
                <CardToShow
                    moviment={movementSelectedPlayerII.cardName}
                    type={movementSelectedPlayerII.type}
                    show={show}
                    chooseMov={() => {}}
                />
            </div>
            <div className="player-1-card-bringer">
                <CardToShow
                    moviment={movementSelectedPlayerI.cardName}
                    type={movementSelectedPlayerI.type}
                    show={show}
                    chooseMov={() => {}}
                />
            </div>
        </div>
      </>
    )
}