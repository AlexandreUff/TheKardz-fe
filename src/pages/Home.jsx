import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <form>
          <label htmlFor="name">Digite abaixo o número da sala:</label>
          <input type="text" id="name" />
          <input type="submit" value="ENTRAR" title="Criar sala" />
        </form>
        <div>
          <Link to="/username">Ou crie uma sala</Link>
        </div>
      </Main>
      <Footer />
    </>
  );
}
