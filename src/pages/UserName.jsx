import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function UserName() {
  return (
    <>
      <Header />
      <Main>
        <h2>A sala {"xxx"} aguarda sua entrada.</h2>
        <h2>Sua sala já foi criada!</h2>
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
