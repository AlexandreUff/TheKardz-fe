import { useContext, useEffect, useState } from "react"
import CardToShow from "./CardToShow";
import SocketContext from "../../context/socketContext";
import CardModel from "../../Utils/MovementModel";

export default function HandlerResultsOfRound(props){

    const [show, setShow] = useState(false)

    const socket = useContext(SocketContext);

    const setResultsInAPI = async (winner, loser) => {
        //Caso seja o player perdedor, suas cartas voltam ao estado inicial
        console.log("Winner e loser", winner, loser)
        if(props.myId === loser._id){
            console.log("Disparei", loser.name)
            socket.send("reset-my-cards")
        }

        //Caso seja o player vencedor, ele faz o update dos players
        if(props.myId === winner._id){
            console.log(`${winner.name} gravou os dados.`)
            
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

    /* const allMovementsOfPlayer1 = props.player1.movements */
    /* const allMovementsOfPlayer2 = props.player2.movements */

    const movementSelectedPlayerI = props.player1.movements/* .find(movement => movement.selected === true) */
    const movementSelectedPlayerII = props.player2.movements/* .find(movement => movement.selected === true) */

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
        console.log("Player 1 venceu com at-at", movementSelectedPlayerI.type, movementSelectedPlayerII.type)
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
        console.log("Player 1 venceu com at-de", movementSelectedPlayerI.type, movementSelectedPlayerII.type)
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    if(p1_attack_p2_recharging){
        console.log("Player 1 venceu com at-re", movementSelectedPlayerI.type, movementSelectedPlayerII.type)
        matchResult = {
            isThereAWinner: true,
            winner: player1Data,
            loser: player2Data,
        }
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerII.type > movementSelectedPlayerI.type){
        console.log("Player 2 venceu com at-at", movementSelectedPlayerII.type, movementSelectedPlayerI.type)
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_defense && movementSelectedPlayerII.type > movementSelectedPlayerI.type){
        console.log("Player 2 venceu com at-de", movementSelectedPlayerII.type, movementSelectedPlayerI.type)
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    if(p2_attack_p1_recharging){
        console.log("Player 2 venceu com at-re", movementSelectedPlayerII.type, movementSelectedPlayerI.type)
        matchResult = {
            isThereAWinner: true,
            winner: player2Data,
            loser: player1Data,
        }
    }

    //Caso não haja nenhum vencedor, o card que tem selected igual a true passará a ser false
    //Caso haja movimento repetido, o jogador ganhará a carta bonus
    function detectLastMovementUsed(){

        //Verificando recargas do player 1
        /* if(movementSelectedPlayerI.cardName === "recharging"){
            const movementIndex = allMovementsOfPlayer1.findIndex(movement => movement.cardName === "attack")

            if(movementIndex === -1){

                if(movementSelectedPlayerI.type === 1){
                    allMovementsOfPlayer1.unshift(new CardModel("attack", 1, 1))
                } else if(movementSelectedPlayerI.type === 2){
                    allMovementsOfPlayer1.unshift(new CardModel("attack", 2, 1))
                } else if(movementSelectedPlayerI.type >= 3){
                    allMovementsOfPlayer1.unshift(new CardModel("attack", 3, 1))
                }

            } else {

                if(movementSelectedPlayerI.type === 1){
                    allMovementsOfPlayer1[movementIndex].amount++
                } else if(movementSelectedPlayerI.type === 2){
                    allMovementsOfPlayer1[movementIndex].amount = allMovementsOfPlayer1[movementIndex].amount + 2
                } else if(movementSelectedPlayerI.type >= 3){
                    allMovementsOfPlayer1[movementIndex].amount = allMovementsOfPlayer1[movementIndex].amount + 3
                }

            }
        } */

        //Verifica se o Player 1 usou o mesmo movimento que na jogada anterior
        if(lastMovementPlayerI.name === movementSelectedPlayerI.cardName){
            const movementIndex = allMovementsOfPlayer1.findIndex(movement => movement.cardName === movementSelectedPlayerI)

            if(lastMovementPlayerI.used === 1){
                if(movementIndex === -1){
                    allMovementsOfPlayer1.unshift(new CardModel(movementSelectedPlayerI.cardName, 1, 2))
                } else {
                    allMovementsOfPlayer1[movementIndex].amount++
                }
            }

            if(lastMovementPlayerI.used >= 2){
                if(movementIndex === -1){
                    allMovementsOfPlayer1.unshift(new CardModel(movementSelectedPlayerI.cardName, 1, 3))
                } else {
                    allMovementsOfPlayer1[movementIndex].amount++
                }
            }

            lastMovementPlayerI.used++
        } else {
            lastMovementPlayerI.name = movementSelectedPlayerI.cardName
            lastMovementPlayerI.used = 1
        }

        //Verifica se o Player 2 usou o mesmo movimento que na jogada anterior
        if(lastMovementPlayerII.name === movementSelectedPlayerII.cardName){
            const movementIndex = allMovementsOfPlayer2.findIndex(movement => movement.cardName === movementSelectedPlayerII)

            if(lastMovementPlayerII.used === 1){
                if(movementIndex === -1){
                    allMovementsOfPlayer2.unshift(new CardModel(movementSelectedPlayerII.cardName, 1, 2))
                } else {
                    allMovementsOfPlayer2[movementIndex].amount++
                }
            }
            if(lastMovementPlayerII.used >= 2){
                if(movementIndex === -1){
                    allMovementsOfPlayer2.unshift(new CardModel(movementSelectedPlayerII.cardName, 1, 3))
                } else {
                    allMovementsOfPlayer2[movementIndex].amount++
                }
            }

            lastMovementPlayerII.used++
        } else {
            lastMovementPlayerII.name = movementSelectedPlayerII.cardName
            lastMovementPlayerII.used = 1
        }

        console.log("Movimentos do player 1",allMovementsOfPlayer1)
        console.log("Movimentos do player 2",allMovementsOfPlayer2)

        const allMovementsOfPlayer1Unselected = allMovementsOfPlayer1.map(movement => {
            if(movement.selected){
                movement.selected = false
            }

            return movement
        })

        const allMovementsOfPlayer2Unselected = allMovementsOfPlayer2.map(movement => {
            if(movement.selected){
                movement.selected = false
            }

            return movement
        })

        return props.cardsToIncrement(
            allMovementsOfPlayer1Unselected,
            allMovementsOfPlayer2Unselected,
            lastMovementPlayerI,
            lastMovementPlayerII
            )
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
                /* detectLastMovementUsed() */
                
                socket.send("starting-round");
            }
        },3000)

        //Ponha um timeout pra iniciar um round caso não haja vencedor/perdedor

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