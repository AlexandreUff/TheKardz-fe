import PlayersScore from "./PlayersScore";
import { Users } from "../../Utils/Mocks/Users";
import { IcoPlayer } from "../Icons";
import { useContext, useEffect } from "react";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";

export default function AsidePlayers(props){

    const ordenedUsers = Users.sort((first, second) => second.wins - first.wins)

    const socket = useContext(SocketContext)

    const showAsidePlayersBar = () => {
        const asidePlayers = document.querySelector(".aside-players")
        const numberOfPlayers = document.querySelector(".number-of-players")
        const showPlayers = document.querySelector(".show-players")
        asidePlayers.toggleAttribute("show")
        showPlayers.toggleAttribute("show")
        numberOfPlayers.toggleAttribute("show")
    }

    const { hall } = SessionService.get("userDatas")

    useEffect(()=>{
        socket.send("credential", hall)

        socket.listen("getUsers",(data)=>{
            console.log(data)
        })
    },[socket, hall])

    return (
        <>
            <aside className="aside-players">
                {ordenedUsers.map((user, i) => {
                    return (
                        <PlayersScore
                            name={user.name}
                            wins={user.wins}
                            loses={user.loses}
                            isFighting={user.fighting}
                            position={i+1}
                            key={i}
                        />
                    )
                })}
            </aside>
            <div className="show-players" onClick={showAsidePlayersBar}>
                <IcoPlayer />
            </div>
            <div className="number-of-players">
                {ordenedUsers.length}
            </div>
        </>
    )
}