let forHimBtn = document.querySelector(".him");
let forHerBtn = document.querySelector(".her");
let forTeensBtn = document.querySelector(".teens");
let forKidsBtn = document.querySelector(".kids");
let forFurBtn = document.querySelector(".fur");
let wishlistBtn = document.querySelector(".wishlist")






let filterGiftGuide = (event) => {
  let theButton = event.target;
  let category = theButton.getAttribute("category");
  console.log(category);
  display.innerHTML = ''
  axios.get(`http://localhost:5500/giftGuide/${category}`)
  .then((res) => {
     console.log(res.data)
     res.data.forEach((gift) => {
          display.innerHTML+=`
               <div id="${gift.gifts_id}" class="gift-card"> 
                   <div class="img-holder"><img class ="giftImage" src= '${gift.image_url}' > </img>  </div>
                   <br>
                   <h3 class = "giftname"> ${gift.gift_name} $${gift.price} </h3>
                   <br>
                   <button onclick="addToWishlist(${gift.gifts_id})" class = "wishlist"> Add to Wishlist </button>
               </div>
          `
     })
});
};





let addToWishlist = (id, category) => {
     
     console.log('add to wishlist', id)
     axios.post(`http://localhost:5500/addWishItem/${id}`)
     .then((res) => {
          alert('added to wishlist')
       console.log(res.data)
})
}









forHimBtn.addEventListener("click", filterGiftGuide);
forHerBtn.addEventListener("click", filterGiftGuide);
forTeensBtn.addEventListener("click", filterGiftGuide);
forKidsBtn.addEventListener("click", filterGiftGuide);
forFurBtn.addEventListener("click", filterGiftGuide);
wishlistBtn.addEventListener("click", addToWishlist);


