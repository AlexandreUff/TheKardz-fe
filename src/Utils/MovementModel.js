class CardModel {
    constructor(cardName, amount, type){
        this.cardName = cardName;
        this.amount = amount;
        this.type = type;
        this.selected = false;
    }
}

export default CardModel