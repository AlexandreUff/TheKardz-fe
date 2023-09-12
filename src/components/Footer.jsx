import { Link } from "react-router-dom";
import { IcoGHBs, IcoLIn, IcoPDF } from "./Icons";

export default function Footer(props){
    return <>
        <footer>
            <nav>
                <ul>
                    <li>
                        <a href="https://github.com/AlexandreUff" title="Acesso ao GitHub de Alexandre Magno" target="blank" >
                            <IcoGHBs/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/alexandre-magno-dias-pinto-3659b5225/" title="Acesso ao LinkedIn de Alexandre Magno" target="blank" >
                            <IcoLIn/>
                        </a>
                    </li>
                    <li>
                        <a href="https://drive.google.com/file/d/1VY_KJL4z3YhXYYhJx04lPM3FpGPX3Uot/view?usp=share_link" title="Acesso ao currículo de Alexandre Magno" target="blank" >
                            <IcoPDF/>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="how-to-play">
                <Link title="Clique aqui para saber como se joga.">
                    <h3 onClick={() => {props.isToShowHelp(!props.helpStatus)}}>COMO JOGAR!</h3>
                </Link>
            </div>
            <div>
                <small>
                &copy; 2023 - Alexandre Magno Dias<br />
                alexandre_magno@id.uff.br
                </small>
            </div>
        </footer>
    </>
}