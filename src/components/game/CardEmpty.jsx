import { IcoDiamondCard } from "../Icons";

export default function CardEmpty(props){

    function takeEmoji(moviment){
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

    return (
    <div className="card-game">
        <div className="backface">
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
        {/* <div className="frontface">
            {takeEmoji('recharging3')}
        </div> */}
    </div>
    )
}