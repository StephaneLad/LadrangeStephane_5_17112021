let urlId = window.location.search 
let id = urlId.slice(4)
// récupération des balises html
const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const colorChoice = document.getElementById('colors')
const addCart = document.getElementById('addToCart')

// fonction asynchrone pour récupérer les données du produit souhaiter et afficher le HTML en conséquance
async function productItem (){
    await fetch (`http://localhost:3000/api/products/${id}`)
    .then(res=>res.json())
    .then(data=>{

        // affichage des informations produit
        img.innerHTML +=`<img src="${data.imageUrl}" alt="Photographie d'un canapé">`
        title.textContent = data.name
        price.textContent = data.price
        description.textContent = data.description

        // création des differentes couleurs
        for(let color of data.colors){
            colorChoice.innerHTML+=`<option value="${color}">${color}</option>`
        }
    })
;
}
productItem()

// eventlistener sur le bouton d'ajout permetant de récupérer la couleur et la quantité souhaiter
addCart.addEventListener('click', () =>{   
    let quantity = parseInt(document.getElementById('quantity').value)
    let color = document.getElementById('colors').value
    let products =JSON.parse(localStorage.getItem('product'))
    let filteredProducts =[]
    let otherProducts  =[]
    let i =0
    let currentProduct = false
    let itemOk = false

    // vérification de product si null alors set filteredProducts
    if (products === null){
        filteredProducts = [{id:id,color:color,quantity:quantity,price:0}]
    }else{

        // filtration des produits pour vérifier uniquement les produits souhaiter 
        filteredProducts=products.filter(product => product.id === id)
        otherProducts=products.filter(product => product.id !== id)
        

        // si le produit n'est pas encore présent alors set filteredProducts
        if(filteredProducts.length === 0){
            filteredProducts = [{id:id,color:color,quantity:quantity,price:0}]
        }else{

            let productModifier =[]

            // vérification pour chaque produit de filteredProducts
            while(i<filteredProducts.length){
                
                    // si la couleur est égal a la couleur de produit stocker on ajoute la nouvelle quantité souhaiter a celle stocker
                    if(color===filteredProducts[i].color){
                        filteredProducts[i].quantity += quantity
                        currentProduct = true
                        itemOk= true
                    }else{
                        if(itemOk === false ){
                            productModifier= {id:id,color:color,quantity:quantity,price:0}
                        }
                    }
                i+=1

                // si la boucle arrive a sont terme et que le produit n'a pas était trouver alors on l'ajoute
                if(i===filteredProducts.length && currentProduct===false){
                    filteredProducts=[...filteredProducts,productModifier]
                }
            }
        }   
    }

    // récupération des informations et stockage
    products = JSON.stringify([...filteredProducts,...otherProducts])
    localStorage.setItem('product',products)
})
