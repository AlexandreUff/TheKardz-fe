import { useContext, useEffect, useRef, useState } from "react";
import CardToShow from "./CardToShow";
import Timer from "./Timer";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";
import ReadableMovementsNames from "../../Utils/ReadableMovementsNames";
import HandlerResultsOfRound from "./HandlerResultsOfRound";
import ShowScoreboard from "./ShowScoreboard";
import CardModel from "../../Utils/MovementModel";
import MyNotification from "../../Utils/MyNotification";

export default function GameArena() {
  const [stageMatch, setStageMatch] = useState("stand-by");
  const [resultMatch, setResultMatch] = useState({})
  const playersFightingRef = useRef([])
  const sendMovementTimeControll = useRef()
  const cardsChosenToCompare = useRef([])
  const blockSendCard = useRef(false)
  const [playersAreFighting, setPlayersAreFighting] = useState([]);
  const [chosenMoviment, setChosenMoviment] = useState();
  const [cardsOfPlayerI, setCardsOfPlayerI] = useState([])
  const [cardsOfPlayerII, setCardsOfPlayerII] = useState([])

  const socket = useContext(SocketContext);

  const { userName, userId, hall } = SessionService.get("userDatas");

  useEffect(() => {
    //Recebe os status via websocket (nem sempre será assim)
    socket.listen("fight-status", (status) => {
      setStageMatch(status);

      //Cancelamento do Timeout de disparo de movimento caso um dos lutadores (lineNumber 0 ou 1) saiam da sala
      if(status === "start-fight"){
        setChosenMoviment(false)
        setResultMatch({})
        //Esse "reset-my-cards", provavelmente, não ficará aqui
        socket.send("reset-my-cards")
        cardsChosenToCompare.current = []
        clearTimeout(sendMovementTimeControll.current)
      }

      //Ignição de disparo de movimento caso o "round" se inicie
      if(status === "start-round"){
        setChosenMoviment(false)
        cardsChosenToCompare.current = []
        blockSendCard.current = false
        sendMovementTimeControll.current = setTimeout(()=>{
          sendChosenMoviment()
        },5000)
      }

      if(status === "end-fight"){
        if(playersFightingRef.current[0]._id === userId || playersFightingRef.current[1]._id === userId){
          //Esse reset é feito pois pode o player fica só na sala e não reiniciar suas cartas
          socket.send("reset-my-cards")
        }
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
        //Esse reset é feito pois pode o player fica só na sala e não reiniciar suas cartas
        /* socket.send("reset-my-cards") */

        playersFightingRef.current = [...users]
        setPlayersAreFighting([...users]);
      }
    });

    socket.listen("get-fighter-cards", (data) => {

      if(data.userCredentials.userId === playersFightingRef.current[0]._id){
        const cardsWithCorretlyAmount = data.userCards.map(card => {
          if(card.amount === null) card.amount = Infinity
          return card
        })
        setCardsOfPlayerI([...cardsWithCorretlyAmount])

      } else if(data.userCredentials.userId === playersFightingRef.current[1]._id){
        const cardsWithCorretlyAmount = data.userCards.map(card => {
          if(card.amount === null) card.amount = Infinity
          return card
        })

        setCardsOfPlayerII([...cardsWithCorretlyAmount])
      }

    })

    //Captura de movimento dos jogadores via websocket
    socket.listen("chosen-movement", (dataMovement) => {

      //Caso o player que enviou o movimento seja igual ao do índice 0, ele joga...
      //...no useRef movementsToCompare.current[0]
      if(dataMovement.player.name === playersFightingRef.current[0].name){

        //Refaz os attr que têm amount igual a null para Infinity novamente
        const cardOfPlayerIWithNewAmount = {...dataMovement.movement}
        if(cardOfPlayerIWithNewAmount.amount === null) cardOfPlayerIWithNewAmount.amount = Infinity

        cardsChosenToCompare.current[0] = cardOfPlayerIWithNewAmount
        /* setDoP1([...cardsOfPlayerIWithNewAmount]) */

        //Caso o player que enviou o movimento seja igual ao do índice 1, ele joga...
        //...no useRef movementsToCompare.current[1]
      } else if (dataMovement.player.name === playersFightingRef.current[1].name){

        //Refaz os attr que têm amount igual a null para Infinity novamente
        const cardOfPlayerIIWithNewAmount = {...dataMovement.movement}
        if(cardOfPlayerIIWithNewAmount.amount === null) cardOfPlayerIIWithNewAmount.amount = Infinity

        cardsChosenToCompare.current[1] = cardOfPlayerIIWithNewAmount
        /* setDoP2([...cardsOfPlayerIIWithNewAmount]) */
      }

      //Caso o player já tenha escolhido um movimento e o outro player acaba de enviar o seu
      if(cardsChosenToCompare.current[0] && cardsChosenToCompare.current[1]){
        setStageMatch("comparing-movements")
      }
    })

  }, [socket]);

  useEffect(()=>{
    if(stageMatch === "start-round"){
      MyNotification()
      if(playersFightingRef.current[0]._id === userId || playersFightingRef.current[1]._id === userId){
        socket.send("get-fighter-cards")
      }
    }
  },[stageMatch])

  const sendStartRoundStatus = () => {
    socket.send("starting-round");
  }

  const sendChosenMoviment = () => {
    //Apenas os fighters podem disparar o movimento
    if(playersFightingRef.current[0]._id === userId || playersFightingRef.current[1]._id === userId){

      //Caso o player nao tenha escolhido nenhuma carta, o jogo força escolha de uma "Recharging"
      if(!cardsChosenToCompare.current[0]){
        //blockSendCard serve para impedir que haja uma escolha posterior ao envio e,...
        //com isso, evitado que hajam cartas escolhidas distintas para ambos players.
        blockSendCard.current = true
        cardsChosenToCompare.current[0] = new CardModel("recharging", Infinity, 1)
      }

      //É enviado uma estrutura com o nome do fighter e todos os seus movimentos + o selecionado
      //Isso serve para que o jogador que acabou de entrar possa receber informações das cartas...
      //...para fazer o processamento de seu lado.
      const cardDataWillSend = {
        player: {
          ...playersFightingRef.current[0]
        },
        movement: {
          ...cardsChosenToCompare.current[0]
        }
      }

      socket.send("chosen-movement", cardDataWillSend)

      if(cardsChosenToCompare.current[0] && cardsChosenToCompare.current[1]){
        setStageMatch("comparing-movements")
      }
    }
  }

  //Seleciona o movimento escolhido pelo player e o põe, junto com os outros cards, ...
  //no movementsToCompare.current[0]
  const userSelectMovement = (index,card) => {
    //Caso não haja bloqueio de envio, os trâmites de escolhe ocorrem normalmente
    if(!blockSendCard.current){
      setChosenMoviment({...card})
      const newCards = cardsOfPlayerI.map(card => {
        card.selected = false
        return card
      })
      newCards[index].selected = true

      cardsChosenToCompare.current[0] = newCards[index]
  
      setCardsOfPlayerI([
        ...newCards
      ])
    }
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
                  movements: cardsChosenToCompare.current[0],
                }
              }
            player2={
                {
                  playerData: playersFightingRef.current[1],
                  movements: cardsChosenToCompare.current[1],
                }
              }
            takeResult={
              (data)=>{setResultMatch({...data})}
            }
            resetCards={
              (result) => {
                if(result){
                  setCardsOfPlayerI([])
                  setCardsOfPlayerII([])
                }
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
