const MotivationalQuote = document.querySelector(".MotivationalQuote")

const waterIcon = document.querySelector("#water-icon");
const waterIconDiv = document.getElementById("waterIconDiv");
const waterIconContent = document.getElementById("waterIconContent");
const reset = document.querySelector("#reset-icon")
const closeIcon = document.querySelector("#close-icon")
const waterInfo = document.querySelector(".water-info")
const gifDiv = document.querySelector(".gif-div")
const gif = document.getElementById("gif-itself")

async function fetchMotivationalQuote() {
    try{
        const response = await fetch('https://api.quotable.io/random?tags=inspirational');
        const data = await response.json();
        MotivationalQuote.textContent = data.content
    }catch(error){
        console.log(error);
    }

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
  let x = Number(storedWater.waterConsumed) + Number(waterConsumedInput.value)

  if (inputType === 'waterTarget') {
    storedWater.waterTarget = waterTargetInput.value;
  } else if (inputType === 'waterConsumed') {
    storedWater.waterConsumed = x;
  }


  
  if (storedWater.waterConsumed >= storedWater.waterTarget) {

    gifDiv.style.zIndex = "1000";
    gif.style.display = "block";
    
    setTimeout(()=>{
        alert("Congrats, you have reached your water target limit");
      },1000)
      setTimeout(() => {
          gif.style.display = "none";
          gifDiv.style.zIndex = "-10";
          location.reload();
        }, 2000);
      }

      gifDiv.style.zIndex = "1000";
      
      
        localStorage.setItem("water", JSON.stringify(storedWater));
        if(storedWater.waterConsumed < storedWater.waterTarget){
          location.reload();
        }

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
  
  waterInfo.innerHTML = "Please save your target water amount first"; 
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