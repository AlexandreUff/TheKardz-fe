import { IcoPlayer } from "../Icons";

export default function PlayersScore(props){
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
            {props.isFighting && (
                <div className="isFighting">
                    ⚔️
                </div>
            )
            }
           
        </div>
    )
}