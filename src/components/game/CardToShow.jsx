import { IcoDiamondCard } from "../Icons";

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

    return (
    <div className="card-game"> {/* Faça um toggle para add essa classe turn */}
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
        <div className="frontface" /* type="gold" */>
            <div>
                {/* Condicional para caso receba alguma informação de movimento SE FOR PLAYER */}
                {true && takeMovimentInfo('attack2')}
            </div>
        </div>
    </div>
    )
}