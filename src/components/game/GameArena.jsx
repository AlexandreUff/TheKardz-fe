import { useContext, useEffect, useState } from "react"
import CardToShow from "./CardToShow"
import Timer from "./Timer"
import SocketContext from "../../context/socketContext"
import SessionService from "../../services/SessionService"

export default function GameArena(){

    const [stageMatch, setStageMatch] = useState("stand-by")
    const [playersAreFighting, setPlayersAreFighting] = useState([
        {
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
        }
    ])

    const socket = useContext(SocketContext)

    const { userName, userId, hall} = SessionService.get("userDatas")

    useEffect(() => {
        socket.listen("start-fight", (data) => {
            /* const onlyUsersId = [data.players[0]._id, data.players[1]._id]
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
            setPlayersToArea([...data.players]) */
            setStageMatch("start-fight")
        })

        socket.listen("getUsers", (users) => {

            const playersFighting = users.filter(user => {
                return user.lineNumber === 0 || user.lineNumber === 1
                })
            
            if(playersFighting){
                setPlayersAreFighting([...playersFighting])
            }
            
        })
    }, [playersAreFighting, socket])

    return (
        <main className="game-arena">
            {/* <CardToShow /> */}
            <div className="player-name">
                <div className="unused-area">
                </div>
                <h5 className="top">
                    {/* {playersToArena[0].name} */}
                </h5>
                <h6>
                    {/* {`🏆 ${playersToArena[0].victories}  ☠️ ${playersToArena[0].loses}`} */}
                </h6>
            </div>
            <div className="card-list">
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="table">
                {stageMatch === "start-fight" && <Timer time={10} type="match" action={()=>{
                    socket.send("starting-round")
                }} />}
                {stageMatch === "start-round" && <Timer time={5} />}
                {stageMatch === "stand-by" && (
                    playersAreFighting.length > 1 ?
                    <h3>Obtendo dados da partida...</h3> : <h3>Aguarde a entrada <br /> de mais jogadores.</h3>
                )}
                {/* {(
                    playersAreFighting.length > 1 ?
                    <h3>Obtendo dados da partida...</h3> : <h3>Aguarde a entrada <br /> de mais jogadores.</h3>
                )} */}
                
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
                    {/* {playersToArena[1].name} */}
                </h5>
                <h6>
                    {/* {`🏆 ${playersToArena[1].victories}  ☠️ ${playersToArena[1].loses}`} */}
                </h6>
            </div>
        </main>
    )
}