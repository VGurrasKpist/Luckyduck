var data = [];
let sumTotal =0;
let cartItems =[];
var meatTypes = []; 
var fullMenu =[];
var allergiesInput = []; //all allergies in an list
let divCart;
var svDropDown=document.getElementById("sv")
var enDropDown=document.getElementById("en")
var foodCard=document.querySelector(".meny-container");
document.querySelector("h2").style.fontFamily="'Poppins', sans-serif";
const labelVeg=document.querySelector("#label1");
const labelVeg2=document.querySelector("#label2");
const labelVeg3=document.querySelector("#label3");
const labelVeg4=document.querySelector("#label4");
const labelVeg5=document.querySelector("#label5");

const priceAscendingBox = document.getElementById('ascending')
const priceDescendingBox = document.getElementById('descending')

const labelAllergy=document.querySelector("#allergy1");
const labelAllergy2=document.querySelector("#allergy2");

const mainCourseH2=document.querySelector("#mainCourseH2");
const allergiesH2=document.querySelector("#allergiesH2");
divCart=document.createElement("div");

const h1menu=document.querySelector("h1");
const isSwedish=localStorage.getItem("isSwedish");
const isEnglish=localStorage.getItem("isEnglish");

var htmlElement = document.documentElement;


//-----------------FETCH----------

fetch('food.json').then((response) => {
  return response.json();
})

