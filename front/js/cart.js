let orderProducts

let i=0
let product =JSON.parse(localStorage.getItem('product'))
const cartItem = document.getElementById('cart__items') 

let test = document.getElementById('order')
let deleteItem
let quantity
let quantityShow

let form =document.querySelector('.cart__order__form').getElementsByTagName('input')
let error =document.querySelector('.cart__order__form').getElementsByTagName('p')
let contact
let data1
let data2
let formTrue =false
let datas

let productId =[]
let id



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
  id=product[i].id
  productId=[...productId,id]
  i +=1

  deleteItem = document.querySelectorAll('.cart__item__content__settings__delete')
  quantity = document.querySelectorAll('.itemQuantity')
  quantityShow = document.querySelectorAll('.cart__item__content__settings__quantity_show')
}
test.addEventListener('click',()=>{console.log('test')})

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
    product[y].quantity=parseInt(quantity[y].value)
    localStorage.setItem('product',JSON.stringify(product))
    quantityShow[y].innerHTML=`Qté : ${quantity[y].value}`
  })
  
}

// fonction de validation des information utilisateur
function validator (x){
  if(x.lenght >1 && /^[a-zA-Z]+$/.test(x)){
    console.log(x)
    return true
  }
}

// verification de la validité des information entre par l'utilisateur
for (let y = 0; y < form.length; y++) {
  form[y].addEventListener('change',()=>{
    error[y].innerHTML=``
    if(form[y].value.length <2){
      error[y].innerHTML=`veuillez renseignez votre ${form[y].name}`
    }
    contact={firstName:form[0].value,lastName:form[1].value,address:form[2].value,city:form[3].value,email:form[4].value}
    formTrue=true
    console.log('tr')




  })
  
}


// datas={contact:contact,products:productId}


// console.log(JSON.stringify(datas))

// event listener 
form[5].addEventListener('click',(e)=>{
  e.preventDefault()
  datas={contact:contact,products:productId}

  console.log(JSON.stringify(datas))
  if (formTrue){
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
    console.log(data)
    })
  }
  
})

// form[5].addEventListener('click',(e)=>{
//   e.preventDefault()
// fetch("http://localhost:3000/api/products/order")
// .then(res=>res.json())
// .then(data=>{
// console.log(data)})
// })

// let prod=['test','tesdt']
// let cont = 


//     datas={products:prod,contact:cont}
//     fetch("http://localhost:3000/api/products/order",{
//       method: "POST",
//       body: JSON.stringify(datas),
//       Headers:{
//         "Content-Type": "application/json"
//       }
//     })
//     async function lili (){
//       await fetch (`http://localhost:3000/api/products/order`)
//       .then(res=>res.json())
//       .then(data=>{
//           console.log(data)
//         })
//   }

// let products={productId:14414414}
// contact={
//   firstName: 'tre',
//   lastName: 'tress',
//   address: 'tre',
//   city: 'tre',
//   email: 'tre'
// }
// console.log(products)
// let tur =JSON.stringify(products)
// console.log(products)
// console.log(tur)
// console.log(contact.lastName)


// orderProducts={contact:JSON.stringify(contact),products:JSON.stringify(products)}
// orderProducts= JSON.stringify(orderProducts)
// console.log(orderProducts)

//     fetch("http://localhost:3000/api/products/order",{
//       method: "POST",
//       body:orderProducts,
//       Headers:{
//         "Content-Type": "application/json"}})
