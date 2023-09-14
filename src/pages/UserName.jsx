import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { useState } from "react";
import APIService from "../services/APIService";
import SessionService from "../services/SessionService";
import Button from "../components/Button";
import Help from "../components/Help";

export default function UserName() {

  const [userName, setUserName] = useState("")
  const [warning, setWarning] = useState("")
  const [loading, setLoading] = useState(false)

  const [showHelp, setShowHelp] = useState(false)

  const { act } = useParams()

  const navigate = useNavigate()

  const saveUserGameData = (userName, hall, userId) => {
      SessionService.save("userDatas", {userName, userId, hall})
  }

  const onChangeUserName = (e) => {
    if(e.target.value.length <= 12) {
      setUserName(e.target.value)
      setWarning("")
    } else {
      setWarning("O nome não pode exceder mais que 12 caracteres")
    }
  }

  const sendDatas = async (e) => {
    e.preventDefault()

    let response

    setLoading(true)

    if(act === "crt"){
      response = await APIService.post('/hall/create',{
        userName: userName,
      })
    } else {
      response = await APIService.post('/user/create',{
        name: userName,
        hall: act,
      })
    }

    if(response.status){
      act === "crt" ? (
          saveUserGameData(userName, response.data.hall, response.data.userId)
        ) : (
          saveUserGameData(userName, act, response.data.userId)
        )
      
      navigate("/game")
      
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
        {act === "crt" ? <h2>Sua sala já será criada!</h2> : <h2>A sala {act} aguarda sua entrada.</h2>}
        <form>
          <label htmlFor="name">Agora digite abaixo seu nome de usuário:</label>
          <input type="text" id="name" value={userName} onChange={e => onChangeUserName(e)} />
          {warning && <p className="warning">
            {warning}
          </p>}
          <Button value="CRIAR" loading={loading} title="Criar nome de usuário" eventClick={sendDatas} />
        </form>
      </Main>
      <Footer helpStatus={showHelp} isToShowHelp={setShowHelp} />
    </>
  );
}