.then((data) => {
console.log(data);
fullMenu=data;


const veggiBox = document.getElementById('veg'); 
const chickenBox = document.getElementById('chicken'); 
const beefBox = document.getElementById('beef'); 
const porkBox = document.getElementById('pork'); 
const seaBox = document.getElementById('sea'); 
const glutenBox = document.getElementById('glu');
const lactoseBox = document.getElementById('laktos');
const placeForFood = document.getElementById('placeHolderForFood');


//----------------------ELINS BOXAR---------------------------
// add eventlisteners to all the filterboxes . They should each add values to an filterArray
porkBox.addEventListener("change", () =>{ 
  //when change: if veggiebox already checked put it in the foodlist 
  if(porkBox.checked){ 
        addMeattype("pork");  
        filterFoodList();        
  } else{ //else remove it from the list 
    removeMeattype("pork");
    filterFoodList();
  } 
});
// add eventlisteners to all the filterboxes . They should each add values to an filterArray
seaBox.addEventListener("change", () =>{ 
  //when change: if veggiebox already checked put it in the foodlist 
  if(seaBox.checked){ 
    console.log("Seafood checkbox is checked")
        addMeattype("seafood");  
        filterFoodList();        
  } else{ //else remove it from the list 
    console.log("Seafood checkbox is not checked")
    removeMeattype("seafood");
    filterFoodList();
  } 
});


beefBox.addEventListener("change", () =>{ 
  //when change: if veggiebox already checked put it in the foodlist 
  if(beefBox.checked){ 
        addMeattype("beef");  
        filterFoodList();        
        
  } else{ //else remove it from the list 
    removeMeattype("beef");
    filterFoodList();
  } 
});

veggiBox.addEventListener("change", () =>{ 
  //when change: if veggiebox already checked put it in the foodlist 
  if(veggiBox.checked){ 
        addMeattype("vegetarian");  
        filterFoodList();
        console.log(veggiBox.checked);
        
        
  } else{ //else remove it from the list 
    removeMeattype("vegetarian");
    filterFoodList();
  } 
}); 
// add eventlisteners to all the filterboxes . They should each add values to an filterArray
chickenBox.addEventListener("change", () =>{ 
  //when change: if veggiebox already checked put it in the foodlist 
  if(chickenBox.checked){ 
        addMeattype("chicken");  
        filterFoodList();
     
  } else{ //else remove it from the list 
    removeMeattype("chicken");
    filterFoodList();
  } 
}); 


lactoseBox.addEventListener("change", () => {
  //add to list, else remove from list
  if(lactoseBox.checked){ 
    addAllergie("lactose"); 
    filterFoodList();
  } 
  else{ 
    removeAllergie("lactose");
    filterFoodList();
  } 
}); 
glutenBox.addEventListener("change", () => {
  //add to list, else remove from list
  if(glutenBox.checked){ 
    addAllergie("gluten"); 
    filterFoodList();
  } 
  else{ 
    removeAllergie("gluten");
    filterFoodList();
  } 
}); 

//functions to add or remove allergies from allergielist 
function addAllergie(allergie){
  //add to list 
      allergiesInput.unshift(allergie);
      filterFoodList();
}
function removeAllergie(allergie){
//remove the allergie from list
  const indexOfAllergie = allergiesInput.indexOf(allergie); 
  allergiesInput.splice(indexOfAllergie, 1); 
  filterFoodList();
  }

//funtions for meattypes
function addMeattype(meatofchoice){
//add to list 
meatTypes.unshift(meatofchoice);
console.log(meatTypes);
}

function removeMeattype(meatofchoice){
//remove the allergie from list
const indexOfMeat = meatTypes.indexOf(meatofchoice); 
meatTypes.splice(indexOfMeat, 1); 
}


function filterFoodList() {
    foodCard.innerHTML = "";
    let filteredFood = fullMenu;
  
    // Check if any allergy checkbox is unchecked
    if (allergiesInput.length > 0) {
      filteredFood = filteredFood.filter((food) => {
        return !allergiesInput.some((allergie) => {
          return food.allergies.includes(allergie);
        });
      });
    }
    
  
    if (meatTypes.length > 0) {
      filteredFood = filteredFood.filter((food) => {
        return meatTypes.some((selectedMeat) => food.meatTypes.includes(selectedMeat));
      });
    }
  
    data = filteredFood;
  
    // Check if no filters are selected, then display all food items
    if (allergiesInput.length === 0 && meatTypes.length === 0) {
      data = fullMenu;
    }
  
    console.log(data);
    checkLanguage();
  }
  
  


//-------------------------------------------A+A Börjar här---------------------
//---------------------------------------Translate to English function
function translateEnglish(){
  htmlElement.setAttribute("lang", "en"); 
  h1menu.innerHTML = 'Lucky<br>Duck';

  data.forEach(function(currentValue,index){
    const foodTD=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newDescription=document.createElement("p");
    const menuChoice=document.createElement("div");
    const buyButton=document.createElement("input");
    const deleteButton=document.createElement("input");
    const timesCourseDisplay=document.createElement("span");
    const priceDisplay=document.createElement("span");
    let timesCourse=0;
  

    const newClassName = 'custom-font';
    const spans = document.querySelectorAll('span');

    spans.forEach(span => {
    span.classList.add(newClassName);

    buyButton.classList.add(newClassName);
});
    

    foodCard.appendChild(foodTD);
    foodTD.appendChild(newTitle).style.fontFamily="'Poppins', sans-serif";
    newDescription.innerHTML=currentValue.description.en;
    foodTD.appendChild(newDescription).style.fontFamily="'Poppins', sans-serif";
    newDescription.appendChild(menuChoice);
    foodCard.appendChild(foodTD);
    menuChoice.appendChild(buyButton);
    menuChoice.appendChild(timesCourseDisplay);
    menuChoice.appendChild(deleteButton);
    menuChoice.appendChild(priceDisplay);
    document.querySelector(".side-box").appendChild(divCart);

        //-- Values for our english page"
        buyButton.type="button";
        buyButton.value="+";
        deleteButton.type="button";
        deleteButton.value="-" //"\u{1F5D1}"; -Trashcan
        timesCourseDisplay.innerHTML=timesCourse;
        newTitle.innerHTML=currentValue.title.en;
        divCart.id ="cart";
        divCart.innerHTML ="Your shop cart is empty!";
        priceDisplay.innerHTML = "<br>" + currentValue.price + " kr";

        // Event Listeners
        buyButton.addEventListener("click", function () {
          timesCourse++;
          timesCourseDisplay.textContent =timesCourse; 
          cartBuyEventListener(currentValue, index);
        });

        deleteButton.addEventListener("click", function () {
          if (timesCourse > 0) {
            timesCourse--;
            timesCourseDisplay.textContent =timesCourse; 
            cartDeleteEventListener(currentValue, index);
          }
        });

    })

    // Shopcart start
    function cartDeleteEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity--;
    
        if (cartItem.quantity ===0) {
          const itemIndex =cartItems.indexOf(cartItem);
          cartItems.splice(itemIndex, 1);
        }
        updateCart();
      }
    }
    function cartBuyEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cartItems.push({
          item: item,
          quantity: 1,
        });
      }
      updateCart();
    }

    //Update CartItems beginning
    function updateCart() {
      sumTotal =0;
      cartItems.forEach((cartItem) => {
        sumTotal +=(Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price) * cartItem.quantity;
      });
      const cartContent =cartItems
    .map((cartItem) => `${cartItem.item.title.en} - ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price} kr (Times: ${cartItem.quantity}, Sum: ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] * cartItem.quantity : cartItem.item.price * cartItem.quantity} kr)`)
    .join("<br>");

  if (cartItems.length !==0) {
    divCart.innerHTML =`${cartContent}<br>Total amount: ${sumTotal} kr`;
  } else {
    divCart.innerHTML ="Your shop cart is empty!";
  }
}
    //Update CartItems ending

  labelVeg.textContent="Vegetarian";
  labelVeg2.textContent="Chicken";
  labelVeg3.textContent="Beef";
  labelVeg4.textContent="Pork";
  labelVeg5.textContent="Seafood";
  labelAllergy.textContent="Gluten-free";
  labelAllergy2.textContent="Dairy-free";
  mainCourseH2.textContent="Main Course";
  allergiesH2.textContent="Allergies";
  
}

