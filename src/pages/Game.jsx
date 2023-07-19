import { useEffect } from "react";
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";
import SocketContext from "../context/socketContext";
import SocketService from "../services/SocketService";
import SessionService from "../services/SessionService";
/* import APIService from "../services/APIService"; */

export default function Game() {
  
  const socket = SocketService
  socket.startSocketService()

  const {userName, userId, hall} = SessionService.get("userDatas")

  useEffect(() => {
    socket.send("credential", {userName, userId, hall})

    return () => {
      // Executa quando o componente é desmontado
      socket.disconnect();
    };
  }, [socket, userName, userId, hall]);

  return (
    <div className="game-area">
      <SocketContext.Provider value={socket}>
        <AsidePlayers isYourName={userName} />
        <GameArena />
        <AsidePanel />
      </SocketContext.Provider>
    </div>
  );
}
