const foodInput = document.getElementById("food-input")
const calInput = document.getElementById("cal-input")
const priceInput = document.getElementById("price-input")
const itemList = document.querySelector("#item-list")
const _addFoodBtn = document.querySelector(".btn")
const clearBtn = document.querySelector("#clear")
const clock = document.getElementById("clock")
const filterItem = document.querySelector("#filter")
const totalDiv = document.querySelector(".total-div")

setInterval(function(){
    let date = new Date()
    clock.innerHTML = date.toLocaleTimeString();
}, 1000)

function displayItemFromStorage(){

    let itemsFromStorage = getCalInputFromStorage()
    let _itemsFromStorage = getFoodInputFromStorage()
    let _priceInputFromStorage = getPriceInputFromStorage()

    for(let i = 0; i < itemsFromStorage.length; i++){
        addFoodListToTheDom(_itemsFromStorage[i], itemsFromStorage[i], _priceInputFromStorage[i])
    }
    checkLis()
}

function addFood(e){
    e.preventDefault();

    let _foodInput = foodInput.value
    let _calInput = calInput.value
    let _priceInput = priceInput.value

    if(_foodInput === "" || _calInput === "" || _priceInput === ""){
        alert("Please Entry The Item")
    }else{

    addFoodListToTheDom(_foodInput, _calInput, _priceInput)
    addFoodToStorage(_foodInput, _calInput, _priceInput)
    checkLis()
    }
}    

function addFoodListToTheDom(_foodInput, _calInput, _priceInput){

    if(_foodInput === "" || _calInput === ""){
        alert("Please Entry The Item")
    }

        let foodInput = _foodInput
          .toLowerCase()
          .split(" ")
          .map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
          .join(" ");

    let li = document.createElement("li")
    li.className = "food-container"

    let p = document.createElement("p")
    p.className = "remove-item btn-link"
    const text1 = document.createTextNode(foodInput)
   p.appendChild(text1)

    let button2 = document.createElement("button")
    button2.className = "remove-item btn-link"
    const text2 = document.createTextNode(_calInput + " Cal")
    button2.appendChild(text2)

    
    let button4 = document.createElement("button")
    button4.className = "remove-item btn-link"
    const text4 = document.createTextNode(_priceInput + " $")
    button4.appendChild(text4)
    
    li.appendChild(p)
    li.appendChild(button2)
    li.appendChild(button4)



    let button3 = document.createElement("button")
    button3.className = "remove-item btn-link text-red"

    let icon = document.createElement("i")
    icon.className = "fa-solid fa-xmark"

    button3.appendChild(icon)

    li.appendChild(button3)
    
    itemList.appendChild(li)
    
}

function checkLis(){
    
    foodInput.value = "";
    calInput.value = "";
    priceInput.value = ""
    
    const liList = document.querySelectorAll("li")
    if(liList.length === 0){
        clearBtn.style.display = "none"
        filter.style.display = "none"
        totalDiv.style.display = "none"
    }else{
        clearBtn.style.display = "block"
        filter.style.display = "block"
        totalDiv.style.display = "flex"
    }
    
    _addFoodBtn.innerHTML = "<i class='fa-solid fa-plus'></i> \xa0\ Add Lists";
    
    calCalculator()
    priceCalculator()
    
}

// //! adding all the information to the local Storage input by the user
function addFoodToStorage(value1, value2, value3){
    
    let foodInputFromStorage = getFoodInputFromStorage() 
    let calInputFromStorage = getCalInputFromStorage() 
    let priceInputFromStorage = getPriceInputFromStorage()
    
    //adding newItem to the itemsFromStorage array
    foodInputFromStorage.push(value1);
    calInputFromStorage.push(value2);
    priceInputFromStorage.push(value3);
    
    //set newItem to the local storage
    localStorage.setItem("item", JSON.stringify(foodInputFromStorage));
    localStorage.setItem("item1", JSON.stringify(calInputFromStorage));
    localStorage.setItem("item2", JSON.stringify(priceInputFromStorage));
    
}

