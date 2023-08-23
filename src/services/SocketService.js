import { io } from "socket.io-client";

export default class SocketService {

    static socket

    static startSocketService(){
        this.socket = io(/* "http://localhost:3002" */ "https://the-kardz-be.vercel.app", { transports: ['websocket'] });

        this.socket.on("connect", () => {
          console.log("Conexão estabelecida com o servidor socket.io.");
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