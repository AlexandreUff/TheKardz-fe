function titleMovimentInfo(movement, type){
    let movementLegible
    let typeLegible

    //Verifica o nome do movimento
    if(movement === 'defense'){
        movementLegible = "🛡 Defesa"
    } else if(movement === 'attack' && type === 1){
        movementLegible = "🗡 Ataque"
    } else if(movement === 'attack' && type >= 2){
        movementLegible = "⚔️ Ataque"
    } else if(movement === 'recharging'){
        movementLegible = "➕ Recarga"
    }

    //Verifica o tipo do movimento
    if(type === 2){
        typeLegible = "Bronze";
    } else if (type === 3){
        typeLegible = "Gold";
    } else {
        typeLegible = "";
    }

    //Retorna um objeto com os dois dados agora legíveis
    return `${movementLegible} ${typeLegible}`
}

export default titleMovimentInfo