import { useContext, useEffect, useReducer, useRef, useState } from "react";
import CardToShow from "./CardToShow";
import Timer from "./Timer";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";
import ReadableMovementsNames from "../../Utils/ReadableMovementsNames";
import HandlerResultsOfRound from "./HandlerResultsOfRound";
import ShowScoreboard from "./ShowScoreboard";
import CardModel from "../../Utils/MovementModel";

const stageMatchReducer = (state, action) => {
  return action.payload ;
};

export default function GameArena() {
  const [stageMatch, setStageMatch] = useState("stand-by");
  const [resultMatch, setResultMatch] = useState({})
  const [movemetsInLastRound, setMovemetsInLastRound] = useState([
    {
      player: "player1",
      name: "",
      used: 0
    },
    {
      player: "player2",
      name: "",
      used: 0
    },
  ])
  const playersFightingRef = useRef([])
  const sendMovementTimeControll = useRef()
  const movementsToCompare = useRef([])
  const [playersAreFighting, setPlayersAreFighting] = useState([]);
  const [chosenMoviment, setChosenMoviment] = useState();
  const [cardsOfPlayerI, setCardsOfPlayerI] = useState([
    new CardModel("attack",1,1),
    new CardModel("defense",Infinity,1),
    new CardModel("recharging",Infinity,1),
  ])
  const [cardsOfPlayerII, setCardsOfPlayerII] = useState([
    new CardModel("attack",1,1),
    new CardModel("defense",Infinity,1),
    new CardModel("recharging",Infinity,1),
  ])

  const socket = useContext(SocketContext);

  const { userName, userId, hall } = SessionService.get("userDatas");

  useEffect(() => {
    //Recebe os status via websocket (nem sempre será assim)
    socket.listen("fight-status", (status) => {
      setStageMatch(status);

      //Cancelamento do Timeout de disparo de movimento caso um dos lutadores (lineNumber 0 ou 1) saiam da sala
      if(status === "start-fight"){
        clearTimeout(sendMovementTimeControll.current)

      }

      //Ignição de disparo de movimento caso o "round" se inicie
      if(status === "start-round"){
        movementsToCompare.current = []
        setChosenMoviment(false)
        sendMovementTimeControll.current = setTimeout(()=>{
          sendChosenMoviment()
        },5000)
      }
    });

    //Este serviço recebe os usuário da sala, mas pega apenas os que estão jogando/lutando (lineNumber 0 e 1)
    socket.listen("getUsers", (users) => {

      let playersWillFight = users.filter((user) => {
        return user.lineNumber === 0 || user.lineNumber === 1;
      });

      //É feita uma verificação para saber se você é um dos jogadores
      //Caso seja, seus cards e seu nome serão renderizados na parte inferior da tela
      //Caso não, jogador de lineNumber 0 ficará na parte superior e lineNumber 1 na inferior
      if (playersWillFight.length > 1) {
        const onlyUsersId = [playersWillFight[0]._id, playersWillFight[1]._id];
        const index = onlyUsersId.indexOf(userId);

        if (index !== -1 && index !== 0) {
          const temp = playersWillFight[1];
          playersWillFight[1] = playersWillFight[0];
          playersWillFight[0] = temp;
        }

        playersFightingRef.current = [...playersWillFight]
        setPlayersAreFighting([...playersWillFight]);
      } else {
        playersFightingRef.current = [...users]
        setPlayersAreFighting([...users]);
      }
    });

    //Captura de movimento dos jogadores via websocket
    socket.listen("chosen-movement", (dataMovements) => {

      //Caso o player que enviou o movimento seja igual ao do índice 0, ele joga...
      //...no useRef movementsToCompare.current[0]
      if(dataMovements.player.name === playersFightingRef.current[0].name){
        movementsToCompare.current[0] = [...dataMovements.movement]

        //Refaz os attr que têm amount igual a null para Infinity novamente
        const cardsOfPlayerIWithNewAmount = dataMovements.movement.map(card => {
          if(card.amount === null) card.amount = Infinity
          if(card.selected) card.amount--

          return card
        })

        //Remove os cards que zeraram o amout
        const newCardsOfPlayerI = cardsOfPlayerIWithNewAmount.filter(movement => {
          return movement.selected === false || movement.amount > 0;
        })

        setCardsOfPlayerI([...newCardsOfPlayerI])

        //Caso o player que enviou o movimento seja igual ao do índice 1, ele joga...
        //...no useRef movementsToCompare.current[1]
      } else if (dataMovements.player.name === playersFightingRef.current[1].name){
        movementsToCompare.current[1] = [...dataMovements.movement]

        //Refaz os attr que têm amount igual a null para Infinity novamente
        const cardsOfPlayerIIWithNewAmount = dataMovements.movement.map(card => {
          if(card.amount === null) card.amount = Infinity
          if(card.selected) card.amount--

          return card
        })

        //Remove os cards que zeraram o amout
        const newCardsOfPlayerII = cardsOfPlayerIIWithNewAmount.filter(movement => {
          return movement.selected === false || movement.amount > 0;
        })

        setCardsOfPlayerII([...newCardsOfPlayerII])
      }

      //Caso o player já tenha escolhido um movimento e o outro player acaba de enviar o seu
      if(movementsToCompare.current[0] && movementsToCompare.current[1]){
        setStageMatch("comparing-movements")
      }
    })

  }, [socket]);

  useEffect(()=>{
    console.log("Estágio:", stageMatch)
  },[stageMatch])

  useEffect(()=>{
    console.log("SCP1", cardsOfPlayerI)
  },[cardsOfPlayerI])

  useEffect(()=>{
    console.log("SCP2", cardsOfPlayerII)
  },[cardsOfPlayerII])

  const sendStartRoundStatus = () => {
    socket.send("starting-round");
  }

  const sendChosenMoviment = () => {
    //Apenas os fighters podem disparar o movimento
    if(playersFightingRef.current[0]._id === userId || playersFightingRef.current[1]._id === userId){

      //Caso o player nao tenha escolhido nenhuma carta, o jogo força escolha de uma "Recharging"
      if(!movementsToCompare.current[0]){
        const cardsWithRechargingTrue = [
          ...cardsOfPlayerI
        ]

        cardsWithRechargingTrue[cardsWithRechargingTrue.length-1].selected = true

        movementsToCompare.current[0] = [...cardsWithRechargingTrue]
      }

      //É enviado uma estrutura com o nome do fighter e todos os seus movimentos + o selecionado
      //Isso serve para que o jogador que acabou de entrar possa receber informações das cartas...
      //...para fazer o processamento de seu lado.
      const movementDataWillSend = {
        player: {
          ...playersFightingRef.current[0]
        },
        movement: [
          ...movementsToCompare.current[0]
        ]
      }

      socket.send("chosen-movement", movementDataWillSend)

      //Assim que os dados são enviados, os cardsOfPlayerI são refeitos + o movimento selecionado
      const cardsOfPlayerIWithNewAmount = movementsToCompare.current[0].map(card => {
        if(card.selected){
          card.amount--
        }
        return card
      })

      const newCardsOfPlayerI = cardsOfPlayerIWithNewAmount.filter(movement => {
        return movement.selected === false || movement.amount > 0;
      })

      //Entra em standy-by caso o adversário não tenha enviado ainda seu movimento
      setStageMatch("waiting-enemy-answer")

      //Caso o adversário já tenha enviado o movimento, inicia-se a comparação
      if(movementsToCompare.current[0] && movementsToCompare.current[1]){
        setStageMatch("comparing-movements")
      }

      setCardsOfPlayerI([...newCardsOfPlayerI])
    }
  }

  //Seleciona o movimento escolhido pelo player e o põe, junto com os outros cards, ...
  //no movementsToCompare.current[0]
  const userSelectMovement = (index,card) => {
    setChosenMoviment({...card})
    const newCards = cardsOfPlayerI.map(card => {
      card.selected = false
      return card
    })
    newCards[index].selected = true

    movementsToCompare.current[0] = [
        ...newCards
      ]
  }

  const renderScoreboard = () => {
    let userTitle
    let status

    //O texto do Scoreboard varia conforme a tela de cada participante
    if(resultMatch.winner.name === userName){
      userTitle = "você"
      status = "venceu"
    } else if (resultMatch.loser.name === userName){
      userTitle = "você"
      status = "perdeu"
    } else {
      userTitle = resultMatch.winner.name
      status = "venceu"
    }

    return (
      <ShowScoreboard
          username={userTitle}
          status={status}
      />
    )
  }

  return (
    <main className="game-arena">
      {resultMatch.isThereAWinner && (
        renderScoreboard()
      )}
      {/* Se você está jogando, seu nome nunca aparece nesta parte superior */}
      <div className="player-name">
        <div className="unused-area"></div>
        <h5 className="top">
          {playersAreFighting.length > 1 && playersAreFighting[1].name}
        </h5>
        <h6>
          {playersAreFighting.length > 1 &&
            `🏆 ${playersAreFighting[1].victories}  ☠️ ${playersAreFighting[1].loses}`}
        </h6>
      </div>
      <div className="card-list">
      {/* Informações do card inimigo jamais serão renderizados no card tela, apenas quantidade */}
      {cardsOfPlayerII.map((card, i) => {
          return <CardToShow
                    key={i}
                  />
        })}
      </div>
      <div className="table">
        {stageMatch === "start-fight" && (
          <Timer
            time={10}
            type="match"
            action={sendStartRoundStatus}
          />
        )}
        {stageMatch === "start-round" && (
          <Timer
            time={5}
            action={()=>{}}
          />
        )}
        {stageMatch === "comparing-movements" && (
          <HandlerResultsOfRound
            myId={userId}
            player1={
                {
                  playerData: playersFightingRef.current[0],
                  movements: movementsToCompare.current[0],
                }
              }
            player2={
                {
                  playerData: playersFightingRef.current[1],
                  movements: movementsToCompare.current[1],
                }
              }
            takeResult={
              (data)=>{setResultMatch({...data})}
            }
            cardsToIncrement={
              (cardForPlayer1, cardForPlayer2, lastMovementPlayerI, lastMovementPlayerII) => {

                /* Tac geral como true */

                if(cardForPlayer1) setCardsOfPlayerI([...cardForPlayer1])
                if(cardForPlayer2) setCardsOfPlayerII([...cardForPlayer2])
                setMovemetsInLastRound([
                  {...lastMovementPlayerI},
                  {...lastMovementPlayerII}
                ])
              }
            }
            movemetsInLastRound={[...movemetsInLastRound]}
          />
        )}
        {stageMatch === "stand-by" &&
          (playersAreFighting.length > 1 ? (
            <h3>Obtendo dados da partida...</h3>
          ) : (
            <h3>
              Aguarde a entrada <br /> de mais jogadores.
            </h3>
          ))}
      </div>
      <div className="card-list my-cards">
        {" "}
        {/* O jogador só entra nesse lado */}
        {/* Verifica se é o você o jogador. Caso não, os dados não podem ser passados no card */}
        {playersAreFighting.length > 1 && (playersAreFighting[0].name === userName) ?
          cardsOfPlayerI.map((card, i) => {
            return <CardToShow
                      moviment={card.cardName}
                      type={card.type}
                      show={stageMatch === "start-round"}
                      amount={card.amount}
                      chooseMov={() => userSelectMovement(i, card)}
                      key={i}
                    />
          }) : (
            cardsOfPlayerI.map((card, i) => {
              return <CardToShow
                        key={i}
                      />
            })
          )}
      </div>
      <div className="player-name">
        <div className="unused-area">
          {!!chosenMoviment && (
            <div className="selected-mov-content">
              {ReadableMovementsNames(chosenMoviment.cardName, chosenMoviment.type)}
            </div>)
          }
        </div>
        <h5 className="bottom">
          {playersAreFighting.length > 1 && (playersAreFighting[0].name === userName ?
           <>{playersAreFighting[0].name} <br /><small>(Você)</small></> : (playersAreFighting[0].name))}
        </h5>
        <h6>
          {playersAreFighting.length > 1 &&
            `🏆 ${playersAreFighting[0].victories}  ☠️ ${playersAreFighting[0].loses}`}
        </h6>
      </div>
    </main>
  );
}
