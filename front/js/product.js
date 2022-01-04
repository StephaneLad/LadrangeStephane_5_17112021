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
    let product =JSON.parse(localStorage.getItem('product'))
    let i =0
    let y =0
    let currentProduct = false
    let newProduct = false
    // probleme if else === fait
    let itemOk = false

    
    if (product === null){
        product = [{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
    }else{
        console.log(product)

        let products = findProducts(id)
        console.log(products)
        // bouucle de verificationsi le produit est present mais avec une couleur differente
        while(i<product.length){
            // verification que l'ID est egal au produit
            if(id===product[i].id){
                // si la couleur est egal a la couleur de produit stocker on ajoute la nouvelle quantité shouaiter a celle stocker
                if(color===product[i].color){
                    product[i].quantity += quantity
                    currentProduct = true
                    itemOk= true
                }else{
                    if(!itemOk){
                        newProduct = true
                        y = i
                    }
                }
            }
            i+=1
        }


        function findProducts (x){
           // product.filterParID()
           return product.filter(product => product.id === x)
           
        }
       


        if(i===product.length){
            // si le produit est deja present et/ou avec une couleur different alors ajout dans product
            if(newProduct & currentProduct===false){
                console.log(newProduct)
                product.splice(y,0,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem})
                newProduct = false
                console.log(newProduct)
            }else{
                // creation du nouveau produit
                if(!currentProduct){
                    product= [...product,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
                }
            }
        }
    }
    product = JSON.stringify(product)
    localStorage.setItem('product',product)
})
