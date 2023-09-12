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
import HP11 from "../assets/images/hp-11.png"
import HP12 from "../assets/images/hp-12.png"
import HP13 from "../assets/images/hp-13.png"
import HP14 from "../assets/images/hp-14.png"
import HP15 from "../assets/images/hp-15.png"
import HP16 from "../assets/images/hp-16.png"
import HP17 from "../assets/images/hp-17.png"
import HP18 from "../assets/images/hp-18.png"
import HP19 from "../assets/images/hp-19.png"

export default function Help(props){

    const [count,setCount] = useState(0)

    const specialDisplay = {
        display:"grid",
        gridTemplateColumns:"10% 90%",
        gridTemplateRows:"repeat(3, 33.33%)"
    }

    return (
        <div className="help">
            {
                count < 0 && (
                    <button title="Voltar" className="left-button" onClick={()=>{setCount(count+1)}}>
                        <IcoLeftArrow />
                    </button>
                )
            }
            {
                count > -14 && (
                    <button title="Avançar" className="right-button" onClick={()=>{setCount(count-1)}}>
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
                        <p>
                            <span className="emphasis">The Kardz</span> é um jogo de cartas que roda no navegador com
                            disputas em turnos onde os jogadores recebem um conjunto de cartas pré-definidas e se
                            confrontam em uma mesma sala que você pode jogar tanto em seu desktop quanto em seu
                            dispositivo mobile.
                        </p>
                        <p>
                            Existem várias cartas de vários tipos e cada uma delas possuem uma função específica.
                            confira nos próximos slides o passo-a-passo para criar uma sala ou entrar em uma e 
                            entender o funcionamento do jogo.
                        </p>
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
                        <p>
                            Se você criou uma sala, a tela será exibida dessa forma:
                        </p>
                        <img src={HP17} className="eff" width={"400px"} />
                        <p>
                            Nesse momento, você copia o número de sala que aparece no canto superior direito e 
                            envia para outras pessoas para que elas possam entrar em sua sala e jogarem com você.
                        </p>
                    </section>
                    <section>
                        <p>Se você optou por entrar em uma sala, você será direcionado para esta tela caso só haja você e mais um outro jogador.</p>
                        <img src={HP03} className="eff" width={"300px"} />
                        <p>Caso já hajam mais jogadores, provavelmente aparecerá uma mensagem de "carregando dados..."
                            que brevemente estarão disponíveis pra você.
                            Nos próximos slides, explicaremos o que são cada um desses elementos presentes na tela.
                        </p>
                    </section>
                    <section>
                        <p>Essa é a sua configuração inicial de cartas quando começa uma partida.</p>
                        <img src={HP04} className="eff" width={"300px"} />
                        <p>Repare, também, que você consegue apenas visualizar as suas cartas. Já as do adversário, jamais!</p>
                        <p>
                            Sempre que você estiver jogando uma partida, suas cartas aparecerão <span className="emphasis">sempre</span> na
                            parte inferior da tela.
                        </p>
                        <p>No próximo slide será apresentado o que são e para que servem cada uma das cartas do jogo.</p>
                    </section>
                    <section style={specialDisplay}>
                        <img src={HP08} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta comum de ataque:</span> é basicamente, como o próprio nome diz, a carta que
                            você usa para atacar seu adverśario. você incia o jogo com uma unidade e
                            consegue derrotar seu adversário se ele utilizar, numa mesma rodada, a carta
                            de recarga. Se o adverśario também usar uma carta de ataque comum, haverá um empate.
                            é possível obter várias unidades dessa carta e nos próximos slides você saberá como.
                        </p>

                        <img src={HP09} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta comum de defesa:</span> é a carta que te permite
                            se defender das cartas de ataque comum do adverśario. sua grande vantagem é a quantidade
                            infinita. existem cartas que são mais fortes que essa defesa, mas isso veremos nos pŕoximos slides.
                        </p>
                        <img src={HP10} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta comum de recarga:</span> esta é uma carta  que também 
                            possui quantidade infinita e lhe permite adquirir uma unidade de carta de ataque comum
                            ao ser usada em uma rodada. o grande perigo desta carta é que ela lhe torna vulnerável
                            caso o adversário utilize uma carta de ataque.
                        </p>
                    </section>
                    <section style={specialDisplay}>
                        <img src={HP11} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta bronze de ataque (bonus):</span> esta é uma carta de ataque que lhe
                            garante qubrar a defesa e o ataque do adversário no caso dele utilizar as do tipo comum. mas se
                            você e o adversário utilizarem, ao mesmo tempo, carta de ataque bronze, o efeito em ambos
                            é nulo e, logo, será empate. para adquirir esta carta, basta que utilize quaisquer cartas
                            de ataque por duas vezes seguidas. só é possível adquirir apenas uma unidade deste tipo.
                        </p>
                        <img src={HP12} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta bronze de defesa (bonus):</span> esta carta lhe garante se defender
                            no caso do adversário atacar com ataque do tipo bronze ou inferior. para adquirir esta carta,
                            basta utilizar por duas vezes seguidas cartas de defesa de quaisquer tipos, mas esta,
                            diferentemente de sua versão comum, não possui quantidade infinida e só é possível adquirir
                            uma unidade deste tipo.
                        </p>
                        <img src={HP13} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta bronze de recarga (bonus):</span> esta carta lhe permite
                            adquirir, em uma única jogada, duas cartas de ataque do tipo comum. apesar de ser do
                            tipo bronze, ela não é capaz de barrar nem mesmo o ataque de cartas comuns e , assim
                            como a carta bronze de defesa e de ataque, também não é infinita e só é possível adquirir
                            uma unidade. para adquirí-la, basta usar duas vezes seguidas a carta de recarga de
                            qualquer tipo.
                        </p>
                    </section>
                    <section style={specialDisplay}>
                        <img src={HP14} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta gold de ataque (bonus):</span> é a mais forte de todas as cartas
                            de ataque, pois possui a capacidade de quebrar as defesas das cartas do tipo bronze e comum.
                            para adquirí-la, basta utilizar por três vezes seguidas as cartas de ataque de quaisquer tipos.
                            esta carta, assim como todas de ataque, também possui efeito nulo caso se adversário a utilize ao
                            numa mesma rodada que você e só é possível adquirir uma unidade.
                        </p>
                        <img src={HP15} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta gold de defesa (bonus):</span> esta carta é a única que lhe garante
                            uma defesa contra a carta de ataque do tipo gold e também, é claro, de tipos inferiores.
                            para adquirí-la, basta utilizar por três vezes seguidas as cartas de defesa de quaisquer tipo.
                            este tipo, assim como a do tipo bronze, também não é infinita e só é possível adquirir uma unidade.
                        </p>
                        <img src={HP16} className="eff" width={"80px"} />
                        <p>
                            <span className="emphasis">carta gold de recarga (bonus):</span> esta carta lhe permite adquirir,
                            em uma única jogada, três cartas de ataque do tipo comum. ainda assim, ela é uma carta
                            vulnerável, podendo ser vencida até mesmo por uma carta de ataque do tipo comum. para adquirí-la,
                            basta utilizar, por três vezes seguidas, cartas de recarga de quaisquer tipos. ela, assim como a de
                            bronze, não é infinita e só é possível adquirir uma unidade.
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
                        <p>
                            Quando finalmente os 5 segundos do relógio vermelho acabam, as cartas escolhidas
                            por ambos jogadores são expostas não apenas entre os participantes da partida, mas
                            a todos que estão na sala.
                        </p>
                        <img src={HP18} className="eff" width={"300px"} />
                        <p>
                            para esclarecer ainda mais, lembre-se que só é possível haver vitória em uma partida
                            caso um dos jogadores use uma carta de ataque e o outro utilize uma carta de recarga
                            ou de defesa/ataque que sejam mais fracas que as de ataque como expomos na descrição
                            de cada uma das cartas anteriormente.
                        </p>
                    </section>
                    <section>
                        <p>
                            Por fim, como você pode observar, são exibidos dois paneis em sua tela.
                        </p>
                        <img src={HP19} className="eff" width={"500px"} />
                        <p>
                            O painel indicado pela seta verde na lateral esquerda mostra os jogadores
                            presentes na sala em ordem de pontuação de vitórias e quais são os jogadores que
                            atualmente estão disputando com o ícone de duas espadas em um circulo de cor rosa.
                        </p>
                        <p>
                            Já no painel da lateral direita, indicado pela seta vermelha, é o painel que mostra,
                            além do número da sala, as conversas de chat e os logs do jogo passando informações
                            como quando um jogador sai, um jogador entra, uma partida se encerra, algum jogador
                            vence e etc.
                        </p>
                    </section>
                    <section>
                        <p>
                            <span className="emphasis">Informações importantes</span>
                        </p>
                        <p>
                            em cada sala, são sempre dois jogadores disputando. quando um é vencedor
                            ele permanece na partida e o derrotado é jogado ao final da fileira e, então,
                            começará uma nova disputa entre o vencedor e o primeiro jogador que estava
                            na de fora na fila.
                        </p>
                        <p>
                            a fileira é organizada por ordem de chegada na sala.
                        </p>
                    </section>
                </div>
            </div>

            <button title="Fechar" className="close-button" onClick={props.closeHelp}>
                X
            </button>

            <div className="count-display" title={`Slide ${(count * -1) + 1} de 15.`}>
                {(count * -1) + 1} / 15
            </div>
        </div>
    )
}