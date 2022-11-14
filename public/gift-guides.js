let forHimBtn = document.querySelector(".him");
let forHerBtn = document.querySelector(".her");
let forTeensBtn = document.querySelector(".teens");
let forKidsBtn = document.querySelector(".kids");
let forFurBtn = document.querySelector(".fur");

//trying to brainstorm how this will look. I think maybe I will need to append child this data into parent "#display" from my html. Initially I will only want to actually display the image and then create transparency and show the name over the image upon a mouseover. And maybe have an additional window or square with a high z-index appear (almost like my dropdown menu) with a description of the item and "under x price maybe as a header "



let filterGiftGuide = (event) => {
  //let's get a reference to the element that was clicked
  let theButton = event.target;
  //then, perhaps, there is an attritube on the element
  let category = theButton.getAttribute("category");
  //that tells us our category
  console.log(category);
// axios.get('http://localhost:5500/text').then(res => console.log(res.data))
  axios.get(`http://localhost:5500/giftGuide/${category}`)
  .then((res) => {
     console.log(res.data)
     let display = document.getElementById('display')
     res.data.forEach(gift => {
          display.innerHTML=`
               <div> 
                    <h3> ${gift.gift_name} </h3>
                   <img class ="giftImage" src= '${gift.image_url}'> </img>
               </div>
          `
     })
});
};

forHimBtn.addEventListener("click", filterGiftGuide);
forHerBtn.addEventListener("click", filterGiftGuide);
forTeensBtn.addEventListener("click", filterGiftGuide);
forKidsBtn.addEventListener("click", filterGiftGuide);
forFurBtn.addEventListener("click", filterGiftGuide);
