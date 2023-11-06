const calories = document.getElementById('calories');
const sugar = document.getElementById('sugar');
const fats = document.getElementById('fats');
const carbs = document.getElementById('carbs');
const protein = document.getElementById('protein');

// For the inputs
const inputParent = document.querySelector(".input-parent")
const nameInput = document.getElementById('nameInput')
const caloriesInput = document.getElementById('caloriesInput')
const priceInput = document.getElementById('priceInput')
const fatCaloriesInput = document.getElementById('fatCaloriesInput')
const carbsCaloriesInput = document.getElementById('carbsCaloriesInput')
const proteinCaloriesInput = document.getElementById('proteinCaloriesInput')
const addItemBtn = document.getElementById("addFoodItem")

inputParent.style.display = "none"


// For the second div
// Total Fat
const saturatedFat = document.getElementById('saturatedFat');
const fattyAcids = document.getElementById('fattyAcids');
const sodium = document.getElementById('sodium');


// Total carbs
const zinc = document.getElementById('zinc')
const Magnesium = document.getElementById('magnesium');
const cholesterol = document.getElementById('Cholesterol');


// Total Protein
const vitaminD = document.getElementById('vitaminD')
const calcium = document.getElementById('calcium');
const iron = document.getElementById('iron');
const potassium = document.getElementById('potassium');


const userInput = document.getElementById("recipe")
const submit = document.getElementById("Submit-btn")
const text = document.querySelector('.loading')
text.style.display = 'none'; 

let divsAreDisplayed = false;


async function fetchData(){
    if (!divsAreDisplayed) {
        text.style.display = 'block'; 
    }

    let ingr = userInput.value.split("\n")


        const appId = '8fb5c9e2';
        const appKey = '5a73e957d1f689dec56b9f2d01c9407f';
        const foodItem = ingr; 

    try{

        const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${foodItem}`)
        const result = await response.json()
        resultCal(result)
                
    }catch(error){
        console.error('Error:', error);
        text.textContent = "Not able to fetch data from database";

    };

}

const resultDiv = document.querySelector('.firstDiv');
const secondDiv = document.querySelector('.secondDiv')
resultDiv.style.display = 'none';
secondDiv.style.display = "none";

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    fetchData()


    divsAreDisplayed = !divsAreDisplayed;
});

function resultCal(data) {


    if(data.calories === 0 || data.totalWeight === 0){
        alert("We cannot calculate the nutrition for some ingredients. Please check the ingredient spelling or if you have entered a quantities for the ingredients.")
        resultDiv.style.display = 'none';
        secondDiv.style.display = "none"
    }else{

    calories.textContent = data.calories.toFixed(2) + ' ' + data.totalNutrients.ENERC_KCAL.unit;
    if (data.totalNutrients.SUGAR) {
        sugar.textContent = data.totalNutrients.SUGAR.quantity.toFixed(2) + ' ' + data.totalNutrients.SUGAR.unit;
    } else {
        sugar.textContent = "N/A"
    }
    if (data.totalNutrients.FAT) {
        fats.textContent = data.totalNutrients.FAT.quantity.toFixed(2) + ' ' + data.totalNutrients.FAT.unit;
    }else {
        fats.textContent = "N/A"
    }
    if (data.totalNutrients.PROCNT) {
        protein.textContent = data.totalNutrients.PROCNT.quantity.toFixed(2) + ' ' + data.totalNutrients.PROCNT.unit;
    }else {
        protein.textContent = "N/A"
    }
    if (data.totalNutrients.CHOCDF) {
        carbs.textContent = data.totalNutrients.CHOCDF.quantity.toFixed(2) + ' ' + data.totalNutrients.CHOCDF.unit;
    }else {
        carbs.textContent = "N/A"
    }
    
    // Total Fat
    saturatedFat.textContent = ` ${data.totalDaily.FASAT.quantity.toFixed(2)} ${data.totalDaily.FASAT.unit}`;
    fattyAcids.textContent = ` ${data.totalNutrients.FAMS.quantity.toFixed(2)} ${data.totalNutrients.FAMS.unit}`;
    sodium.textContent = ` ${data.totalDaily.NA.quantity.toFixed(2)} ${data.totalDaily.NA.unit}`;
    
    // Total carbs
    
    zinc.textContent = ` ${data.totalNutrients.ZN.quantity.toFixed(2)} ${data.totalNutrients.ZN.unit}`;
    Magnesium.textContent = ` ${data.totalNutrients.MG.quantity.toFixed(2)} ${data.totalNutrients.MG.unit}`;
    cholesterol.textContent = ` ${data.totalDaily.CHOLE.quantity.toFixed(2)} ${data.totalDaily.CHOLE.unit}`;
    
    // Total Protein
    vitaminD.textContent = ` ${data.totalDaily.VITD.quantity.toFixed(2)} ${data.totalDaily.VITD.unit}`;
    calcium.textContent = `  ${data.totalDaily.CA.quantity.toFixed(2)} ${data.totalDaily.CA.unit}`;
    iron.textContent = ` ${data.totalDaily.FE.quantity.toFixed(2)} ${data.totalDaily.FE.unit}`;
    potassium.textContent = ` ${data.totalDaily.K.quantity.toFixed(2)} ${data.totalDaily.K.unit}`;
    

    resultDiv.style.display = 'block';
    secondDiv.style.display = "block"
    inputParent.style.display = "grid"


    }
    text.style.display = 'none'

}


// //! adding all the information to the local Storage input by the user
function addFoodToStorage(){
    let _nameInput = nameInput.value
    let _caloriesInput = caloriesInput.value
    let _priceInput = priceInput.value
    let _fatCaloriesInput = fatCaloriesInput.value
    let _carbsCaloriesInput = carbsCaloriesInput.value
    let _proteinCaloriesInput= proteinCaloriesInput.value

    let x = []

    x = JSON.parse(localStorage.getItem("list") || "[]");


    z = {
        name: _nameInput,
        calorie: _caloriesInput,
        price: _priceInput,
        fat: _fatCaloriesInput,
        carbs: _carbsCaloriesInput,
        protein: _proteinCaloriesInput
    }

    x.push(z)

    localStorage.setItem("list", JSON.stringify(x))   

    nameInput.value = ""
    caloriesInput.value = ""
    priceInput.value = ""
    fatCaloriesInput.value = ""
    carbsCaloriesInput.value = ""
    proteinCaloriesInput.value = ""

}



addItemBtn.addEventListener("click", addFoodToStorage)

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