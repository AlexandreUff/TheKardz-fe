import { useState } from "react"
import { IcoCheckLG } from "./Icons"

export default function PainelButton(props){

    const [confirm,setConfirm] = useState(false)

    const actionByClick = () => {
        navigator.clipboard.writeText(props.dataToCopy)
        setConfirm(true)

        setTimeout(()=>{
            setConfirm(false)
        },2000)
    }

    return (
        <button className="btn-aside" title={confirm ? "Copiado" : props.title} onClick={actionByClick}>
            {confirm ? <IcoCheckLG /> : props.ico}
        </button>
    )
}