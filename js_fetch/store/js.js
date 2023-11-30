const dialogElem = document.querySelector(".dialog")
const showBtn = document.querySelector(".trash")
const basketProduct = document.querySelector(".basket")
const closeBtn = document.querySelector(".close")
const wrapper = document.querySelector('.wrapper')
const intoBasket = document.querySelector('.into_basket')
const basket =[]

function existBasket(){
  if(basket.length===0){
    basketProduct.textContent = 'Корзина Пусто!!! '
    console.log('пусто!!!');
  }
}

showBtn.addEventListener("click", () => {
  existBasket()
  dialogElem.showModal();
});

closeBtn.addEventListener("click", () => {
  dialogElem.close();
});

fetch('http://localhost/api/get_products')
.then(response=>response.json())
.then(data=>{
    let html = ''
    console.log(data[0].name)
    data.forEach(product => {
        html +=
        `<div class="cart">
            <header class="header">${product.name}</header>
        <div>Цена: <span class="price">${product.price}</span></div>
            <button id="${product.id}" class="into_basket">В корзину</button>
        <div>Остаток: <span class="qty">${product.qty}</span></div>
        </div>`
    })
    wrapper.innerHTML = html

    const buttons = document.querySelectorAll('button')

    console.log(buttons);

    buttons.forEach(button => {
      button.addEventListener('click', ()=>{
        const selectedProduct = data.find(product => product.id === button.id)
        basket.push(selectedProduct)

        console.log(basket)
        displayProduct(selectedProduct)
      })
    })
})

function displayProduct(product) {
  console.table(product);
  const content = document.querySelector(".content");
  const allPrice = document.querySelector(".allPrice");


  const existingProduct = content.querySelector(`[data-id="${product.id}"]`);

  if (existingProduct) {

    const countElement = existingProduct.querySelector(".count");
    const count = parseInt(countElement.textContent) + 1;
    countElement.textContent = count;

    const priceElement = existingProduct.querySelector(".product_price");
    const totalPrice = count * product.price;
    priceElement.textContent = totalPrice.toFixed(2); 
  } else {
    const productPrice = Number(product.price)
    console.log(product.price);
    const productInfo = document.createElement("div");
    productInfo.dataset.id = product.id;
    productInfo.innerHTML = `
      <span class="product_name">${product.name}</span>
      <span class="count">1</span>
      <span class="product_price">${productPrice.toFixed(2)}</span>
    `;
    content.appendChild(productInfo);
  }

  let totalPrice = basket.reduce((total, item) => total + item.price, 0);
  Number(totalPrice)
  console.log(typeof totalPrice);
  allPrice.textContent = totalPrice.toFixed(2);
}