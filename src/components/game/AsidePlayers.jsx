import PlayersScore from "./PlayersScore";
import { Users } from "../../Utils/Mocks/Users";

export default function AsidePlayers(props){
    return (
        <aside className="aside-players">
            {Users.map((user, i) => {
                return (
                    <PlayersScore
                        name={user.name}
                        wins={user.wins}
                        loses={user.loses}
                        isFighting={user.fighting}
                        key={i}
                    />
                )
            })}
        </aside>
    )
}