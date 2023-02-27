let Url = "https://puce-attractive-bat.cyclic.app/"

RenderProducts(`${Url}products`)

let productsSec = document.getElementById("productsSec")

function RenderProducts(url) {
  let cardList = [];
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      data = data.products
      data.forEach((el) => {
        cardList.push(createCard(el))
      });
      console.log(cardList)
      productsSec.innerHTML = cardList.join(" ")
    })
    .catch(error => console.log(error))

}

function createCard(el) {
  let card = `<div class="card" >
    <div class="imgContainer"><img src=${el.img} alt=""></div>
    <p class="productBrand">${el.brand}</p>
    <p class="title">${el.title}</p>
    <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
    <p class="productPrice">Price: $${el.price}</p>
    <div><button id=${el._id} class="updateBtn" onclick="openUpdate(this)" >Update</button>
    <button id=${el._id} class="deleteBtn" onClick="Delete(this)">Delete</button></div>
  </div> `
  return card
}



// /............................................Updating Product....................//////////////////


// Update popup

function ShowUpdatePopup(value) {
  let divInfo = document.getElementById('popupdiv');
  if (divInfo.style.display == 'none') {
    divInfo.style.display = 'block';
    let form = document.getElementById("product-update")
    fetch(`${Url}products/${value}`)
      .then(res => res.json())
      .then((data) => {
        data = data.products
        form.productTitle.value = data.title
        form.productBrand.value = data.brand
        form.price.value = data.price
        form.image1.value = data.img
      })
    document.querySelector(".finalUpdateBtn").id = value
  } else {
    divInfo.style.display = 'none';
  }

}

function Hide() {
  let divInfo = document.getElementById('popupdiv');
  if (divInfo.style.display == 'block') {
    divInfo.style.display = 'none';
  } else {
    divInfo.style.display = 'block';
  }
}


function openUpdate(el) {
  ShowUpdatePopup(el.id)
}

async function Update(el) {
  let form = document.getElementById("product-update")

  let title = form.productTitle.value
  let brand = form.productBrand.value
  let price = form.price.value
  let img = form.image1.value

  let payload = { title, brand, price, img }

  await fetch(`${Url}products/update/${el.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  Hide()
  RenderProducts(`${Url}products`)

}

///////////////////////Delete Product/////////////////////////////

async function Delete(el) {
  await fetch(`${Url}products/delete/${el.id}`, {
    method: "DELETE",
  })
  RenderProducts(`${Url}products`)
}



/////////////.......................Add new product..............//////////////////////////

function openAddProduct() {
  let divInfo = document.getElementById('Newpopupdiv');
  if (divInfo.style.display == 'none') {
    divInfo.style.display = 'block';
  } else {
    divInfo.style.display = 'none';
  }

}

function HideAddNew() {
  divInfo = document.getElementById('Newpopupdiv');
  if (divInfo.style.display == 'block') {
    divInfo.style.display = 'none';
  } else {
    divInfo.style.display = 'block';
  }
}



async function Add() {
  let form = document.getElementById("product-add")

  let title = form.productTitle.value
  let brand = form.productBrand.value
  let price = form.price.value
  let img = form.image1.value
  let category = form.category.value

  let payload = { title, brand, price, img ,category}

  await fetch(`${Url}products/add`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  HideAddNew()
  RenderProducts(`${Url}products`)

}