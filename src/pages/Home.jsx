import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import APIService from "../services/APIService";
import { useState } from "react";

export default function Home() {

  const [hallNumber,setHallNumber] = useState("")
  const [warning,setWarning] = useState("")

  const navigate = useNavigate()

  const onChangeUserName = (e) => {
    setHallNumber(e.target.value)
    setWarning("")
  }

  const takeHallNumber = async (e) => {
    e.preventDefault()
    const response = await APIService.get(`/hall?number=${hallNumber}`)
    
    if(response.status){
      navigate(`/username/${response.data}`)
    } else {
      setWarning(response.message)
    }
  }

  return (
    <>
      <Header />
      <Main>
        <form>
          <label htmlFor="hall">Digite abaixo o número da sala:</label>
          <input type="text" id="hall" value={hallNumber} onChange={e => onChangeUserName(e)} />
          {warning && <p className="warning">
            {warning}
          </p>}
          <input type="submit" value="ENTRAR" title="Entrar na sala" onClick={takeHallNumber} />
        </form>
        <div>
          <Link to="/username/crt">Ou crie uma sala</Link>
        </div>
      </Main>
      <Footer />
    </>
  );
}
