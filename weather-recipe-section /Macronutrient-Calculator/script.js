const calories = document.getElementById('calories');
const sugar = document.getElementById('sugar');
const fats = document.getElementById('fats');
const carbs = document.getElementById('carbs');
const protein = document.getElementById('protein');

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

const url = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${ingr}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'da01c69a8bmsh877f5d31ff3d196p18084fjsn1e94218f016f',
		'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    resultCal(result)
} catch (error) {
	console.error(error);
}

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

    }
    text.style.display = 'none'

}



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