//currentFoodList 
var data = [];
var meatTypes = []; 
var fullMenu =[];
var currentFood = []; // an list of current food according to chosen filterboxes
var allergiesInput = []; //all allergies in an list
var currentLang = "sv";
// get data from database
fetch('food.json') 
.then((response) => { 
   return response.json(); 
}) 
.then((data) => { 
  fullMenu=data;
  currentFood = data;  
  console.log(data);
  console.log("i fetch, steg 2: jsoniferad data");
  
}).catch((error) => {
  console.error('Fetch error:', error);
});

//elins code, purpose => filter food after user input
//first select all the right elements 
const veggiBox = document.getElementById('veg'); 
const chickenBox = document.getElementById('chicken'); 
const beefBox = document.getElementById('beef'); 
const porkBox = document.getElementById('pork'); 
const seaBox = document.getElementById('sea'); 
const glutenBox = document.getElementById('glu');
const lactoseBox = document.getElementById('laktos');
const placeForFood = document.getElementById('placeHolderForFood');



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
        console.log(currentFood);
        
        
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
    addAllergie("lactose"); 
    filterFoodList();
  } 
  else{ 
    removeAllergie("lactose");
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

//  //display funtion the current food-list
//  function showFood(){
//    currentFood.forEach(food => {
//      var h3Elem = document.createElement('h3');
//      var textToOut = food.title[currentLang];
//      console.log(textToOut)
//      h3Elem.innerHTML = textToOut;
//      placeForFood.appendChild(h3Elem);
//  });
//}


 //modify the current foodlist with current filters
 function filterFoodList(){

  let filteredFood =fullMenu;
console.log(filteredFood) ;
console.log( "i filterfood, steg 1");
//first remove all food with any of allergie of choice
  allergiesInput.forEach((allergie) => {
    filteredFood = filteredFood.filter((food) => {
      console.log(filteredFood);
      console.log("i filterfood, steg 2 när den precis ska filtrerea bort allergi");
      return !food.allergies.includes(allergie);
    });
  })
  // Filtering foods by selectedMeat
  filteredFood = filteredFood.filter((food) => {
    console.log(filteredFood);
    console.log("i filterfood, steg 3, när den ska filtrera fram köttval");
    console.log("köttval:");
    console.log(meatTypes);
    return meatTypes.some(selectedMeat => food.meatTypes.includes(selectedMeat));
  });
currentFood=filteredFood;
data=filteredFood;
console.log(data);
showFood();
 }




 function showFood(){
   //begin with delating all food in the foodCard
   foodCard.innerHTML="";
   if(localStorage.getItem(isSwedish)){
     translateSwedish();
   }
   else translateEnglish();
 }
 
 
 
 //------------------ Alfred och Andreas Kod-----------------
 
 let sumTotal =0;
 let cartItems =[];
let divCart;
var svDropDown=document.getElementById("sv")
var enDropDown=document.getElementById("en")
var foodCard=document.querySelector(".meny-container");
document.querySelector("h2").style.fontFamily="'Poppins', sans-serif";
document.querySelector("h3").style.fontFamily="'Poppins', sans-serif";
const labelVeg=document.querySelector("#label1");
const labelVeg2=document.querySelector("#label2");
const labelVeg3=document.querySelector("#label3");
const labelVeg4=document.querySelector("#label4");
const labelVeg5=document.querySelector("#label5");

const labelAllergy=document.querySelector("#allergy1");
const labelAllergy2=document.querySelector("#allergy2");

const mainCourseH2=document.querySelector("#mainCourseH2");
const allergiesH2=document.querySelector("#allergiesH2");
divCart =document.createElement("div");

const h1menu=document.querySelector("h1");
const isSwedish=localStorage.getItem("isSwedish");
const isEnglish=localStorage.getItem("isEnglish");





//Translate to English function
function translateEnglish(){

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
  h1menu.textContent="Menu";
}

//Translate to Swedish Function
function translateSwedish(){

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
  h1menu.textContent="Meny";

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





 




 