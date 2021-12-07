let i=0
let product =JSON.parse(localStorage.getItem('product'))
const cartItem = document.getElementById('cart__items')
console.log(product)
let s =product.lenght



// console.log(cartItem)
while(i<s){
      cartItem.innerHTML += `
        <article class="cart__item" data-id="${product[i].id}" data-color="${product[i].color}">
        <div class="cart__item__img">
          <img src="${product[i].img}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product[i].nameItem}</h2>
            <p>${product[i].color}</p>
            <p>${product[i].price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${product[i].quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `
  i +=1
  console.log('test')
  
}