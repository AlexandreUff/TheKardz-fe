import PlayersScore from "./PlayersScore";
import { IcoPlayer } from "../Icons";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../context/socketContext";

export default function AsidePlayers(props){

    const [users, setUsers] = useState([])

    const socket = useContext(SocketContext)

    const showAsidePlayersBar = () => {
        const asidePlayers = document.querySelector(".aside-players")
        const numberOfPlayers = document.querySelector(".number-of-players")
        const showPlayers = document.querySelector(".show-players")
        asidePlayers.toggleAttribute("show")
        showPlayers.toggleAttribute("show")
        numberOfPlayers.toggleAttribute("show")
    }

    useEffect(()=>{

        socket.listen("getUsers",(users)=>{
            const ordenedUsers = users.sort((first, second) => second.victories - first.victories)
            setUsers(ordenedUsers)
        })
    },[socket])

    return (
        <>
            <aside className="aside-players">
                {users.map((user, i) => {
                    return (
                        <PlayersScore
                            name={user.name}
                            victories={user.victories}
                            loses={user.loses}
                            isFighting={user.lineNumber === 0 || user.lineNumber === 1}
                            position={i+1}
                            isYourName={props.isYourName}
                            key={i}
                        />
                    )
                })}
            </aside>
            <div className="show-players" onClick={showAsidePlayersBar}>
                <IcoPlayer />
            </div>
            <div className="number-of-players">
                {users.length}
            </div>
        </>
    )
}