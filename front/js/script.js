const item = document.getElementById("items")

// fetch de l'api products pour recuper chaque produit et intégrer leur donné dans le HTML
fetch('http://localhost:3000/api/products')
    .then(res=>res.json())
    .then(data=>{
        const lenght = data.length
        let i = 0
        while (i < lenght){
            let element = data[i]
            item.innerHTML += `
            <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.description}, ${element.name}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>
          `
            i += 1
        }
    })