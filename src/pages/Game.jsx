import { useEffect, useState } from "react";
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";
import SocketContext from "../context/socketContext";
import SocketService from "../services/SocketService";
import SessionService from "../services/SessionService";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
/* import APIService from "../services/APIService"; */

export default function Game() {
  
  const socket = SocketService
  const navigate = useNavigate()

  
  const {userName, userId, hall} = SessionService.get("userDatas")
  
  const isCredentialRead = SessionService.get("credential-read")
  
  if(!isCredentialRead){
    socket.startSocketService()
  } /* else {
    console.log("usuário inexistente")
    navigate("/nonuser")
  }
 */
  SessionService.save("credential-read", true)
  
  /* socket.listen("redirect-nonexistent-user", ()=>{
    navigate("/nonuser")
  }) */

  useEffect(() => {
    if(!isCredentialRead){
      socket.send("credential", {userName, userId, hall})
      console.log("credencial agora",isCredentialRead)
    } else {
      console.log("usuário inexistente")
      SessionService.remove("credential-read")
      navigate("/nonuser")
    }

    return () => {
      // Executa quando o componente é desmontado
      if(!isCredentialRead){
        socket.disconnect();
      }
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
