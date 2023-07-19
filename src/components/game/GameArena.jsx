import { useContext, useEffect, useState } from "react";
import CardToShow from "./CardToShow";
import Timer from "./Timer";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";

export default function GameArena() {
  const [stageMatch, setStageMatch] = useState("stand-by");
  const [playersAreFighting, setPlayersAreFighting] = useState([]);
  const [cardsOfPlayerI, setCardsOfPlayerI] = useState([
    {
      cardName: "attack1",
      amount: 1,
      type: "default",
    },
    {
      cardName: "recharging1",
      amount: Infinity,
      type: "default",
    },
    {
      cardName: "defense1",
      amount: Infinity,
      type: "default",
    },
  ])
  const [cardsOfPlayerII, setCardsOfPlayerII] = useState([
    {
      cardName: "attack1",
      amount: 1,
      type: "default",
    },
    {
      cardName: "recharging1",
      amount: 1,
      type: "default",
    },
    {
      cardName: "defense1",
      amount: 1,
      type: "default",
    },
  ])

  const socket = useContext(SocketContext);

  const { userName, userId, hall } = SessionService.get("userDatas");

  useEffect(() => {
    
    socket.listen("fight-status", (status) => {
      setStageMatch(status);
      console.log("Último status:", status);
    });

    socket.listen("getUsers", (users) => {
      let playersWillFight = users.filter((user) => {
        return user.lineNumber === 0 || user.lineNumber === 1;
      });

      console.log(playersWillFight);

      if (playersWillFight.length > 1) {
        const onlyUsersId = [playersWillFight[0]._id, playersWillFight[1]._id];
        const index = onlyUsersId.indexOf(userId);

        if (index !== -1 && index !== 1) {
          const temp = playersWillFight[0];
          playersWillFight[0] = playersWillFight[1];
          playersWillFight[1] = temp;
        }

        setPlayersAreFighting([...playersWillFight]);
      } else {
        setPlayersAreFighting([]);
      }
    });
  }, [playersAreFighting, socket]);

  return (
    <main className="game-arena">
      {/* <CardToShow /> */}
      <div className="player-name">
        <div className="unused-area"></div>
        <h5 className="top">
          {playersAreFighting.length > 1 && playersAreFighting[0].name}
        </h5>
        <h6>
          {playersAreFighting.length > 1 &&
            `🏆 ${playersAreFighting[0].victories}  ☠️ ${playersAreFighting[0].loses}`}
        </h6>
      </div>
      <div className="card-list">
      {cardsOfPlayerI.map((card, i) => {
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
            action={() => {
              socket.send("starting-round");
            }}
          />
        )}
        {stageMatch === "start-round" && (
          <Timer
            time={5}
            action={() => {
              console.log("Fois");
            }}
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
        {/* {(
                    playersAreFighting.length > 1 ?
                    <h3>Obtendo dados da partida...</h3> : <h3>Aguarde a entrada <br /> de mais jogadores.</h3>
                )} */}

        {/* Fazer a área de logs */}
      </div>
      <div className="card-list my-cards">
        {" "}
        {/* O jogador só entra nesse lado */}
        {/* Verifica se é o você o jogador. Caso não, os dados não podem ser passados no card */}
        {playersAreFighting.length > 1 && (playersAreFighting[1].name === userName) ?
          cardsOfPlayerII.map((card, i) => {
            return <CardToShow
                      moviment={card.cardName}
                      type={card.type}
                      show={true}
                      key={i}
                    />
          }) : (
            cardsOfPlayerII.map((card, i) => {
              return <CardToShow
                        key={i}
                      />
            })
          )}
      </div>
      <div className="player-name">
        <div className="unused-area"></div>
        <h5 className="bottom">
          {playersAreFighting.length > 1 && (playersAreFighting[1].name === userName ?
           (playersAreFighting[1].name + "(Você)") : (playersAreFighting[1].name))}
        </h5>
        <h6>
          {playersAreFighting.length > 1 &&
            `🏆 ${playersAreFighting[1].victories}  ☠️ ${playersAreFighting[1].loses}`}
        </h6>
      </div>
    </main>
  );
}
