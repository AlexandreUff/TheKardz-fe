import { useState } from "react";
import { IcoLeftArrow, IcoRightArrow } from "./Icons";

export default function Help(props){

    const [count,setCount] = useState(0)

    return (
        <div className="help">
            {
                count < 0 && (
                    <button className="left-button" onClick={()=>{setCount(count+1)}}>
                        <IcoLeftArrow />
                    </button>
                )
            }
            {
                count > -2 && (
                    <button className="right-button" onClick={()=>{setCount(count-1)}}>
                        <IcoRightArrow />
                    </button>
                )
            }

            <div className="caroussel">
                <div className="frame-container" style={{left:`${count * 100}%`}}>
                    <section>
                        Teste 1
                    </section>
                    <section>
                        Teste 2
                    </section>
                    <section>
                        Teste 3
                    </section>
                </div>
            </div>

            <input type="button" value="X" onClick={props.closeHelp} />

            <div className="count-display">
                {(count * -1) + 1} / 3
            </div>
        </div>
    )
}