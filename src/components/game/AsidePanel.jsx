import { useState } from "react";
import { IcoLeftArrow, IcoRightArrow } from "../Icons";

export default function AsidePanel(props){

    const [arrowIcon, setArrowIcon] = useState(true);

    const showAsidePanel = () => {
        const asidePanel = document.querySelector(".aside-panel")
        const showPanel = document.querySelector(".show-panel")
        asidePanel.toggleAttribute("show")
        showPanel.toggleAttribute("show")

        setArrowIcon(!arrowIcon)
    }

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