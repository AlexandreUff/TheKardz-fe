function RandomMovements(movementsSelectedsChain){
    const movements = [
        {
            cardName: "attack1",
            amount: 1,
            type: "default",
          },
          {
            cardName: "defense1",
            amount: Infinity,
            type: "default",
          },
          {
            cardName: "recharging1",
            amount: Infinity,
            type: "default",
          }
    ];

    return movements[movementsSelectedsChain]
}