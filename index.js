//currentFoodList 

var meatTypes = []; 
var currentFood = []; // an list of current food according to chosen filterboxes
var allergiesInput = []; //all allergies in an list
var currentLang = "sv";
// get data from database
fetch('food.json') 
.then((response) => { 
   return response.json(); 
}) 
.then((data) => { 
  currentFood = data;  
  showFood();
}).catch((error) => {
  console.error('Fetch error:', error);
});
//meattypes should be filled from the beginning. 
//After one choice it should 

//select all the right elements 
const veggiBox = document.getElementById('veg'); 
const chickenBox = document.getElementById('chicken'); 
const beefBox = document.getElementById('beef'); 
const porkBox = document.getElementById('pork'); 
const seaBox = document.getElementById('sea'); 
const glutenBox = document.getElementById('glu');
const lactoseBox = document.getElementById('laktos');
const placeForFood = document.getElementById('placeHolderForFood');



// add eventlisteners to all the filterboxes . They should each add values to an filterArray
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
        addMeattype("Chicken");  
        filterFoodList();
     
  } else{ //else remove it from the list 
    removeMeattype("Chicken");
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



 //display funtion the current food-list
 function showFood(){
   currentFood.forEach(food => {
     var h3Elem = document.createElement('h3');
     var textToOut = food.title[currentLang];
     console.log(textToOut)
     h3Elem.innerHTML = textToOut;
     placeForFood.appendChild(h3Elem);
 });

 }
 //buggen är någonstans vid filteredfood meattypes. 

 //modify the current foodlist with current filters
 function filterFoodList(){
  let filteredFood =currentFood;
console.log(filteredFood); //denna är hela arrayen
//first remove all food with any of allergie of choice
  allergiesInput.forEach((allergie) => {
    filteredFood = filteredFood.filter((food) => {
      console.log(filteredFood);
      return !food.allergie.includes(allergie);
      
    });
  })
  // Filtering foods by selectedMeat
  filteredFood = filteredFood.filter((food) => {
    //error häri vid includes?
    console.log(meatTypes);
    return meatTypes.some(selectedMeat => food.meatType.includes(selectedMeat));
  });
currentFood=filteredFood;
 }










 




 