
var data="";
var svDropDown=document.getElementById("sv")
var enDropDown=document.getElementById("en")
var foodCard=document.querySelector(".meny-container");
document.querySelector("h2").style.fontFamily = "'Poppins', sans-serif";
document.querySelector("h3").style.fontFamily = "'Poppins', sans-serif";
const labelVeg= document.querySelector("#label1");
const labelVeg2= document.querySelector("#label2");
const labelVeg3= document.querySelector("#label3");
const labelVeg4= document.querySelector("#label4");
const labelVeg5= document.querySelector("#label5");

const labelAllergy=document.querySelector("#allergy1");
const labelAllergy2=document.querySelector("#allergy2");

const mainCourseH2=document.querySelector("#mainCourseH2");
const allergiesH2=document.querySelector("#allergiesH2");

const h1menu=document.querySelector("h1");


//-----------------FETCH----------

fetch('food.json').then((response) => {
  return response.json();
})

.then((data) => {
console.log(data);



//Translate to English function
function translateEnglish(){

  data.forEach(function(currentValue,){
    const newDiv=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newParagraph=document.createElement("p");
    
    newTitle.innerHTML=currentValue.title.en;
    newDiv.appendChild(newTitle).style.fontFamily = "'Poppins', sans-serif";
    foodCard.appendChild(newDiv);

    newParagraph.innerHTML=currentValue.description.en;
    newDiv.appendChild(newParagraph).style.fontFamily = "'Poppins', sans-serif";;
    foodCard.appendChild(newDiv);  
    })

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

  data.forEach(function(currentValue,){
    const newDiv=document.createElement("div");
    const newTitle=document.createElement("h2");
    const newParagraph=document.createElement("p");
    
    newTitle.innerHTML=currentValue.title.sv;
    newDiv.appendChild(newTitle).style.fontFamily = "'Poppins', sans-serif";
    foodCard.appendChild(newDiv);

    newParagraph.innerHTML=currentValue.description.sv;
    newDiv.appendChild(newParagraph).style.fontFamily = "'Poppins', sans-serif";;
    foodCard.appendChild(newDiv);
    })

  labelVeg.textContent="Vegetariskt";
  labelVeg2.textContent="Kyckling";
  labelVeg3.textContent="Nötkött";
  labelVeg4.textContent="Fläsk";
  labelVeg5.textContent="Fisk & Skaldjur";
  labelAllergy.textContent="Glutenfritt";
  labelAllergy2.textContent="Laktosfriss";
  mainCourseH2.textContent="Huvudrätt";
  allergiesH2.textContent="Allergier";
  h1menu.textContent="Meny";


}

var clear = document.querySelector(".meny-container");

function clearForNewDiv(){
  clear.innerHTML="";
};


//Check if Swedish in local Storage
function checkSwedish(){

  const isSwedish=localStorage.getItem("isSwediish");

  if(isSwedish==="true"){
    translateSwedish();
  }
}
checkSwedish()


//Check if English in local Storage

function checkEnglish(){

  const isEnglish=localStorage.getItem("isEnglish");

  if(isEnglish==="true"){
    translateEnglish();
  }
}
checkSwedish();
checkEnglish();



//On first load default Swedish

onload=()=>{
  data.forEach(function(currentValue,){
        const newDiv=document.createElement("div");
        const newTitle=document.createElement("h2");
        const newParagraph=document.createElement("p");
        
        newTitle.innerHTML=currentValue.title.sv;
        newDiv.appendChild(newTitle).style.fontFamily = "'Poppins', sans-serif";
        foodCard.appendChild(newDiv);

        newParagraph.innerHTML=currentValue.description.sv;
        newDiv.appendChild(newParagraph).style.fontFamily = "'Poppins', sans-serif";;
        foodCard.appendChild(newDiv);

        })}
    

        //dropdown Choose language
        enDropDown.addEventListener("click", function(){
          console.log("user chose English")
          localStorage.clear();
          localStorage.setItem("isEnglish", "true");

          clearForNewDiv();
          translateEnglish();  
          });

          svDropDown.addEventListener("click", function(){
            console.log("user chose swedish")
            localStorage.clear();


            localStorage.setItem("isSwedish", "true");

            clearForNewDiv();
            translateSwedish();
    
            });


}).catch(function(error){
  console.error("something went wrong with retriving data")
  console.log(error)
})