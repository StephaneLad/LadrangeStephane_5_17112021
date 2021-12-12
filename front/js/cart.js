let i=0
let product =JSON.parse(localStorage.getItem('product'))
const cartItem = document.getElementById('cart__items') 

let test = document.getElementById('order')
let deleteItem
let quantity
let quantityShow

let form =document.querySelector('.cart__order__form').getElementsByTagName('input')
let error =document.querySelector('.cart__order__form').getElementsByTagName('p')

// let firstName = document.getElementById('firstName')
// let firstNameError = document.getElementById('firstNameErrorMsg')
// let lastName = document.getElementById('lastName')
// let lastNameError = document.getElementById('lastNameErrorMsg')
// let adress = document.getElementById('address')
// let adressError = document.getElementById('addressErrorMsg')
// let city = document.getElementById('city')
// let cityError = document.getElementById('cityErrorMsg')
// let email = document.getElementById('email')
// let emailError = document.getElementById('emailErrorMsg')
// let submit = document.getElementById('order')

// console.log(cartItem)

while(i<product.length){
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
              <p class="cart__item__content__settings__quantity_show">Qté : ${product[i].quantity}</p>
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

  deleteItem = document.querySelectorAll('.cart__item__content__settings__delete')
  quantity = document.querySelectorAll('.itemQuantity')
  quantityShow = document.querySelectorAll('.cart__item__content__settings__quantity_show')
}
test.addEventListener('click',()=>{console.log('test')})

for (let y = 0; y < deleteItem.length; y++) {
  deleteItem[y].addEventListener("click", () => {
    product.splice(y,1)
    localStorage.setItem('product',JSON.stringify(product))
    window.location.reload()
  }); 
}

for (let y = 0; y < quantity.length; y++) {
  quantity[y].addEventListener('change', () =>{
    product[y].quantity=parseInt(quantity[y].value)
    localStorage.setItem('product',JSON.stringify(product))
    quantityShow[y].innerHTML=`Qté : ${quantity[y].value}`
  })
  
}


for (let y = 0; y < form.length; y++) {
  if(!form[y].value){
    error[y].innerHTML=`veuillez renseignez votre ${form[y].name}`
  }else{
    console.log(y)
  }
  
  
}