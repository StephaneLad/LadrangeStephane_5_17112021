let orderProducts

let confirmation = document.querySelector('#orderId')

// affichage numéro de commande sur la page de confirmation
if(confirmation){
  let urlId = window.location.search 
  const urlParams = new URLSearchParams(urlId);
  const paramsOrderId = urlParams.get('orderId')
  console.log(paramsOrderId)
  confirmation.innerText=`${paramsOrderId}`
}


let i=0
let product =JSON.parse(localStorage.getItem('product'))
const cartItem = document.getElementById('cart__items') 


let deleteItem
let quantity
let quantityShow
let quantityModifier
let totalPriceItem = 0
let priceItem

let itemValue

const totalPrice = document.getElementById('totalPrice')

let form =document.querySelector('.cart__order__form').getElementsByTagName('input')
let errorFirstName=document.getElementById('firstNameErrorMsg')
let errorLastName=document.getElementById('lastNameErrorMsg')
let errorAdress=document.getElementById('addressErrorMsg')
let errorCity=document.getElementById('cityErrorMsg')
let errorEmail=document.getElementById('emailErrorMsg')

let contact

let productId =[]
let id
let orderId


// récuperation des données produit 
async function getPrice (product){
  return await fetch (`http://localhost:3000/api/products/${product.id}`)
  .then(res=>res.json())
  .then(data=>{
    return {...data,quantity:product.quantity,color:product.color}
  })
}



//  while permettant d'afficher chaque produit stocker dans le HTML
async function getProduct (){
    while(i<product.length){
      await getPrice(product[i]).then(data=>{
      
      // géneration du code html lié au produit
      cartItem.innerHTML += `
        <article class="cart__item" data-id="${data._id}" data-color="${data.color}">
        <div class="cart__item__img">
          <img src="${data.imageUrl}" alt="Photographie du canapé :${data.name}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${data.color}</p>
            <p class="itemValue">${data.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p class="cart__item__content__settings__quantity_show">Qté : ${data.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `


      // récupération de l'id produit
      id=data._id
      productId=[...productId,id]

      // génération du prix total
      totalPriceItem+=data.quantity*data.price


      })

  i +=1

}}

getProduct().then(_=>{
  totalPrice.innerHTML=`${totalPriceItem}`

  // récupération des élements html
  quantity = document.querySelectorAll('.itemQuantity')
  quantityShow = document.querySelectorAll('.cart__item__content__settings__quantity_show')
  deleteItem = document.querySelectorAll('.cart__item__content__settings__delete')
  itemValue = document.querySelectorAll('.itemValue')

  // eventlistener pour supprimer le produit souhaiter
  for (let y = 0; y < deleteItem.length; y++) {
    deleteItem[y].addEventListener("click", () => {
    product.splice(y,1)
    localStorage.setItem('product',JSON.stringify(product))
    window.location.reload()
  })
  }

  // eventlistener pour changer la quantité du produit souhaiter
  for (let y = 0; y < quantity.length; y++) {
    quantity[y].addEventListener('change', () =>{

      quantityModifier= quantity[y].value-product[y].quantity

      // ajout de la quantité modifier dans le local storage
      product[y].quantity=parseInt(quantity[y].value)
      localStorage.setItem('product',JSON.stringify(product))
      
      totalPrice.innerHTML=`${totalPriceItem}`
      // mise à jour du prix selon la modification de quantité
      totalPriceItem+=(quantityModifier*parseInt(itemValue[y].outerText))
      totalPrice.innerHTML=`${totalPriceItem}`

      // affichage de la quantité sur la page
      quantityShow[y].innerHTML=`Qté : ${quantity[y].value}`
      quantityModifier=0
      
    })
    
  }


})



// fonction de validation des informations utilisateur
function checkerNumber (x){
  if(x.length >1 && /^[a-zA-Z]+$/.test(x)){
    return true
  }
}

function checkerLength (x){
  if(x.length >1){
    return true
  }
}

function checkerAtMail (x){
  const atMail = "@"
  if(x.length >1 && x.includes(atMail)) {
    return true
  }
}

// eventlistener de validation formulaire
form[5].addEventListener('click',(e)=>{
  e.preventDefault()
  // vérification de la conformité des données entré avant envoi
  if (checkerNumber(form[0].value) && checkerNumber(form[1].value) && checkerLength(form[2].value) && checkerLength(form[3].value) && checkerAtMail(form[4].value)){
    
    // récupération des informations entré dans le formulaire
    contact={firstName:form[0].value,lastName:form[1].value,address:form[2].value,city:form[3].value,email:form[4].value}
    orderProducts={contact:contact,products:productId}

    // envoi des données vers  l'API
    fetch("http://localhost:3000/api/products/order",{
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>{
      
      // récupération du numéro de commande et redirection
      orderId=data.orderId
      window.location=`http://127.0.0.1:5500/front/html/confirmation.html?orderId=${orderId}`
    })

    // affichage des méssages d'erreur
  }else if(!checkerNumber(form[0].value)){
    errorFirstName.textContent='veuillez renseigner un prénom valide'
  }else if(!checkerNumber(form[1].value)){
    errorLastName.textContent='veuillez renseigner un nom valide'
  }else if (!checkerLength(form[2].value)){
    errorAdress.textContent='veuillez renseigner une adresse valide'
  }else if (!checkerLength(form[3].value)){
    errorCity.textContent='veuillez renseigner une ville valide'
  }else if (!checkerAtMail(form[4].value)){
    errorEmail.textContent='veuillez renseigner un email valide'
  }
})