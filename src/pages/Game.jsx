import { useEffect } from "react";
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";
import SocketContext from "../context/socketContext";
import startSocketService from "../services/SocketService";

export default function Game() {
  
  const socket = startSocketService()

  useEffect(() => {
    
    setTimeout(() => {
      socket.emit("attack","Atacando")
    }, 5000)
    
    socket.on("send",(msg)=>{
      console.log(msg)
    })

    return () => {
      // Executa quando o componente é desmontado
      socket.disconnect();
    };
  }, []);

  return (
    <div className="game-area">
      <SocketContext.Provider value={socket}>
        <AsidePlayers />
        <GameArena />
        <AsidePanel />
      </SocketContext.Provider>
    </div>
  );
}
