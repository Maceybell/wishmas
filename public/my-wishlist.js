let displayWish = document.querySelector(".display-wishlist")
let deleteBtn = document.querySelector(".delete")

let getWishlistItems = () => {
    axios.get("http://localhost:5500/wishlist")
    .then((res) => {
        console.log(res.data)
        res.data.forEach((gift) => {
            displayWish.innerHTML+=`
                <div id="${gift.gifts_id}" class="gift-card">
                 <div class="img-holder">
                 <a href='${gift.web_link}'><img class ="giftImage" src= '${gift.image_url}'> </img></a> </div>
                 <br>
                 <h3 class = "giftname"> ${gift.gift_name} </h3>
                <br>
                <button class = "delete"> Remove</button>
            </div>
            `
        })
    
    
    
    })
    

    .catch((err) => console.log(err))
    
}

let deleteItem = (event) => {
    
    let delBtn = event.target;
    let id = delBtn.getAttribute("gifts_id")
    
    axios.delete(`http://localhost:5500/wishlist/${id}`)
        .then(() => getWishlistItems())
        .catch(err => console.log(err))
}

function handleSubmit(e) {
    e.preventDefault()

    if (isNan(priceInput)){
         alert('Price must contain only numbers')   
         return
    }

    let body = {
         giftName: nameInput.value,
         imgURL: imgInput.value , 
         price: priceInput.value, 
         webLink: linkInput.value, 
         description: itemDesc.value, 
         // giftId: do I need this or will it automatically include this bc of the table format?
    }

    axios.post('http://localhost:5500/wishlist', body)
    .then(()=> {
         //I need a function to get gift items on wishlist page 
    })
}

getWishlistItems()

deleteBtn.addEventListener("click", deleteItem)