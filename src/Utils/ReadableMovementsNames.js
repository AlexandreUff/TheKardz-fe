function titleMovimentInfo(movement, type){
    let movementLegible
    let typeLegible

    //Verifica o nome do movimento
    if(movement === 'defense1' || movement === "defense2" || movement === "defense3"){
        movementLegible = "Defesa"
    } else if(movement === 'attack1'){
        movementLegible = "Ataque"
    } else if(movement === 'attack2' || movement === 'attack3'){
        movementLegible = "Ataque"
    } else if(movement === 'recharging1' || movement === 'recharging2' || movement === 'recharging3'){
        movementLegible = "Recarga"
    }

    //Verifica o tipo do movimento
    if(type === "bronze"){
        typeLegible = "Bronze";
    } else if (type === "gold"){
        typeLegible = "Gold";
    } else {
        typeLegible = "";
    }

    //Retorna um objeto com os dois dados agora legíveis
    return {
        name: movementLegible,
        type: typeLegible
    }
}

export default titleMovimentInfo