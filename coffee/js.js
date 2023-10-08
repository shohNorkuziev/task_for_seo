let updateButton = document.querySelector(".updateDetails");
let cancelButton = document.querySelector(".cancel");
let buyDrinkDialog = document.querySelector(".buyDrink");
let Service = document.querySelector(".Service");
let service = document.querySelector(".serviceDialog");
let closeDial = document.querySelector(".close");
let espressoButton = document.querySelector(".Espresso");
let americanoButton = document.querySelector(".Americano");
let latteButton = document.querySelector(".Latte");
let btnAdd = document.querySelector(".service");
let addCoffeeInput = document.querySelector(".coffee");
let addMilkInput = document.querySelector(".milk");
let addSugarInput = document.querySelector(".sugar");
let addCupInput = document.querySelector(".cup");
let addPasswordInput = document.querySelector(".password");
let takeMoneyButton = document.querySelector(".money");

class CoffeeMachine {
  ingredients;
  money;
  constructor() {
    this.ingredients = {
      coffee: 100,
      milk: 100,
      sugar: 100,
      cup: 100,
    };
    this.money = 0;
  }

  updateIngredientQuantities() {
    document.querySelector(
      ".coffeeQty"
    ).textContent = `Coffee: ${this.ingredients.coffee}`;
    document.querySelector(
      ".milkQty"
    ).textContent = `Milk: ${this.ingredients.milk}`;
    document.querySelector(
      ".sugarQty"
    ).textContent = `Sugar: ${this.ingredients.sugar}`;
    document.querySelector(
      ".cupQty"
    ).textContent = `Cup: ${this.ingredients.cup}`;
    document.querySelector(".money").textContent = `take money${this.money}$`;
  }

  buyDrink(drink) {
    console.log(drink);
    const recipes = {
      Espresso: { coffee: 10, milk: 0, sugar: 5, cup: 1 },
      Americano: { coffee: 10, milk: 0, sugar: 5, cup: 1 },
      Latte: { coffee: 10, milk: 15, sugar: 5, cup: 1 },
    };

    if (this.canMakeDrink(drink)) {
      const recipe = recipes[drink];
      for (const ingredient in recipe) {
        this.ingredients[ingredient] -= recipe[ingredient];
      }
      this.money += 2;
      this.updateIngredientQuantities();
      return true;
    } else {
      return false;
    }
  }

  canMakeDrink(drink) {
    const recipes = {
      Espresso: { coffee: 10, milk: 0, sugar: 5, cup: 1 },
      Americano: { coffee: 10, milk: 0, sugar: 5, cup: 1 },
      Latte: { coffee: 10, milk: 15, sugar: 5, cup: 1 },
    };

    const recipe = recipes[drink];

    for (const ingredient in recipe) {
      if (this.ingredients[ingredient] < recipe[ingredient]) {
        return false;
      }
    }
    return true;
  }

  addIngredients(addCoffeeInput, addMilkInput, addSugarInput, addCupInput) {
    const password = addPasswordInput.value;

    if (password === "123") {
      console.log("правильный пароль");

      if (!isNaN(addCoffeeInput)) {
        addCoffeeInput = Number(addCoffeeInput);
        this.ingredients.coffee += addCoffeeInput;
      } else {
        console.log("что то нето");
      }
      addMilkInput = Number(addMilkInput);
      this.ingredients.milk += addMilkInput;

      addSugarInput = Number(addSugarInput);
      this.ingredients.sugar += addSugarInput;

      addCupInput = Number(addCupInput);
      this.ingredients.cup += addCupInput;

      this.updateIngredientQuantities();

      service.close();
      return;
    } else {
      console.log(password);
      console.log("неправильный пароль");
    }
  }

  takeMoney() {
    const password = addPasswordInput.value;
    if (password === "123") {
      this.money = 0;
      this.updateIngredientQuantities();
      console.log("забрал бабки");
      return this.money;
    } else {
      console.log("неправильный пароль");
    }
  }
}
console.log(addCoffeeInput);
const coffeeMachine = new CoffeeMachine();

takeMoneyButton.addEventListener("click", () => {
  coffeeMachine.takeMoney();
});

btnAdd.addEventListener("click", () => {
  let coffee = addCoffeeInput.value;
  let milk = addMilkInput.value;
  let sugar = addSugarInput.value;
  let cup = addCupInput.value;
  coffeeMachine.addIngredients(coffee, milk, sugar, cup);
});
document.addEventListener("DOMContentLoaded", () => {
  coffeeMachine.updateIngredientQuantities();

  updateButton.addEventListener("click", () => {
    buyDrinkDialog.showModal();
  });

  cancelButton.addEventListener("click", () => {
    buyDrinkDialog.close();
  });

  Service.addEventListener("click", () => {
    service.showModal();
  });

  closeDial.addEventListener("click", () => {
    service.close();
  });
});

espressoButton.addEventListener("click", () => {
  if (coffeeMachine.canMakeDrink("Espresso")) {
    if (coffeeMachine.buyDrink("Espresso")) {
    } else {
    }
    buyDrinkDialog.close();
  } else {
    espressoButton.disabled = true;
  }
});

americanoButton.addEventListener("click", () => {
  if (coffeeMachine.canMakeDrink("Americano")) {
    if (coffeeMachine.buyDrink("Americano")) {
    } else {
    }
    buyDrinkDialog.close();
  } else {
    americanoButton.disabled = true;
  }
});

latteButton.addEventListener("click", () => {
  if (coffeeMachine.canMakeDrink("Latte")) {
    if (coffeeMachine.buyDrink("Latte")) {
    } else {
    }
    buyDrinkDialog.close();
  } else {
    latteButton.disabled = true;
  }
});
