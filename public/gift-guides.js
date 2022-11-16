let forHimBtn = document.querySelector(".him");
let forHerBtn = document.querySelector(".her");
let forTeensBtn = document.querySelector(".teens");
let forKidsBtn = document.querySelector(".kids");
let forFurBtn = document.querySelector(".fur");
let wishlistBtn = document.querySelector(".wishlist")
let form = document.querySelector('.custom')
let nameInput = document.querySelector('#fname')
let imgInput = document.querySelector('#lname')
let priceInput = document.querySelector('#price')
let linkInput = document.querySelector('#link')
let itemDesc = document.querySelector('#subject')
let display = document.getElementById('display')

// let deleteBtn = document.querySelector(".remove")




let filterGiftGuide = (event) => {
  //let's get a reference to the element that was clicked
  let theButton = event.target;
  //then, perhaps, there is an attritube on the element
  let category = theButton.getAttribute("category");
  //that tells us our category
  console.log(category);
  display.innerHTML = ''
// axios.get('http://localhost:5500/text').then(res => console.log(res.data))
  axios.get(`http://localhost:5500/giftGuide/${category}`)
  .then((res) => {
     console.log(res.data)
     res.data.forEach((gift) => {
          display.innerHTML+=`
               <div id="${gift.gifts_id}" class="gift-card"> 
                   <div class="img-holder"><img class ="giftImage" src= '${gift.image_url}' > </img>  </div>
                   <br>
                   <h3 class = "giftname"> ${gift.gift_name} </h3>
                   <br>
                   <button onclick="addToWishlist(${gift.gifts_id})" class = "wishlist"> Add to Wishlist </button>
               </div>
          `
     })
});
};


// I want the following function to add the chosen item to my wishlist page from this gift guide page. Is that a put post or get? Since this button is relted to items on another page should i just keep all JS front end here or should I go ahead and make a wishlist.js? What will make more sense and keep things more clear and organized but simple?



let addToWishlist = (id, category) => {
     
     console.log('add to wishlist', id)
     axios.post(`http://localhost:5500/addWishItem/${id}`)
     .then((res) => {
       console.log(res.data)
//       let wishlistDisplay = document.getElementById('wishlist-display')
//        res.data(gift =>  `
//                <div class="gift-card"> 
//                <div class="img-holder"><img class ="giftImage" src= '${gift.image_url}'> </img>  </div>
//                <br>
//                <h3 class = "giftname"> ${gift.gift_name} </h3>
//                <br>
//                <button class = "remove"> Remove from Wishlist </button>
//            </div>
//       `
// // })
})
}


// The following function I want to be a post. It will allow users to create their own gift item. But what is the syntax for that using sequel as oppsed to a db.json?


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



// The following function I want to be a delete. It will remove items from my wishlist page.

// function deleteCard(id) {
//      axios.delete(`http://localhost:5500/wishlist/${id}`)
//          .then(() => getListItems()) 
//          .catch(err => console.log(err))
//  } 

forHimBtn.addEventListener("click", filterGiftGuide);
forHerBtn.addEventListener("click", filterGiftGuide);
forTeensBtn.addEventListener("click", filterGiftGuide);
forKidsBtn.addEventListener("click", filterGiftGuide);
forFurBtn.addEventListener("click", filterGiftGuide);
wishlistBtn.addEventListener("click", addToWishlist);


