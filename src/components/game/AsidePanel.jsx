import { useContext, useEffect, useState } from "react";
import { IcoLeftArrow, IcoRightArrow } from "../Icons";
import SocketContext from "../../context/socketContext";

export default function AsidePanel(props){

    const [arrowIcon, setArrowIcon] = useState(true);
    const [test,setTest] = useState("");

    const socket = useContext(SocketContext)

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
                    2831456
                    {test}
                </h3>
            </aside>
            <div className="show-panel" onClick={showAsidePanel}>
                {arrowIcon ? <IcoLeftArrow /> : <IcoRightArrow />}
            </div>
        </>
    )
}