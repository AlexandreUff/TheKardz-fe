import { Link } from "react-router-dom";

export default function Main(){
    return <>
        <main>
            <form>
                <label htmlFor="name">
                    Digite o nome da sala:
                </label>
                <input type="text" id="name" />
                <input type="submit" value="ENTRAR" title="Criar sala" />
            </form>
            <div>
                <Link to="/username">Ou crie uma sala</Link>
            </div>
        </main>
    </>
}