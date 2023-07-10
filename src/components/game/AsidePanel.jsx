import { useContext, useEffect, useState } from "react";
import { IcoLeftArrow, IcoRightArrow, IcoSendMsg } from "../Icons";
import SocketContext from "../../context/socketContext";
import SessionService from "../../services/SessionService";

export default function AsidePanel(props){

    const [arrowIcon, setArrowIcon] = useState(true);
    const [test,setTest] = useState("");

    const socket = useContext(SocketContext)

    const { userId, hall} = SessionService.get("userDatas")
    console.log(userId, hall)

    const showAsidePanel = () => {
        const asidePanel = document.querySelector(".aside-panel")
        const showPanel = document.querySelector(".show-panel")
        asidePanel.toggleAttribute("show")
        showPanel.toggleAttribute("show")

        setArrowIcon(!arrowIcon)
    }

    useEffect(()=>{
        socket.listen("send",(msg)=>{
            console.log(msg,"ASIDE")
            setTest(msg.msg)
        })

        setTimeout(()=>{
            socket.send("attack", "Context funcionando com sucesso.")
        },15000)
    },[socket])

    return (
        <>
            <aside className="aside-panel">
                <h4>
                    Nº DA SALA:
                </h4>
                <h3>
                    {hall}
                    {test}
                </h3>
                <div className="report-area">
                    
                </div>
                <div className="message-container">
                    <textarea name="message-area" id="msg-area" cols="3" rows="5" placeholder="Digite aqui sua mensagem.">

                    </textarea>
                    <button title="Enviar">
                        <IcoSendMsg />
                    </button>
                </div>
            </aside>
            <div className="show-panel" onClick={showAsidePanel}>
                {arrowIcon ? <IcoLeftArrow /> : <IcoRightArrow />}
            </div>
        </>
    )
}