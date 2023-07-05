import { io } from "socket.io-client";

export default class SocketService {

    static socket/*  = io("http://localhost:3002", { transports: ['websocket'] }); */

    static startSocketService(){
        this.socket = io("http://localhost:3002", { transports: ['websocket'] });

        this.socket.on("connect", () => {
          console.log("Conexão estabelecida com o servidor socket.io.");

          // Adicione aqui o código para lidar com os eventos de socket.io
        });

        this.socket.on("disconnect", () => {
          console.log("Desconectado do servidor socket.io.");
        });

        return this.socket
    }

    static send(title, message){
        this.socket.emit(title, message)
    }

    static listen(title, operation){
        this.socket.on(title, operation)
    }

    static disconnect(){
        this.socket.disconnect()
    }
    
}