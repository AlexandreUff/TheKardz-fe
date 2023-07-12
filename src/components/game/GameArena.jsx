import { useState } from "react"
import CardToShow from "./CardToShow"
import Timer from "./Timer"

export default function GameArena(){

    const [moreThanOnePlayer, setMoreThanOnePlayer] = useState(false)

    return (
        <main className="game-arena">
            {/* <CardToShow /> */}
            <div className="player-name">
                <div className="unused-area">
                </div>
                <h5 className="top">
                    ADVERSÁRIO
                </h5>
                <h6>
                    {`🏆 ${"2"}  ☠️ ${"1"}`}
                </h6>
            </div>
            <div className="card-list">
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="table">
                {moreThanOnePlayer ? (
                <Timer time={15} type="match" />
                ) : (
                    <h3>Aguarde a entrada <br /> de mais jogadores.</h3>
                )}
                
                {/* Fazer a área de logs */}
            </div>
            <div className="card-list my-cards"> {/* O jogador só entra nesse lado */}
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="player-name">
                <div className="unused-area">
                </div>
                <h5 className="bottom">
                    VOCÊ
                </h5>
                <h6>
                    {`🏆 ${"3"} ☠️ ${"2"}`}
                </h6>
            </div>
        </main>
    )
}