let urlId = window.location.search ;
let id = urlId.slice(4)
let i =0

const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const colorChoice = document.getElementById('colors')

const addCart = document.getElementById('addToCart')
console.log(addCart)


fetch (`http://localhost:3000/api/products/${id}`)
    .then(res=>res.json())
    .then(data=>{
        let nbsColors = data.colors.length
        let color = data.colors

        img.innerHTML +=`<img src="${data.imageUrl}" alt="Photographie d'un canapé">`
        title.textContent = data.name
        price.textContent = data.price
        description.textContent = data.description
        while (i< nbsColors){
            colorChoice.innerHTML += `<option value="${color[i]}">${color[i]}</option>`
            i+=1
        }
    })
;
addCart.addEventListener('click', () =>{   
    let quantity = document.getElementById('quantity').value
    let color = document.getElementById('colors').value

    if(localStorage.getItem('nbsProduct')===null){
        localStorage.setItem('nbsProduct', i)
        let nbsProduct = localStorage.getItem('nbsProduct')
        localStorage.setItem(`id${nbsProduct}`, id)
        localStorage.setItem(`quantity${nbsProduct}`, quantity)
        localStorage.setItem(`color${nbsProduct}`, color)
        // localStorage.setItem(`nbsProduct${nbsProduct}`,nbsProduct)
        nbsProduct +=1
        localStorage.setItem(`nbsProduct`,nbsProduct)
    }else{
        let nbsProduct = localStorage.getItem('nbsProduct')
        localStorage.setItem(`id${nbsProduct}`, id)
        localStorage.setItem(`quantity${nbsProduct}`, quantity)
        localStorage.setItem(`color${nbsProduct}`, color)
        // localStorage.setItem(`nbsProduct${nbsProduct}`,nbsProduct)
        nbsProduct +=1
        localStorage.setItem(`nbsProduct`,nbsProduct)
    }
})
