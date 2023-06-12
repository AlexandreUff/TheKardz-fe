import { IcoPlayer } from "../Icons";
import { Users } from "../../Utils/Mocks/Users"

export default function PlayersScore(props){

    const players = Users
    console.log(players)

    return (
        <div className="players-score-scope">
            <IcoPlayer />
            <div className="score">
                <div>
                    {`🏆 ${props.wins}`}
                </div>
                <div>
                    {`☠️ ${props.loses}`}
                </div>
            </div>
            <h4>
                {props.name}
            </h4>
        </div>
    )
}