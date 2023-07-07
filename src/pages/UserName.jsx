import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { useState } from "react";
import APIService from "../services/APIService";

export default function UserName() {

  const [userName, setUserName] = useState("")
  const [warning, setWarning] = useState("")

  const { act } = useParams()

  const onChangeUserName = (e) => {
    setUserName(e.target.value)
    setWarning("")
  }

  const sendDatas = async (e) => {
    e.preventDefault()

    let response

    if(act === "crt"){
      console.log("nome",userName)
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
      console.log("Deu certo")
    } else {
      setWarning(response.message)
    }

    console.log(response)
  }

  return (
    <>
      <Header />
      <Main>
        {act === "crt" ? <h2>Sua sala já será criada!</h2> : <h2>A sala {act} aguarda sua entrada.</h2>}
        <form>
          <label htmlFor="name">Agora digite abaixo seu nome de usuário:</label>
          <input type="text" id="name" value={userName} onChange={e => onChangeUserName(e)} />
          {warning && <p className="warning">
            {warning}
          </p>}
          <input type="submit" value="CRIAR" title="Criar nome de usuário" onClick={sendDatas} />
        </form>
      </Main>
      <Footer />
    </>
  );
}
