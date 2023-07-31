export default function ShowResultsOfRound(props){
    console.log("ESTOU RENDERIZANDO!!!!!!!!")

    const movementSelectedPlayerI = props.player1
    const movementSelectedPlayerII = props.player2

    //Ataques do player I
    const p1_attack_p2_attack = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "attack"
    const p1_attack_p2_defense = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "defense"
    const p1_attack_p2_recharging = movementSelectedPlayerI.cardName === "attack" && movementSelectedPlayerII.cardName === "recharging"

    //Ataques do player II
    const p2_attack_p1_attack = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "attack"
    const p2_attack_p1_defense = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "defense"
    const p2_attack_p1_recharging = movementSelectedPlayerII.cardName === "attack" && movementSelectedPlayerI.cardName === "recharging"

    let matchResult = "Empate"

    //Aqui entram apenas as estruturas de ataque com vitória do player I
    if(p1_attack_p2_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P1 Venceu"
    }

    if(p1_attack_p2_recharging){
      matchResult = "P1 Venceu"
    }

    //Aqui entram apenas as estruturas de ataque com vitória do player II
    if(p2_attack_p1_attack && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_defense && movementSelectedPlayerI.type > movementSelectedPlayerII.type){
      matchResult = "P2 Venceu"
    }

    if(p2_attack_p1_recharging){
      matchResult = "P2 Venceu"
    }

    return (
      <>
        <h1>{matchResult}</h1>
        <p>({movementSelectedPlayerI.cardName} | {movementSelectedPlayerI.type})</p>
        <p>({movementSelectedPlayerII.cardName} | {movementSelectedPlayerII.type})</p>
      </>
    )
}