// //!  getting food Input From Storage
function getFoodInputFromStorage() {
    
    if(localStorage.getItem("item" ) === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("item"))
    }
    return itemsFromStorage
}

function getCalInputFromStorage() {
    
    if(localStorage.getItem("item1" ) === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("item1"))
    }
    return itemsFromStorage
}

function getPriceInputFromStorage() {
    
    if(localStorage.getItem("item2" ) === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("item2"))
    }
    return itemsFromStorage
}

// ! removing food list from the dom

function removeFoodListFromTheDom(e){

    if(e.target.parentElement.parentElement.classList.contains("food-container")){
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item){
    
    if(confirm("Are you Sure?")){
        item.remove();
        calCalculator()

        removeFoodInputFromStorage(item.children[0].textContent)
        removeCalInputFromStorage(item.children[1].textContent)
        removePriceInputFromStorage(item.children[2].textContent)

        checkLis()
    }
}

// ! removing food Input From Storage
function removeFoodInputFromStorage(item){
    let _item = item.toLowerCase()
    
    let _foodInputFromStorage = getFoodInputFromStorage()
    let foodInputFromStorage = _foodInputFromStorage.filter((i) => i !== _item)
   localStorage.setItem("item", JSON.stringify(foodInputFromStorage))

}

// ! removing calories Input From Storage
function removeCalInputFromStorage(item){

    let _item = item.slice(0, -4)
     
    let _calInputFromStorage =  getCalInputFromStorage() 
    let calInputFromStorage = _calInputFromStorage.filter((i) => i !== _item)
    localStorage.setItem("item1", JSON.stringify(calInputFromStorage))
    calCalculator()
    priceCalculator()

}

// ! removing price Input From Storage
function removePriceInputFromStorage(item){

    let _priceInputFromStorage =  getPriceInputFromStorage() 
    let priceInputFromStorage = _priceInputFromStorage.filter((i) => i !== item[0])
    localStorage.setItem("item2", JSON.stringify(priceInputFromStorage))
    calCalculator()
    priceCalculator()

}

function clearItem (){
    while(itemList.firstChild){
        itemList.firstChild.remove()
    }

    if(confirm("Are you Sure?")){
        localStorage.removeItem("item")
        localStorage.removeItem("item1")
        localStorage.removeItem("item2")
        checkLis()
    }
}

function calCalculator(){

    let _calInputFromStorage =  getCalInputFromStorage() 
    let total = 0;

   for(let i = 0; i < _calInputFromStorage.length; i++) {
        total += +_calInputFromStorage[i];
   }
   document.getElementById("total").textContent =  `Total Calories: ` + total ;
   localStorage.setItem("total", JSON.stringify(total))
   
   return total;

}

function priceCalculator(){

    let _priceInputFromStorage =  getPriceInputFromStorage() 
    let totalPrice = 0;

   for(let i = 0; i < _priceInputFromStorage.length; i++) {
        totalPrice += +_priceInputFromStorage[i];
   }
   document.getElementById("totalPrice").textContent =  `Total Price: ` + totalPrice + " $";
   localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
   
   console.log(totalPrice);
   return totalPrice;

}
priceCalculator()

function filterLis(e){

    const liList = itemList.querySelectorAll("li")  

       liList.forEach((item) => {
        let itemList = item.firstChild.textContent.toLowerCase()
        let text = e.target.value.toLowerCase()
        if(itemList.indexOf(text) != -1){
            item.style.display = "flex";
        }else{
            item.style.display = "none";
        }
       });
}


_addFoodBtn.addEventListener("click" , addFood)
itemList.addEventListener("click", removeFoodListFromTheDom)
document.addEventListener("DOMContentLoaded", displayItemFromStorage)
clearBtn.addEventListener("click", clearItem)
filterItem.addEventListener("input", filterLis)


// code for changing between account and profile
document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    const accountLink = document.getElementById("account-icon");

    if (isAuthenticated === 'true') {
        // User is logged in, show the account page
        accountLink.href = "/account-section/main-account-section/index.html";
    } else {
        // User is not logged in, show the make an account page
        accountLink.href = "/account-section/index.html";
    }
});
