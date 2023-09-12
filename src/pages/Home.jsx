import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import APIService from "../services/APIService";
import { useState } from "react";
import Button from "../components/Button";
import Help from "../components/Help";

export default function Home() {

  const [hallNumber,setHallNumber] = useState("")
  const [warning,setWarning] = useState("")
  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const navigate = useNavigate()

  const onChangeUserName = (e) => {
    setHallNumber(e.target.value)
    setWarning("")
  }

  const takeHallNumber = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await APIService.get(`/hall?number=${hallNumber}`)
    
    if(response.status){
      navigate(`/username/${response.data}`)
    } else {
      setLoading(false)
      setWarning(response.message)
    }
  }

  return (
    <>
      {
        showHelp && <Help closeHelp={()=>{setShowHelp(false)}} />
      }
      <Header />
      <Main>
        <form>
          <label htmlFor="hall">Digite abaixo o número da sala:</label>
          <input type="text" id="hall" value={hallNumber} onChange={e => onChangeUserName(e)} />
          {warning && <p className="warning">
            {warning}
          </p>}
          <Button value="ENTRAR" loading={loading} title="Entrar na sala" eventClick={takeHallNumber} />
        </form>
        <div>
          <Link to="/username/crt" title="Criar uma sala">Ou crie uma sala</Link>
        </div>
      </Main>
      <Footer helpStatus={showHelp} isToShowHelp={setShowHelp} />
    </>
  );
}
