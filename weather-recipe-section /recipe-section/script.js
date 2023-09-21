const inputForm = document.querySelector('#form-control');
const recipeItem = document.querySelector(".result-item")
const container = document.querySelector(".container");
const searchBtn = document.getElementById("search-icon");
const IngredientBtn = document.querySelector('.view-recipe');
const _ingredientList = document.querySelector(".ingredient-list")
let _userInput = document.getElementById("user-input");
const APP_ID = '1fea24a2';
const APP_key = '322f1191351793a5e490d5b50dc2f3f8';




searchBtn.addEventListener('click', fetchAPI)
async function fetchAPI(){

    let userInput = _userInput.value;

    const baseURL = `https://api.edamam.com/search?q=${userInput}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=25`;
    const response = await fetch(baseURL); 
    const data = await response.json();
    generateHTML(data.hits)

}
function generateHTML(result) {
    let generatedHTML= '';
    result.map(ans => {
        generatedHTML += `
            <div class="item">
                <img src="${ans.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${ans.recipe.label}</h1>
                    <a href="${ans.recipe.url}" class="view-recipe" target="_blank">View Recipe</a>
                </div>
                 <p class="data-cal">Calories: ${ans.recipe.calories.toFixed(1)}</p>
                 <p class="data-cal">Cuisine: ${ans.recipe.cuisineType}</p>
                 <p class="data-cal">Diet label: ${ans.recipe.dietLabels.length > 0 ? ans.recipe.dietLabels : 'Not Available'}</p>


                 <div class="expand-ingredient">
                        <p>Ingredients<span class="material-symbols-outlined expand-icon">expand_more</span></p>
                        <ul class="ingredient-list">
                        ${ans.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                    
             </div>
        `
    })
    recipeItem.innerHTML = generatedHTML;

    const expandIngredientsIcons = document.querySelectorAll('.expand-ingredient');
    expandIngredientsIcons.forEach(icon => {
        icon.addEventListener('click', toggleIngredientListVisibility);
    });
}
// function that displays the ingredients
function toggleIngredientListVisibility(event) {
    const ingredientList = event.target.nextElementSibling;
    const computedStyle = getComputedStyle(ingredientList);
    if (computedStyle.display === "none") {
        ingredientList.style.display = "block";
    } else {
        ingredientList.style.display = "none";
    }
}

_userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      e.preventDefault();
      fetchAPI()
    }
});



// checks if the user is logged in
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

