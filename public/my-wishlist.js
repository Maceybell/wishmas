let displayWish = document.querySelector(".display-wishlist")
let deleteBtn = document.querySelector(".delete")
let form = document.querySelector('.custom')
let nameInput = document.querySelector('#fname')
let imgInput = document.querySelector('#lname')
let priceInput = document.querySelector('#price')
let linkInput = document.querySelector('#link')
let itemDesc = document.querySelector('#subject')
let display = document.getElementById('display')


let getWishlistItems = () => {
    
    displayWish.innerHTML=''
    axios.get("http://localhost:5500/wishlist")
    .then((res) => {
        console.log(res.data)
        res.data.forEach((gift) => {
            displayWish.innerHTML+=`
                <div id="${gift.gifts_id}" class="gift-card">
                 <div class="img-holder">
                 <a href='${gift.web_link}' target= _blank_><img class ="giftImage opcaity" src= '${gift.image_url}'> </img></a> </div>
                 <br>
                 <h3 class = "giftname"> ${gift.gift_name} $${gift.price} </h3>
                <br>
                <button onclick= "deleteItem(${gift.gifts_id})" class = "delete"> Remove</button>
            </div>
            `
        } 
        )

        
    
    
    
    })
    

    .catch((err) => console.log(err))
    
}

let deleteItem = (id) => {
    
    
    axios.delete(`http://localhost:5500/wishlist/${id}`)
        .then((res) => getWishlistItems())
        .catch(err => console.log(err))
}

function handleSubmit(e) {
    e.preventDefault()

  

    let body = {
         giftName: nameInput.value,
         imgURL: imgInput.value , 
         price: priceInput.value, 
         webLink: linkInput.value, 
         description: itemDesc.value, 
         
    }

    axios.post('http://localhost:5500/wishlist', body)
    .then((res)=> getWishlistItems())
    .catch(err => console.log(err))
         
    }

getWishlistItems()

form.addEventListener('submit', handleSubmit)

