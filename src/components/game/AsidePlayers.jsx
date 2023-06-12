import PlayersScore from "./PlayersScore";
import { Users } from "../../Utils/Mocks/Users";

export default function AsidePlayers(props){

    const ordenedUsers = Users.sort((first, second) => second.wins - first.wins)

    return (
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
    )
}