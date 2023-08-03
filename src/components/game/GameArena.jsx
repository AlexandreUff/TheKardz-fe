import { useContext, useEffect, useReducer, useRef, useState } from "react";
import CardToShow from "./CardToShow";
import Timer from "./Timer";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";
import ReadableMovementsNames from "../../Utils/ReadableMovementsNames";
import HandlerResultsOfRound from "./HandlerResultsOfRound";
import ShowScoreboard from "./ShowScoreboard";

const stageMatchReducer = (state, action) => {
  return action.payload ;
};

export default function GameArena() {
  const [stageMatch, setStageMatch] = useState("stand-by");
  const [resultMatch, setResultMatch] = useState({})
  const playersFightingRef = useRef([])
  const sendMovementTimeControll = useRef()
  const movementsToCompare = useRef([])
  const [playersAreFighting, setPlayersAreFighting] = useState([]);
  const [chosenMoviment, setChosenMoviment] = useState();
  const [cardsOfPlayerI, setCardsOfPlayerI] = useState([
    {
      cardName: "attack",
      amount: 1,
      type: 1,
      selected: false,
    },
    {
      cardName: "defense",
      amount: Infinity,
      type: 1,
      selected: false,
    },
    {
      cardName: "recharging",
      amount: Infinity,
      type: 1,
      selected: false,
    },
  ])
  const [cardsOfPlayerII, setCardsOfPlayerII] = useState([
    {
      cardName: "attack",
      amount: 1,
      type: 1,
      selected: false,
    },
    {
      cardName: "defense",
      amount: Infinity,
      type: 1,
      selected: false,
    },
    {
      cardName: "recharging",
      amount: Infinity,
      type: 1,
      selected: false,
    },
  ])

  const socket = useContext(SocketContext);

  const { userName, userId, hall } = SessionService.get("userDatas");

  useEffect(() => {
    
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

    socket.listen("getUsers", (users) => {

      let playersWillFight = users.filter((user) => {
        return user.lineNumber === 0 || user.lineNumber === 1;
      });

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

    socket.listen("chosen-movement", (dataMovements) => {

      if(dataMovements.player.name === playersFightingRef.current[0].name){
        movementsToCompare.current[0] = [...dataMovements.movement]

        const cardsOfPlayerIWithNewAmount = dataMovements.movement.map(card => {
          if(card.amount === null) card.amount = Infinity
          if(card.selected) card.amount--

          return card
        })

        const newCardsOfPlayerI = cardsOfPlayerIWithNewAmount.filter(movement => {
          return movement.selected === false || movement.amount > 0;
        })

        setCardsOfPlayerI([...newCardsOfPlayerI])

      } else if (dataMovements.player.name === playersFightingRef.current[1].name){
        movementsToCompare.current[1] = [...dataMovements.movement]

        const cardsOfPlayerIIWithNewAmount = dataMovements.movement.map(card => {
          if(card.amount === null) card.amount = Infinity
          if(card.selected) card.amount--

          return card
        })

        const newCardsOfPlayerII = cardsOfPlayerIIWithNewAmount.filter(movement => {
          return movement.selected === false || movement.amount > 0;
        })

        setCardsOfPlayerII([...newCardsOfPlayerII])
      }

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
    if(playersFightingRef.current[0]._id === userId || playersFightingRef.current[1]._id === userId){

      //Caso o player nao tenha escolhido nenhuma carta, o jogo força escolha de uma "Recharging"
      if(!movementsToCompare.current[0]){
        const cardsWithRechargingTrue = [
          ...cardsOfPlayerI
        ]

        cardsWithRechargingTrue[cardsWithRechargingTrue.length-1].selected = true

        movementsToCompare.current[0] = [...cardsWithRechargingTrue]
      }


      const movementDataWillSend = {
        player: {
          ...playersFightingRef.current[0]
        },
        movement: [
          ...movementsToCompare.current[0]
        ]
      }

      socket.send("chosen-movement", movementDataWillSend)

      const cardsOfPlayerIWithNewAmount = movementsToCompare.current[0].map(card => {
        if(card.selected){
          card.amount--
        }
        return card
      })

      const newCardsOfPlayerI = cardsOfPlayerIWithNewAmount.filter(movement => {
        return movement.selected === false || movement.amount > 0;
      })

      setStageMatch("waiting-enemy-answer")

      if(movementsToCompare.current[0] && movementsToCompare.current[1]){
        setStageMatch("comparing-movements")
      }

      setCardsOfPlayerI([...newCardsOfPlayerI])
    }
  }

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
                  movement: movementsToCompare.current[0].find(movement => movement.selected === true),
                }
              }
            player2={
                {
                  playerData: playersFightingRef.current[1],
                  movement: movementsToCompare.current[1].find(movement => movement.selected === true),
                }
              }
            takeResult={
              (data)=>{setResultMatch({...data})}
            }
            cardsToIncrement={
              (cardForPlayer1, cardForPlayer2) => {
                if(cardForPlayer1) setCardsOfPlayerI([...cardsOfPlayerI, cardForPlayer1])
                if(cardForPlayer2) setCardsOfPlayerII([...cardsOfPlayerII, cardForPlayer2])
              }
            }
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
