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
        while (i< nbsColors){
            colorChoice.innerHTML += `<option value="${color[i]}">${color[i]}</option>`
            i+=1
        }
    })
;
}
productItem()

// eventlistener sur le bouton dajout permetant de recuper la couleur et la quantité souhaiter
addCart.addEventListener('click', () =>{   
    let quantity = parseInt(document.getElementById('quantity').value)
    let color = document.getElementById('colors').value
    let product =JSON.parse(localStorage.getItem('product'))
    let i =0
    let y =0
    let newProduct = false
    let currentProduct = false
    // probleme if else === fait
    let itemOk = false

    
    if (product === null){
        product = [{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
    }else{
        console.log(product)

        // bouucle de verificationsi le produit est present mais avec une couleur differente
        while(i<product.length){
            if(id===product[i].id){
                if(color===product[i].color){
                    product[i].quantity += quantity
                    newProduct = true
                    itemOk= true
                    console.log('if')
                }else{
                    if(!itemOk){
                        console.log('else')
                        currentProduct = true
                        y = i
                    }
                }
            }
            // if(id===product[i].id & color===product[i].color){
            //   product[i].quantity += quantity
            //   newProduct = true
            // }
            i+=1
        }


        if(i===product.length){
            // si le produit est deja present et/ou avec une couleur different alors ajout dans product
            if(currentProduct & newProduct===false){
                console.log(currentProduct)
                product.splice(y,0,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem})
                currentProduct = false
                console.log(currentProduct)
            }else{
                // creation du nouveau produit
                if(!newProduct){
                    console.log('tehe')
                    product= [...product,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
                }
            }
            // product= [...product,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
            // console.log('test')
        }
    }
    product = JSON.stringify(product)
    localStorage.setItem('product',product)
    // console.log(product)




})
