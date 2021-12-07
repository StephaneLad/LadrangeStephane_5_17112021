let urlId = window.location.search 
let id = urlId.slice(4)

let z =0
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

async function tutu (){
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
        while (i< nbsColors){
            colorChoice.innerHTML += `<option value="${color[i]}">${color[i]}</option>`
            i+=1
        }
    })
;
}
tutu().then(_ => console.log(names) )

addCart.addEventListener('click', () =>{   
    let quantity = document.getElementById('quantity').value
    let color = document.getElementById('colors').value
    let product =JSON.parse(localStorage.getItem('product'))
    let i =0
    if (product === null){
        product = [{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
    }else{
        product= [...product,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
        
    }
    product = JSON.stringify(product)
    localStorage.setItem('product',product)
    console.log(product)



    // let productItem = [product,{id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}]
    // localStorage.setItem('test',JSON.stringify(productItem))
    // console.log(localStorage.getItem('test'))
    // let u = JSON.parse(localStorage.getItem('test'))
    // console.log(u)

    
    

    
    
    // let i =0
    // if (productItem === null){
    //     productItem= {id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}
    // }
    // while (i===productItem.length){
    //     let idStore = productItem[i].id
    //     let colorStore = productItem[i].color
    //     if(id===idStore & color===colorStore){
    //         productItem[i].quantity += quantity
    //     }else{
    //         if(i === productItem.length){
    //             productList = {id:id,color:color,quantity:quantity,nameItem:names,price:priceItem,img:imgItem}
    //         }
    //     }
    //     i+=1
    // }
    // // let list = JSON.stringify([...color,productItem,productList])
    // let test = [productItem,productList]
    // console.log(test)
    // localStorage.setItem('product',list)
    

})
// let test = {id:id,te:'tetstset'}
// localStorage.setItem('ty',JSON.stringify(test))
// let hg = JSON.parse(localStorage.getItem('ty'))
// console.log(hg)
// let df = JSON.parse(hg)
// console.log(df)

// console.log('teststeestsetsetestst')
// let ty = JSON.stringify(test)
// let yu =JSON.parse(ty)
// console.log(test)
// console.log(ty)
// console.log(yu)
// let test = [{id:12457,color:'red',quantity:12},{id:4520,color:'lol',quantity:14}]
// let i =0
// console.log(test)
// let u = {id:12457,color:'red',quantity:10}
// let t = {id:12457,color:'ye',quantity:10}
// while (i< test.length){
//     if(u.id===test[i].id & u.color===test[i].color){
//         test[i].quantity += u.quantity
//     }else{
//         console.log('sasaas')
//     }
//     i+=1
// }
// console.log(test)


// let i =0
// let test = 10
// while (i<=test){
//     i+=1
//     console.log(i)
// }