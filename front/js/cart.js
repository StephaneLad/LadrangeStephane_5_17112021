let i=0
const nbsProduct = localStorage.getItem('nbsProduct')
const cartItem = document.getElementById('cart__items')

// console.log(cartItem)
while(i<nbsProduct){
    let quantity = localStorage.getItem(`quantity${i}}`)
    let color = localStorage.getItem(`color${i}`)
    let id = localStorage.getItem(`id${i}`)
    fetch (`http://localhost:3000/api/products/${id}`)
    .then(res=>res.json())
    .then(data=>{
        cartItem.innerHTML += `
        <article class="cart__item" data-id="${data._id}" data-color="${color}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${color}</p>
            <p>${data.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `
        console.log(data)
    })
;
i +=1
}