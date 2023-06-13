import CardToShow from "./CardToShow"

export default function GameArena(){
    return (
        <main className="game-arena">
            {/* <CardToShow /> */}
            <div className="player-name">
                ENEMY
            </div>
            <div className="card-list">
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="table">
                <CardToShow />
            </div>
            <div className="card-list my-cards"> {/* O jogador só entra nesse lado */}
                <CardToShow />
                <CardToShow />
                <CardToShow />
            </div>
            <div className="player-name">
                VOSSÊ
            </div>
        </main>
    )
}