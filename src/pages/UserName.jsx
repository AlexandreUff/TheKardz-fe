import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function UserName() {

  const { act } = useParams()

  return (
    <>
      <Header />
      <Main>
        {act === "crt" ? <h2>Sua sala já será criada!</h2> : <h2>A sala {act} aguarda sua entrada.</h2>}
        <form>
          <label htmlFor="name">Agora digite abaixo seu nome de usuário:</label>
          <input type="text" id="name" />
          <input type="submit" value="CRIAR" title="Criar nome de usuário" />
        </form>
      </Main>
      <Footer />
    </>
  );
}