//-----------------------------------Sort price Funktion
//---The functions start by sorting the array by comparing the items against each other one on one and giving them a number, 1 or -1.
//---Then it sorts them after how many points it got. The one with most points is at the top and the with least is at the bottom. It saves this new list in a new array.
//---It then says that data is equal to this new array before calling on clearForfoodTD.
function unsorted(){
  const unsortedFoods = data.toSorted((a, b) => (a.id > b.id ? 1 : -1));
  data=unsortedFoods;
  clearForfoodTD();
}
function sortedAscending(){
  const sortedFoods = data.toSorted((a, b) => (a.price > b.price ? 1 : -1));
  data = sortedFoods

  clearForfoodTD();
}
function sortedDescending(){
   const sortedFalling = data.toSorted((a, b) => (a.price > b.price ? -1 : 1));
  data = sortedFalling
  clearForfoodTD();
}

//---This listens fo a click on the checkbox with the right id. If it detects a click one of two things will happen.
//---If the box is checked in then it will start by calling on the function above. It will prosed by making the other sorting checkbox un checked.
//---It logs data so we can see if anything goes wrong before calling on checkLanguages so everything is shown on screen.

//---If it detects that the box is uncheked by the user then it will run unsorted so everything is sorted by ID. It then calls on checkLanguage so the site can refresh.
priceAscendingBox.addEventListener("change", () => {

  if(priceAscendingBox.checked){ 
    sortedAscending();
    priceDescendingBox.checked = false;
    console.log(data);
    checkLanguage();
  } 
  else{ 
    unsorted();
    checkLanguage();
  } 
}); 
priceDescendingBox.addEventListener("change", () => {

  if(priceDescendingBox.checked){ 
    sortedDescending();
    priceAscendingBox.checked = false;
    console.log(data)
    checkLanguage();
  } 
  else{ 
    unsorted();
    checkLanguage();
  } 
});
//-----------------------------------Translate to Swedish Function
  function translateSwedish(){
  console.log(data);
  htmlElement.setAttribute("lang", "sv"); 
  h1menu.innerHTML = 'Lucky<br>Duck';

   data.forEach(function(currentValue,index){
    const foodTD=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newDescription=document.createElement("p");

    const menuChoice=document.createElement("div");
    const buyButton=document.createElement("input");
    const deleteButton=document.createElement("input");
    const timesCourseDisplay=document.createElement("span");
    const priceDisplay=document.createElement("span");

    let timesCourse=0;

    
    //Make price font smaller
const newClassName = 'custom-font';
const spans = document.querySelectorAll('span');

spans.forEach(span => {
    span.classList.add(newClassName);

    buyButton.classList.add(newClassName);
});


    foodCard.appendChild(foodTD);
    foodTD.appendChild(newTitle).style.fontFamily="'Poppins', sans-serif";
    newDescription.innerHTML=currentValue.description.sv;
    foodTD.appendChild(newDescription).style.fontFamily="'Poppins', sans-serif";
    newDescription.appendChild(menuChoice);
    foodCard.appendChild(foodTD);

    menuChoice.appendChild(buyButton);
    menuChoice.appendChild(timesCourseDisplay);
    menuChoice.appendChild(deleteButton);
    menuChoice.appendChild(priceDisplay);
    document.querySelector(".side-box").appendChild(divCart);


        //-- Olika "värden för vår svenska funktion"
        buyButton.type="button";
        buyButton.value="+";
        deleteButton.type="button";
        deleteButton.value="-" //"\u{1F5D1}"; -Trashcan
        timesCourseDisplay.innerHTML=timesCourse;
        newTitle.innerHTML=currentValue.title.sv;
        divCart.id ="cart";
        divCart.innerHTML ="Din kundvagn är tom!";
        priceDisplay.innerHTML = "<br>" + currentValue.price + " kr";

        // Event Listeners
        buyButton.addEventListener("click", function () {
          timesCourse++;
          timesCourseDisplay.textContent =timesCourse; 
          cartBuyEventListener(currentValue, index);
        });

        deleteButton.addEventListener("click", function () {
          if (timesCourse > 0) {
            timesCourse--;
            timesCourseDisplay.textContent =timesCourse; 
            cartDeleteEventListener(currentValue, index);
          }
        });

    })

    // Kundvagn börjar
    function cartDeleteEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity--;
    
        if (cartItem.quantity ===0) {
          const itemIndex =cartItems.indexOf(cartItem);
          cartItems.splice(itemIndex, 1);
        }
        updateCart();
      }
    }
    function cartBuyEventListener(item, index) {
      const cartItem =cartItems.find((cartItem) => cartItem.item.id ===item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cartItems.push({
          item: item,
          quantity: 1,
        });
      }
      updateCart();
    }
    //Uppdatera kundvagn början
    function updateCart() {
      sumTotal =0;
      cartItems.forEach((cartItem) => {
        sumTotal +=(Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price) * cartItem.quantity;
      });
      const cartContent =cartItems
    .map((cartItem) => `${cartItem.item.title.sv} - ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] : cartItem.item.price}kr (Antal: ${cartItem.quantity}, Totalt pris: ${Array.isArray(cartItem.item.price) ? cartItem.item.price[0] * cartItem.quantity : cartItem.item.price * cartItem.quantity} kr)`)
    .join("<br>");

  if (cartItems.length !==0) {
    divCart.innerHTML =`${cartContent}<br>Totalsumma: ${sumTotal} kr`;
  } else {
    divCart.innerHTML ='Din kundvagn är tom';
  }
}
    //Uppdatera kundvagn slut

  labelVeg.textContent="Vegetariskt";
  labelVeg2.textContent="Kyckling";
  labelVeg3.textContent="Nötkött";
  labelVeg4.textContent="Fläsk";
  labelVeg5.textContent="Fisk & Skaldjur";
  labelAllergy.textContent="Glutenfritt";
  labelAllergy2.textContent="Laktosfritt";
  mainCourseH2.textContent="Huvudrätt";
  allergiesH2.textContent="Allergier";
}

