const foodInput = document.getElementById("food-input")
const calInput = document.getElementById("cal-input")
const priceInput = document.getElementById("price-input")
const itemList = document.querySelector("#item-list")
const _addFoodBtn = document.querySelector(".btn")
const clearBtn = document.querySelector("#clear")
const clock = document.getElementById("clock")
const filterItem = document.querySelector("#filter")
const totalDiv = document.querySelector(".total-div")
const secTotalDiv = document.querySelector(".sec-total-div")
const fatInput = document.querySelector("#fat-input")
const carbsInput = document.querySelector("#carbs-input")
const proteinInput = document.querySelector("#protein-input")







setInterval(function(){
    let date = new Date()
    clock.innerHTML = date.toLocaleTimeString();
}, 1000)


//! display item from storage that are saved

function displayItemFromStorage(){

    let list = JSON.parse(localStorage.getItem("list")) || [];
    list.forEach(item => {
        addFoodListToTheDom(item.name, item.calorie, item.price, item.fat, item.carbs, item.protein)
    })
    checkLis()
}

function addFood(e){
    e.preventDefault();

    let _foodInput = foodInput.value
    let _calInput = calInput.value
    let _priceInput = priceInput.value
    let _fatInput = fatInput.value
    let _carbsInput = carbsInput.value
    let _proteinInput = proteinInput.value

    if(_foodInput === "" || _calInput === "" || _priceInput === "" || _fatInput === "" || _carbsInput === "" || _proteinInput === ""){
        alert("Please Entry The Item")
    }else{

    addFoodListToTheDom(_foodInput, _calInput, _priceInput, _fatInput, _carbsInput, _proteinInput)
    addFoodToStorage(_foodInput, _calInput, _priceInput, _fatInput, _carbsInput, _proteinInput)
    checkLis()
    }
}    

//! adding item to the Dom

function addFoodListToTheDom(_foodInput, _calInput, _priceInput, _fatInput, _carbsInput, _proteinInput){

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

    let button5 = document.createElement("button")
    button5.className = "remove-item btn-link"
    const text5 = document.createTextNode(_fatInput + " Fat")
    button5.appendChild(text5)

    let button6 = document.createElement("button")
    button6.className = "remove-item btn-link"
    const text6 = document.createTextNode(_carbsInput + " Carbs")
    button6.appendChild(text6)

    let button7 = document.createElement("button")
    button7.className = "remove-item btn-link"
    const text7 = document.createTextNode(_proteinInput + " Protein")
    button7.appendChild(text7)
    
    li.appendChild(p)
    li.appendChild(button2)
    li.appendChild(button4)
    li.appendChild(button5)
    li.appendChild(button6)
    li.appendChild(button7)



    let button3 = document.createElement("button")
    button3.className = "remove-item btn-link text-red"

    let icon = document.createElement("i")
    icon.className = "fa-solid fa-xmark"

    button3.appendChild(icon)

    li.appendChild(button3)
    
    itemList.appendChild(li)
    
}

//! checking the list from the Dom
function checkLis(){
    
    foodInput.value = "";
    calInput.value = "";
    priceInput.value = ""
    fatInput.value = ""
    carbsInput.value = ""
    proteinInput.value = ""
    
    const liList = document.querySelectorAll("li")
    if(liList.length === 0){
        clearBtn.style.display = "none"
        filter.style.display = "none"
        totalDiv.style.display = "none"
        secTotalDiv.style.display = "none"
    }else{
        clearBtn.style.display = "block"
        filter.style.display = "block"
        totalDiv.style.display = "flex"
        secTotalDiv.style.display = "flex"

    }
    
    totalCalculator()
    
}

// //! adding all the information to the local Storage input by the user
function addFoodToStorage(value1, value2, value3, value4, value5, value6){

    let x = []

    x = JSON.parse(localStorage.getItem("list") || "[]");


    z = {
        name: value1,
        calorie: value2,
        price: value3,
        fat: value4,
        carbs: value5,
        protein: value6
    }

    x.push(z)

    localStorage.setItem("list", JSON.stringify(x))   
}

// ! removing list from the dom

function removeFoodListFromTheDom(e){

    if(e.target.parentElement.parentElement.classList.contains("food-container")){
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item) {
    if (confirm("Are you Sure?")) {
        item.remove();
        totalCalculator();
        
        const foodText = item.children[0].textContent;
        const calText = item.children[1].textContent;
        const priceText = item.children[2].textContent;
        const fatText = item.children[3].textContent;
        const carbsText = item.children[4].textContent;
        const proteinText = item.children[5].textContent;

        removeItemFromStorage(foodText, calText, priceText, fatText, carbsText, proteinText);
        
        checkLis();
    }
}

// ! removing list item From Storage
function removeItemFromStorage(item, item1, item2, item3, item4, item5){
    let _item = item.toLowerCase()
    let _item1 = item1.toLowerCase()
    let _item2 = item2.toLowerCase()
    let _item3 = item3.toLowerCase()
    let _item4 = item4.toLowerCase()
    let _item5 = item5.toLowerCase()


    let _list = JSON.parse(localStorage.getItem("list")) || [];
    let list = _list.filter((item) => item.name !== _item &&
                                        item.calorie !== _item1 &&
                                        item.price !== _item2 && 
                                        item.fat !== _item3 &&
                                        item.carbs !== _item4 && 
                                        item.protein !== _item5)

    console.log(list);
    localStorage.setItem("list", JSON.stringify(list))

}

//! clears All item from everywhere, storage / dom
function clearItem (){
    while(itemList.firstChild){
        itemList.firstChild.remove()
    }

    if(confirm("Are you Sure?")){
        localStorage.removeItem("list")
        checkLis()
    }
}


//! calculating the total of totalPrice /totalFat /totalCarbs /totalProtein /totalCalories
function totalCalculator(){

    let calories = [];
    let price = [];
    let fat = [];
    let carbs = [];
    let protein = [];
    
    let _totalCalories = 0;
    let _totalPrice = 0;
    let _totalFat = 0;
    let _totalCarbs = 0;
    let _totalProtein = 0;



    let list = JSON.parse(localStorage.getItem("list") || "[]");

    list.forEach((_list) => {
        calories.push(_list.calorie)
        price.push(_list.price)
        fat.push(_list.fat)
        carbs.push(_list.carbs)
        protein.push(_list.protein)
    }) 


   for(let i = 0; i < price.length; i++) {
        _totalCalories += parseInt(calories[i]);
       _totalPrice +=  parseInt(price[i]);
       _totalFat +=  parseInt(fat[i]);
        _totalCarbs +=  parseInt(carbs[i]);
        _totalProtein +=  parseInt(protein[i]);

   }

   document.getElementById("total").textContent =  `Total Calories: ` + _totalCalories ;

   document.getElementById("totalPrice").textContent =  `Total Price: ` + _totalPrice + " $";

   document.getElementById("total-fat").textContent =  `Total Fat: ` + _totalFat;

   document.getElementById("total-carbs").textContent =  `Total Carbs: ` + _totalCarbs;

   document.getElementById("total-protein").textContent =  `Total Protein: ` + _totalProtein;

    totalAmount = {
        totalCalories: _totalCalories,
        totalPrice: _totalPrice,
        totalFat: _totalFat,
        totalCarbs: _totalCarbs,
        totalProtein: _totalProtein  
    }

    localStorage.setItem("totalAmount", JSON.stringify(totalAmount)) 
}


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
