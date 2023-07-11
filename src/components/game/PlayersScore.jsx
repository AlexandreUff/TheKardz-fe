import { IcoPlayer } from "../Icons";

export default function PlayersScore(props){
    return (
        <div className="players-score-scope" title={props.name}>
            <IcoPlayer />
            <div className="score">
                <div>
                    {`🏆 ${props.victories}`}
                </div>
                <div>
                    {`☠️ ${props.loses}`}
                </div>
            </div>
            <h4>
                {props.name}
            </h4>
            <div className="position">
                {`#${props.position}`}
            </div>
            {props.isFighting && (
                <div className="isFighting">
                    ⚔️
                </div>
            )
            }
           
        </div>
    )
}