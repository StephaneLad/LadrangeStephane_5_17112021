let orderProducts

let i=0
let product =JSON.parse(localStorage.getItem('product'))
const cartItem = document.getElementById('cart__items') 

let test = document.getElementById('order')
let deleteItem
let quantity
let quantityShow
let quantityModifier
let totalPriceItem = 0
let priceItem
const totalPrice = document.getElementById('totalPrice')

let form =document.querySelector('.cart__order__form').getElementsByTagName('input')
let error =document.querySelector('.cart__order__form').getElementsByTagName('p')
let contact
let data1
let data2
let formTrue =false
let datas

let productId =[]
let id
let orderId = localStorage.getItem('orderId')
let confirmation = document.querySelector('#orderId')




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

//  while permettant dafficher chaque produit stocker dans le HTML
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

  // recuperation de l'id produit
  id=product[i].id
  productId=[...productId,id]

  // genération du prix total
  priceItem=product[i].quantity*product[i].price
  totalPriceItem+=priceItem
  console.log(totalPriceItem)

  i +=1

  // recuperation des diver element html
  deleteItem = document.querySelectorAll('.cart__item__content__settings__delete')
  quantity = document.querySelectorAll('.itemQuantity')
  quantityShow = document.querySelectorAll('.cart__item__content__settings__quantity_show')
}
test.addEventListener('click',()=>{console.log('test')})
totalPrice.innerHTML=`${totalPriceItem}`



// eventlistener pour suprimer le produit souhaiter
for (let y = 0; y < deleteItem.length; y++) {
  deleteItem[y].addEventListener("click", () => {
    product.splice(y,1)
    localStorage.setItem('product',JSON.stringify(product))
    window.location.reload()
  }); 
}

// eventlistener pour changer la quantité du produit souhaiter
for (let y = 0; y < quantity.length; y++) {
  quantity[y].addEventListener('change', () =>{
    quantityModifier= quantity[y].value-product[y].quantity

    product[y].quantity=parseInt(quantity[y].value)
    localStorage.setItem('product',JSON.stringify(product))

    totalPriceItem+=(quantityModifier*product[y].price)
    totalPrice.innerHTML=`${totalPriceItem}`

    quantityShow[y].innerHTML=`Qté : ${quantity[y].value}`
    quantityModifier=0
  })
  
}

// fonction de validation des information utilisateur
function connard (x){
  if(x.lenght >1 && /^[a-zA-Z]+$/.test(x)){
    console.log(x)
    return true
  }
}

function tototot (x){
    if(x.lenght >1){
        console.log(x)
        return true
    }
}



// verification de la validité des information entre par l'utilisateur
// for (let y = 0; y < form.length; y++) {
//   form[y].addEventListener('change',()=>{
//     error[y].innerHTML=``
//     // if(form[y].value.length <2){
//     //   error[y].innerHTML=`veuillez renseignez votre ${form[y].name}`
//     // }
//     // if(validator(form[1].value) && validator(form[2].value) && form[3].value>2&&form[4].value>2){
//     //   contact={firstName:form[0].value,lastName:form[1].value,address:form[2].value,city:form[3].value,email:form[4].value}
//     //   formTrue=true
//     //   console.log('tr')
//     // }else {
//     //   error[y].innerHTML=`veuillez renseignez votre ${form[y].name}`
//     //   console.log('fuck')
//     // }
    


//     // contact={firstName:form[0].value,lastName:form[1].value,address:form[2].value,city:form[3].value,email:form[4].value}
//     //   formTrue=true
//     //   console.log('tr')
//   })
  
// }




let trezd = 'tet'

// datas={contact:contact,products:productId}


// console.log(JSON.stringify(datas))

// event listener 
form[5].addEventListener('click',(e)=>{
  e.preventDefault()

  // verification de la confomité" des donné entré avant envoi
  if (form[1].value.length>1 && /^[a-zA-Z]+$/.test(form[1].value) && form[2].value.length>1 && /^[a-zA-Z]+$/.test(form[2].value) && form[3].value.length>2 && form[4].value.length>2){
    orderProducts={contact:contact,products:productId}
    fetch("http://localhost:3000/api/products/order",{
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>{
      orderId=data.orderId
      localStorage.setItem('orderId',orderId)
    })
  }else if(!validator(form[1].value)){
      console.log('err')
  }
  form[5].formAction=`http://127.0.0.1:5500/front/html/confirmation.html`
})





confirmation.innerHTML=`${orderId}`