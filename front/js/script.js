const item = document.getElementById("items")

// fetch de l'api products pour récupérer chaque produit et intégrer leur données dans le HTML
fetch('http://localhost:3000/api/products')
    .then(res=>res.json())
    .then(data=>{
        const lenght = data.length
        let i = 0

        // boucle pour crée tous les élements présent dans l'API
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