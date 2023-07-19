import { useContext, useEffect, useState } from "react";
import CardToShow from "./CardToShow";
import Timer from "./Timer";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";

export default function GameArena() {
  const [stageMatch, setStageMatch] = useState("stand-by");
  const [playersAreFighting, setPlayersAreFighting] = useState([
    /* {
            name: "-",
            victories: 0,
            loses: 0,
            userId: "",
        },
        {
            name: "-",
            victories: 0,
            loses: 0,
            userId: "",
        } */
  ]);

  const socket = useContext(SocketContext);

  const { userName, userId, hall } = SessionService.get("userDatas");

  useEffect(() => {
    /* socket.listen("start-fight", (data) => {
            const onlyUsersId = [data.players[0]._id, data.players[1]._id]
            const index = onlyUsersId.indexOf(userId);
            console.log("IDs",data.players)
            console.log("user:",userId)
            console.log("Index", index)

            if (index !== -1 && index !== 0) {
              const temp = data.players[0];
              data.players[0] = data.players[1];
              data.players[1] = temp;
            }
            
            console.log(data.players)
            setPlayersToArea([...data.players])
            setStageMatch("start-fight")
            console.log("Chegou aqui")
        }) */

    /* socket.listen("start-round", () => {
            setStageMatch("start-round")
        }) */

    socket.listen("fight-status", (status) => {
      /*
             if(status === "end-fight"){
            } */
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
        <CardToShow />
        <CardToShow />
        <CardToShow />
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
        <CardToShow />
        <CardToShow />
        <CardToShow />
      </div>
      <div className="player-name">
        <div className="unused-area"></div>
        <h5 className="bottom">
          {playersAreFighting.length > 1 && playersAreFighting[1].name}
        </h5>
        <h6>
          {playersAreFighting.length > 1 &&
            `🏆 ${playersAreFighting[1].victories}  ☠️ ${playersAreFighting[1].loses}`}
        </h6>
      </div>
    </main>
  );
}
