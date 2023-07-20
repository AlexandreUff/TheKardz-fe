import { IcoDiamondCard } from "../Icons";
import ReadableMovementsNames from "../../Utils/ReadableMovementsNames"

export default function CardEmpty(props){

    function takeMovimentInfo(moviment){
        if(moviment === 'defense1' || moviment === "defense2" || moviment === "defense3"){
            return "🛡"
        }

        if(moviment === 'attack1'){
            return "🗡"
        }

        if(moviment === 'attack2' || moviment === 'attack3'){
            return "⚔️"
        }
        if(moviment === 'recharging1' || moviment === 'recharging2' || moviment === 'recharging3'){
            return "➕"
        }
    }

    const titleCompleted = props.show ? ReadableMovementsNames(props.moviment, props.type) : ""

    return (
    <div className={`card-game ${props.show && "turn"}`} title={titleCompleted} onClick={() => props.show && props.chooseMov()}>
        {props.amount > 1 && (
            <div className={`show-amount ${props.amount === Infinity && "is-infinity"}`}>
                {props.amount === Infinity ? "∞" : props.amount}
            </div>)
        }
        <div className="backface">
            <div>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
                <IcoDiamondCard/><IcoDiamondCard/><IcoDiamondCard/>
            </div>
        </div>
        <div className="frontface" type={props.type}>
            <div>
                {/* Condicional para caso receba alguma informação de movimento SE FOR PLAYER */}
                {true && takeMovimentInfo(props.moviment)}
            </div>
        </div>
    </div>
    )
}