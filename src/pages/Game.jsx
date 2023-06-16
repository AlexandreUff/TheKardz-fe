import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";

export default function Game(){
    return (
        <div className="game-area">
            <AsidePlayers/>
            <GameArena/>
            <AsidePanel/>
        </div>
    )
}