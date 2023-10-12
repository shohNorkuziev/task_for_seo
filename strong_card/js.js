let suitsNumber = {
  spades: "&#9824",
  hearts: "&#9829;",
  clubs: "&#9827",
  diamonds: "&#9830",
};
let values = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let suits = ["spades", "hearts", "clubs", "diamonds"];
let start = document.querySelector('.start_game')
class Player {
  name;
  points = 0;
  deck;

  constructor(name) {
    this.name = name;
  }

  isDeckEmpty() {
    return this.deck.length === 0;
  }

  getDeck(deck) {
    this.deck = deck;
  }

  takeFirstCard() {
    const card = this.deck.shift();
    return card;
  }

  resetPoints() {
    this.points = 0;
  }
}

class Deck {
  cards = [];

  constructor() {
    this.cards = this.generateDeck();
    this.shuffle();
  }

  generateDeck() {
    const deck = [];
    for (const suit of suits) {
      for (const value of values) {
        deck.push(new Card(value, suit));
      }
    }
    return deck;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  split() {
    const halfSize = Math.floor(this.cards.length / 2);
    const half1 = this.cards.slice(0, halfSize);
    const half2 = this.cards.slice(halfSize);
    return [half1, half2];
  }
}

class Card {
  value;
  suit;

  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
}

  compare(card) {
    const value1Index = values.indexOf(this.value);
    const value2Index = values.indexOf(card.value);

    if (value1Index < value2Index) {
      return -1;
    } else if (value1Index > value2Index) {
      return 1;
    } else {
      // Если значения карт равны, можно рассматривать их масти, но это зависит от правил игры
      const suit1Index = suits.indexOf(this.suit);
      const suit2Index = suits.indexOf(card.suit);
      if (suit1Index < suit2Index) {
        return -1;
      } else if (suit1Index > suit2Index) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

class Game {
  p1 = new Player("Player 1");
  p2 = new Player("Player 2");
  deck;
  notEnd = true;

  startGame() {
    this.deck = new Deck();
    this.deck.shuffle();
    const [half1, half2] = this.deck.split();
    this.p1.getDeck(half1);
    this.p2.getDeck(half2);
    this.notEnd = true;
    console.log(this.deck,half1,half2);
  }

  turn() {
    //проверить наличие карт у игроков
    if (this.p1.isDeckEmpty() || this.p2.isDeckEmpty()) {
      this.notEnd = false;
      return;
    }

    // Взять первую карту от каждого игрока
    const p1Card = this.p1.takeFirstCard();
    const p2Card = this.p2.takeFirstCard();

    // Сравнить карты и определить победителя
    const comparison = p1Card.compare(p2Card);
    if (comparison === -1) {
      this.plusPoint(this.p2);
      this.p2.deck.push(p1Card, p2Card);
    } else if (comparison === 1) {
      this.plusPoint(this.p1);
      this.p1.deck.push(p1Card, p2Card);
    } else {
      // Ничья, карты остаются на столе
      this.p1.deck.push(p1Card);
      this.p2.deck.push(p2Card);
    }

    //сравнить карты
    //добавить 1 очко игроку с большей картой
  }

  plusPoint(player) {
    player.points++;
  }
}

let game = new Game();
start.addEventListener('click', ()=>{
    game.startGame();
})

function playGame() {
  while (game.notEnd) {
    game.turn();

    if (game.p1.isDeckEmpty() || game.p2.isDeckEmpty()) {
      game.notEnd = false;
      // Определение победителя и вывод результата
      if (game.p1.points > game.p2.points) {
        console.log("Player 1 победил!");
      } else if (game.p2.points > game.p1.points) {
        console.log("Player 2 победил!");
      } else {
        console.log("Ничья!");
      }
    }
  }
}

// Вызов функции playGame для начала игры
// playGame();