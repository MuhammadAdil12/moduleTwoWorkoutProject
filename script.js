const MotivationalQuote = document.querySelector(".MotivationalQuote")

const waterIcon = document.querySelector("#water-icon");
const waterIconDiv = document.getElementById("waterIconDiv");
const waterIconContent = document.getElementById("waterIconContent");
const logoEntry = document.querySelector(".logo-entry")
const mainSection = document.querySelector(".main-section")
const reset = document.querySelector("#reset-icon")
const closeIcon = document.querySelector("#close-icon")
const waterInfo = document.querySelector(".water-info")


async function fetchMotivationalQuote() {
    try{
        const response = await fetch('https://api.quotable.io/random?tags=inspirational');
        const data = await response.json();
        MotivationalQuote.textContent = data.content
    }catch(error){
        console.log(error);
    }

    logoEntry.style.display = "flex";
    mainSection.style.display = "none";
    setTimeout(()=> {
    logoEntry.style.display = "none";
    mainSection.style.display = "block";

    },1000)

  }

document.addEventListener("DOMContentLoaded", fetchMotivationalQuote)


waterIcon.addEventListener("click", function () {
    if (waterIconDiv.style.display === "none") {
    waterIconDiv.style.display = "block";
    } else {
    waterIconDiv.style.display = "none";
    }
});
closeIcon.addEventListener("click", function () {
    waterIconDiv.style.display = "none";
})

// ! saving water in local storage as an object

function saveWaterAndReload(inputType) {
  const waterTargetInput = document.getElementById("waterTargetInput");
  const waterConsumedInput = document.getElementById("waterConsumedInput");

  const storedWater = JSON.parse(localStorage.getItem("water")) || {
    waterTarget: "0", 
    waterConsumed: "0", 
  };
console.log(storedWater);
  let x = Number(storedWater.waterConsumed) + Number(waterConsumedInput.value)

  if (inputType === 'waterTarget') {
    storedWater.waterTarget = waterTargetInput.value;
  } else if (inputType === 'waterConsumed') {
    storedWater.waterConsumed = x;
  }

  if(storedWater.waterConsumed > storedWater.waterTarget){
        alert("Congrats you have reached your water Target limit")
  }


  
  localStorage.setItem("water", JSON.stringify(storedWater));

  location.reload();

}
document.getElementById("saveWaterTarget").addEventListener("click", () => saveWaterAndReload('waterTarget'));
document.getElementById("saveWaterConsumed").addEventListener("click", () => saveWaterAndReload('waterConsumed'));




// ! ===== Reset the value in local storage ========== !
reset.addEventListener('click', () => {
    localStorage.removeItem('water');
    confirm('Warning! Do you want to reset the water value?'); 
    location.reload();
  });

  
  const waterData = localStorage.getItem("water");
  if (waterData) {
  const water = JSON.parse(waterData);
  waterInfo.innerHTML = `${water.waterConsumed} / ${water.waterTarget} ML`; 
} else {
  
  waterInfo.innerHTML = "Save your water first, Damn it"; 
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