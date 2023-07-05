import { useContext, useEffect, useState } from "react";
import { IcoLeftArrow, IcoRightArrow } from "../Icons";
import SocketContext from "../../context/socketContext";

export default function AsidePanel(props){

    const [arrowIcon, setArrowIcon] = useState(true);

    const socket = useContext(SocketContext)
    console.log("SOQUÉTE:", socket)

    const showAsidePanel = () => {
        const asidePanel = document.querySelector(".aside-panel")
        const showPanel = document.querySelector(".show-panel")
        asidePanel.toggleAttribute("show")
        showPanel.toggleAttribute("show")

        setArrowIcon(!arrowIcon)
    }

    useEffect(()=>{
        setTimeout(()=>{
            socket.emit("attack", "Context funcionando com sucesso.")
        },15000)
    },[])

    return (
        <>
            <aside className="aside-panel">
                <h4>
                    Nº DA SALA:
                </h4>
                <h3>
                    2831456
                </h3>
            </aside>
            <div className="show-panel" onClick={showAsidePanel}>
                {arrowIcon ? <IcoLeftArrow /> : <IcoRightArrow />}
            </div>
        </>
    )
}