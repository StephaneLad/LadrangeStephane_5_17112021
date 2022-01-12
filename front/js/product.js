let urlId = window.location.search 
let id = urlId.slice(4)
let priceItem
let names
let imgItem
const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const colorChoice = document.getElementById('colors')

const addCart = document.getElementById('addToCart')
console.log(addCart)

// fonction asynchrone pour recuper les donné du produit souhaiter et afficher le HTML en conséquance
async function productItem (){
    await fetch (`http://localhost:3000/api/products/${id}`)
    .then(res=>res.json())
    .then(data=>{

        let nbsColors = data.colors.length
        let color = data.colors
        let i =0
        priceItem = data.price
        names = data.name
        imgItem = data.imageUrl
        img.innerHTML +=`<img src="${data.imageUrl}" alt="Photographie d'un canapé">`
        title.textContent = data.name
        price.textContent = data.price
        description.textContent = data.description

        // creation des differente couleur
        // while (i< nbsColors){
        //     colorChoice.innerHTML += `<option value="${color[i]}">${color[i]}</option>`
        //     i+=1
        // }
        for(let color of data.colors){
            colorChoice.innerHTML+=`<option value="${color}">${color}</option>`
        }
    })
;
}
productItem()

// eventlistener sur le bouton dajout permetant de recuper la couleur et la quantité souhaiter
addCart.addEventListener('click', () =>{   
    let quantity = parseInt(document.getElementById('quantity').value)
    let color = document.getElementById('colors').value
    let products =JSON.parse(localStorage.getItem('product'))
    let filteredProducts =[]
    let otherProducts  =[]
    let i =0
    let y =0
    let currentProduct = false
    // probleme if else === fait
    let itemOk = false

    
    if (products === null){
        filteredProducts = [{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
    }else{
        filteredProducts=products.filter(product => product.id === id)
        otherProducts=products.filter(product => product.id !== id)
        // console.log(filteredProducts)
        if(filteredProducts.length === 0){
            filteredProducts = [{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
        }else{

            let productModifier =[]
            while(i<filteredProducts.length){
                // verification que l'ID est egal au produit
                    // si la couleur est egal a la couleur de produit stocker on ajoute la nouvelle quantité shouaiter a celle stocker
                    if(color===filteredProducts[i].color){
                        filteredProducts[i].quantity += quantity
                        currentProduct = true
                        itemOk= true
                    }else{
                        if(itemOk === false ){
                            productModifier= {id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}
                        }
                    }
                i+=1
                if(i===filteredProducts.length && currentProduct===false){
                    filteredProducts=[...filteredProducts,productModifier]
                }
            }
        }
        console.log(filteredProducts)        
    }

    products = JSON.stringify([...filteredProducts,...otherProducts])
    localStorage.setItem('product',products)
})
