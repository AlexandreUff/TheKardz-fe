import { useContext, useEffect, useState } from "react"
import CardToShow from "./CardToShow";
import SocketContext from "../../context/socketContext";

export default function HandlerResultsOfRound(props){

    const [show, setShow] = useState(false)

    const socket = useContext(SocketContext);

    const saveResultsInAPI = async (winner, loser) => {
        if(props.myId === winner._id){
            console.log(`${winner.name} gravou os dados.`)

            const fightersData = {
                winner: {...winner},
                loser: {...loser}
            }

            /* props.startOtherFight(fightersData) */
            socket.send("start-new-fight", fightersData)
        }
    }

    

    const player1Data = props.player1.playerData
    const player2Data = props.player2.playerData

    const movementSelectedPlayerI = props.player1.movement
    const movementSelectedPlayerII = props.player2.movement

    const lastMovementPlayerI = props.movemetsInLastRound[0]
    const lastMovementPlayerII = props.movemetsInLastRound[1]

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
        /* saveWinnerResultsInAPI(player1Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        /* saveWinnerResultsInAPI(player1Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_recharging){
        /* saveWinnerResultsInAPI(player1Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        /* saveWinnerResultsInAPI(player2Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        /* saveWinnerResultsInAPI(player2Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_recharging){
        /* saveWinnerResultsInAPI(player2Data) */
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    //Caso não haja nenhum vencedor, o card que tem selected igual a true passará a ser false
    //Caso haja movimento repetido, o jogador ganhará a carta bonus
    if(!matchResult.isThereAWinner){
        if(lastMovementPlayerI.name === movementSelectedPlayerI){
            if(lastMovementPlayerI.used === 1) console.log("Player 1 recebe card Bronze")
            if(lastMovementPlayerI.used >= 2) console.log("Player 1 recebe card Gold")   
        }

        if(lastMovementPlayerII.name === movementSelectedPlayerII){
            if(lastMovementPlayerII.used === 1) console.log("Player 2 recebe card Bronze")
            if(lastMovementPlayerII.used >= 2) console.log("Player 2 recebe card Gold")   
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
                saveResultsInAPI(matchResult.winner, matchResult.loser)
            } else {
                socket.send("starting-round");
            }
        },3000)

        //Ponha um timeout pra iniciar um round caso não haja vencedor/perdedor

        return ()=>{
            //Caso algum player saia antes da apresentação resultado, o setTimeout deve ser abortado
            
            clearTimeout(showCardsTimeout)
            clearTimeout(giveResultTimeout)
            clearTimeout(startOtherFightTimeout)
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