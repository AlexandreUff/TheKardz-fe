function titleMovimentInfo(data){
    let moviment
    let type

    //Verifica o nome do movimento
    if(data.moviment === 'defense1' || data.moviment === "defense2" || data.moviment === "defense3"){
        moviment = "Defesa"
    } else if(data.moviment === 'attack1'){
        moviment = "Ataque"
    } else if(data.moviment === 'attack2' || data.moviment === 'attack3'){
        moviment = "Ataque"
    } else if(data.moviment === 'recharging1' || data.moviment === 'recharging2' || data.moviment === 'recharging3'){
        moviment = "Recarga"
    }

    //Verifica o tipo do movimento
    if(data.type === "bronze"){
        type = "Bronze";
    } else if (data.type === "gold"){
        type = "Gold";
    } else {
        type = "";
    }

    //Retorna um objeto com os dois dados agora legíveis
    return {
        name: moviment,
        type
    }
}