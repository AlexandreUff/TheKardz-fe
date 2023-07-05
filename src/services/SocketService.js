import { io } from "socket.io-client";

export default function startSocketService(){

    const socket = io("http://localhost:3002", { transports: ['websocket'] });

    socket.on("connect", () => {
      console.log("Conexão estabelecida com o servidor socket.io.");

      // Adicione aqui o código para lidar com os eventos de socket.io
    });

    socket.on("disconnect", () => {
      console.log("Desconectado do servidor socket.io.");
    });

    return socket
}