import { useState } from "react";
import { IcoLeftArrow, IcoRightArrow } from "./Icons";

import MainIcon from "../assets/images/main-icon.png"
import HP00 from "../assets/images/hp-00.png"
import HP01 from "../assets/images/hp-01.png"
import HP02 from "../assets/images/hp-02.png"
import HP03 from "../assets/images/hp-03.png"
import HP04 from "../assets/images/hp-04.png"
import HP05 from "../assets/images/hp-05.png"
import HP06 from "../assets/images/hp-06.png"
import HP08 from "../assets/images/hp-08.png"
import HP09 from "../assets/images/hp-09.png"
import HP10 from "../assets/images/hp-10.png"

export default function Help(props){

    const [count,setCount] = useState(0)

    return (
        <div className="help">
            {
                count < 0 && (
                    <button className="left-button" onClick={()=>{setCount(count+1)}}>
                        <IcoLeftArrow />
                    </button>
                )
            }
            {
                count > -9 && (
                    <button className="right-button" onClick={()=>{setCount(count-1)}}>
                        <IcoRightArrow />
                    </button>
                )
            }

            <div className="caroussel">
                <div className="frame-container" style={{left:`${count * 100}%`}}>
                    <section>
                        <p>seja bem-vindo ao The Kardz!</p>
                        <img src={MainIcon} />
                        <p>passe para o lado para conhecer as regras e aprender a jogar.</p>
                    </section>
                    <section>
                        <p>na tela inicial, você pode digitar um número de uma sala existente para entrar nela.</p>
                        <img src={HP00} className="eff" />
                        <p>caso não haja uma sala ou você não tenha o número de nenhuma, pode criar uma.</p>
                        <img src={HP01} className="eff" />
                    </section>
                    <section>
                        <p>Entrando em uma sala ou criando uma, agora você poderá escolher um nome de usuário.</p>
                        <img src={HP02} className="eff" />
                        <p>
                            Lembre-se que você não pode escolher um mesmo nome de outro jogador existente
                            nesta mesma sala caso esteja entrando em uma.
                        </p>
                    </section>
                    <section>
                        <p>Após a escolha do nome de usuário, você será direcionado para esta tela caso só haja você e mais um outro jogador.</p>
                        <img src={HP03} className="eff" width={"300px"} />
                        <p>Caso já hajam mais jogadores, provavelmente aparecerá uma mensagem de "carregando dados..."
                            que brevemente estarão disponíveis pra você.
                            Nos próximos slides, explicaremos o que são cada um desses elementos presentes na tela.
                        </p>
                    </section>
                    <section>
                        <img src={HP05} className="eff" />
                        <p>
                            Este é o relógio que indica o preparo de uma partida quando encontra-se
                            na cor verde. Possui um intervalo de 10 segundos para que ambos jogadores
                            se preparem porque a partida logo irá começar. as cartas nesse momento
                            econtram-se "viradas".
                        </p>
                        <img src={HP06} className="eff" />
                        <p>
                            Quando finalmente a partida começa, as cartas são "desvidaras" e o relógio
                            mudará para cor vermelha e terá um intervalo de apenas 5 segundos.
                            Esse é o tempo suficiente para que o jogador escolha umas das cartas
                            disponíveis.
                        </p>
                    </section>
                    <section>
                        <p>Essa é a sua configuração inicial de cartas quando começa uma partida.</p>
                        <img src={HP04} className="eff" width={"300px"} />
                        <p>Repare, também, que você consegue apenas visualizar as suas cartas. Já as do adversário, jamais!</p>
                        <p>No próximo slide será apresentado o que são e para que servem cada uma das cartas do jogo.</p>
                    </section>
                    <section>
                        <img src={HP08} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta comum de ataque:</span> é basicamente, como o próprio nome diz, a carta que
                            você usa para atacar seu adverśario. você incia o jogo com uma unidade e
                            consegue derrotar seu adversário se ele utilizar, numa mesma rodada, a carta
                            de recarga. Se o adverśario também usar uma carta de ataque comum, haverá um empate.
                        </p>
                        <br />
                        <img src={HP09} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta comum de defesa:</span> é a carta que te permite
                            se defender das cartas de ataque comum do adverśario. sua grande vantagem é a quantidade
                            infinita. existem cartas que são mais fortes que essa defesa. veremos nos pŕoximos slides.
                        </p>
                    </section>
                    <section>
                        Teste 8
                    </section>
                    <section>
                        Teste 9
                    </section>
                    <section>
                        Teste 10
                    </section>
                </div>
            </div>

            <input type="button" value="X" onClick={props.closeHelp} />

            <div className="count-display">
                {(count * -1) + 1} / 10
            </div>
        </div>
    )
}