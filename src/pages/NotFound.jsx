import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IcoNotFound } from "../components/Icons";
import Main from "../components/Main";

export default function UserName() {
  return (
    <>
      <Header />
      <Main>
        <h2>Ops! Página não encontrada.</h2>
        <div className="not-found-ico">
          <IcoNotFound/>
        </div>

        <Link to="/">Voltar</Link>
      </Main>
      {/* <Footer /> */}
    </>
  );
}
