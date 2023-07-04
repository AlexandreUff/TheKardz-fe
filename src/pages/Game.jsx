import { useEffect } from "react";
import io from "socket.io-client";
import AsidePanel from "../components/game/AsidePanel";
import AsidePlayers from "../components/game/AsidePlayers";
import GameArena from "../components/game/GameArena";

export default function Game() {
  
  useEffect(() => {
    console.log("TESTE")
    const socket = io("http://localhost:3002", { transports: ['websocket'] });

    socket.on("connect", () => {
      console.log("Conexão estabelecida com o servidor socket.io.");

      // Adicione aqui o código para lidar com os eventos de socket.io
    });

    setTimeout(()=>socket.emit("attack","Atacando"),5000)
    
    socket.on("send",(msg)=>{
      console.log(msg)
    })

    socket.on("disconnect", () => {
      console.log("Desconectado do servidor socket.io.");
    });

    return () => {
      // Executa quando o componente é desmontado
      socket.disconnect();
    };
  }, []);

  return (
    <div className="game-area">
      <AsidePlayers />
      <GameArena />
      <AsidePanel />
    </div>
  );
}
