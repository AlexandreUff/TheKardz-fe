import PlayersScore from "./PlayersScore";
import { Users } from "../../Utils/Mocks/Users";
import { IcoPlayer } from "../Icons";

export default function AsidePlayers(props){

    const ordenedUsers = Users.sort((first, second) => second.wins - first.wins)

    return (
        <>
            <aside className="aside-players" /* show="yes" */>
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
            <div className="show-players">
                <IcoPlayer />
            </div>
            <div className="number-of-players">
                {ordenedUsers.length}
            </div>
        </>
    )
}