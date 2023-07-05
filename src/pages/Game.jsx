import { useEffect } from "react";
/* import io from "socket.io-client"; */
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";
import SocketContext from "../context/socketContext";
import startSocketService from "../services/SocketService";

export default function Game() {
  
  const socket = startSocketService()

  useEffect(() => {
    /* socket.on("connect", () => {
      console.log("Conexão estabelecida com o servidor socket.io.");

      // Adicione aqui o código para lidar com os eventos de socket.io
    }); */

    setTimeout(()=>socket.emit("attack","Atacando"),5000)
    
    socket.on("send",(msg)=>{
      console.log(msg)
    })

    /* socket.on("disconnect", () => {
      console.log("Desconectado do servidor socket.io.");
    }); */

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
