import { useEffect, useState } from "react";
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";
import SocketContext from "../context/socketContext";
import SocketService from "../services/SocketService";
import SessionService from "../services/SessionService";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const socket = SocketService
  socket.startSocketService()
  
  const navigate = useNavigate()

  
  const {userName, userId, hall} = SessionService.get("userDatas")
  
  socket.listen("redirect-nonexistent-user", ()=>{
    navigate("/nonuser")
  })

  useEffect(() => {
    socket.send("credential", {userName, userId, hall})

    return () => {
      // Executa quando o componente é desmontado
      socket.disconnect();
    };
  }, []);

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