var clear=document.querySelector(".meny-container");

function clearForfoodTD(){
  clear.innerHTML="";
};


// Check if Swedish or English is in local storage
function checkLanguage() {
  
    if (isSwedish ==="true") {
      translateSwedish();
    } else if (isEnglish ==="true") {
      translateEnglish();
    } else {
      // Default to Swedish if neither language is selected
      localStorage.setItem("isSwedish", "true");
      translateSwedish();
    }
  }
  
  // Attach the checkLanguage function to the onload event
  onload=checkLanguage;
  
  // Language dropdown selection
  enDropDown.addEventListener("click", function () {
    console.log("User choose English");
    localStorage.clear();
    localStorage.setItem("isEnglish", "true");
    clearForfoodTD();
    translateEnglish();
  });
  
  svDropDown.addEventListener("click", function () {
    console.log("User choose Swedish");
    localStorage.clear();
    localStorage.setItem("isSwedish", "true");
    clearForfoodTD();
    translateSwedish();
  });
  


//Sortera efter pris


// function sortedPrise(){
//   const sortedFoods = data.sort((a, b) => (a.price > b.price ? 1 : -1));
//   console.log(sortedFoods);
// }

// sortedPrise()

// function sortedPrise2(){
//   const sortedFoods = data.sort((a, b) => (a.price > b.price ? -1 : 1));
//   console.log(sortedFoods);
// }

// sortedPrise2()




}).catch(function(error){
  console.error("something went wrong with retriving data")
  console.log(error)
})
