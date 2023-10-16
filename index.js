fetch('food.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
console.log(data);
//JSON data åtkomlig här





      
      
  })
  .catch((error) => {
  console.error("something went wrong with retriving data");
  console.log(error);  
  });
