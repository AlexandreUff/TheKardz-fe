import { IcoDiamondCard } from "../Icons";
import ReadableMovementsNames from "../../Utils/ReadableMovementsNames"

export default function CardEmpty(props){

    function takeMovimentInfo(moviment, type){
        if(moviment === 'defense' || moviment === "defense" || moviment === "defense"){
            return "🛡"
        }

        if(moviment === 'attack' && type === 1){
            return "🗡"
        } else if (moviment === 'attack' && type >= 2){
            return "⚔️"
        }

        /* if(moviment === 'attack' || moviment === 'attack'){
            return "⚔️"
        } */
        
        if(moviment === 'recharging' || moviment === 'recharging' || moviment === 'recharging'){
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
        <div className="frontface" type={`${props.type}`}>
            <div>
                {/* Condicional para caso receba alguma informação de movimento SE FOR PLAYER */}
                {true && takeMovimentInfo(props.moviment, props.type)}
            </div>
        </div>
    </div>
    )
}