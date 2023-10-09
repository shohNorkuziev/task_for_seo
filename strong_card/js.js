let suitsNumber={
    spades:"&#9824",
    hearts:"&#9829;",
    clubs:"&#9827",
    diamonds:"&#9830",
}
let values=["6","7","8","9","10","J","Q","K","A"]
let suits = ["spades","hearts","clubs","diamonds"]

class Player{
    name
    points=0
    deck
    
    constructor(name){}

    isDeckEmpty(){}

    getDeck(deck){}

    takeFirstCard(){}

    resetPoints(){}
}

class Deck{
    cards=[]

    constructor(){}

    shufle(){}

    split(){
        let a=[]
        let b=[]

        return [a,b]
    }
}

class Card{
    value
    suit

    compare(card){
        return true
    }
}

class Game{
    p1=new Player("Player 1")
    p2=new Player("Player 2")
    deck
    notEnd = true

    startGame(){
        this.deck = new Deck()
        this.p1.resetPoints()
        this.p2.resetPoints()
        this.deck.shufle()
        p1.getDeck(this.deck.split()[0])
        p2.getDeck(this.deck.split()[1])
    }

    turn(){
        //проверить наличие карт у игроков
        let p1Card = this.p1.takeFirstCard()
        let p2Card = this.p2.takeFirstCard()
        //сравнить карты
        //добавить 1 очко игроку с большей картой
    }

    plusPoint(player){}
} 

let game = new Game()
game.startGame()
while(game.notEnd){
    game.turn()
}