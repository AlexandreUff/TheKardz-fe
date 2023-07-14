import { useContext, useEffect, useState } from "react"
import CardToShow from "./CardToShow"
import Timer from "./Timer"
import SocketContext from "../../context/socketContext"
import SessionService from "../../services/SessionService"

export default function GameArena(){

    const [moreThanOnePlayer, setMoreThanOnePlayer] = useState(false)
    const [playersToArena, setPlayersToArea] = useState([])

    const socket = useContext(SocketContext)

    const { userName, userId, hall} = SessionService.get("userDatas")

    useEffect(() => {
        socket.listen("start-fight", (data) => {
            console.log(data.players)
            
            const indice = data.players.indexOf(userId);

            if (indice !== -1 && indice !== 0) {
              const temp = data.players[0];
              data.players[0] = data.players[1];
              data.players[1] = temp;
            }
            
            setPlayersToArea([...data.players])
            setMoreThanOnePlayer(true) /* Talvez esse state não precise mais */
        })
    }, [socket, userId])

    return (
        <main className="game-arena">
            {/* <CardToShow /> */}
            <div className="player-name">
                <div className="unused-area">
                </div>
                <h5 className="top">
                    ADVERSÁRIO
                </h5>
                <h6>
                    {`🏆 ${"2"}  ☠️ ${"1"}`}
                </h6>
            </div>
            <div className="card-list">
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="table">
                {moreThanOnePlayer ? (
                <Timer time={15} type="match" />
                ) : (
                    <h3>Aguarde a entrada <br /> de mais jogadores.</h3>
                )}
                
                {/* Fazer a área de logs */}
            </div>
            <div className="card-list my-cards"> {/* O jogador só entra nesse lado */}
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="player-name">
                <div className="unused-area">
                </div>
                <h5 className="bottom">
                    VOCÊ
                </h5>
                <h6>
                    {`🏆 ${"3"} ☠️ ${"2"}`}
                </h6>
            </div>
        </main>
    )
}