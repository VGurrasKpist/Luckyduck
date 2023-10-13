const menuENG;
const menuSV;

function fetchData(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        menuENG = response.menuENG; 
        menuSV = response.menuSV; 
  
        if (typeof callback === "function") {
          callback();
        }
      }
    };
  
    xhttp.open("GET", "food.json", true); 
    xhttp.send();
  }
  