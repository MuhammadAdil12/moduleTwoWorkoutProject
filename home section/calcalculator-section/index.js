
const _age = document.querySelector("#ageCaloriesChild")
const _gender = document.querySelector("#genderCaloriesChild")
const _height = document.querySelector("#heightCaloriesChild")
const _weight = document.querySelector("#weightCaloriesChild")
const _activityLevel = document.querySelector("#activityLevelCaloriesChild")
const _inputFatPercentage = document.getElementById("fat-input")
const _carbsInputPercentage = document.getElementById("carbsInput")
const _proteinInputPercentage = document.getElementById("protienInput")





// ! The main function the power house

function genderBmr(){

        if(_age.value == "" || _gender.value == "" || _height.value == "" || _weight.value == "" || _activityLevel.value == ""){
            alert('Are you blind or sum? Fill in the blank, fam')
        }else{
        
        if(_gender.value.toLowerCase() === "male"){
        let _maleBmr = Math.round(maleBmr());
        document.getElementById("bmr-area").textContent = "Basal Metabolic Rate :" + _maleBmr;
        weightGain(_maleBmr)
        weightLoss(_maleBmr)
        let _tdeemale = calTdeeForMale()
        macroNutrient(_tdeemale)
    }else {
        let _femaleBmr = Math.round(femaleBmr())
            document.getElementById("bmr-area").textContent = "  Basal Metabolic Rate :" + _femaleBmr
            weightGain(_femaleBmr)
            weightLoss(_femaleBmr)
            let _tdeeFemale = calTdeeForFemale()
            macroNutrient(_tdeeFemale)
  
        }

        calBmi(_height.value, _weight.value)
        calculateWaterIntake()
    }
}

// ! Creating function that calculate Male's BMR 

function maleBmr(){

    let maleBmr = (10 * _weight.value) + (6.25  * _height.value) - (5 * _age.value) + 5;

    if(_activityLevel.value == 1){
     return maleBmr * 1.2 
  }
   else if (_activityLevel.value == 2){
    return maleBmr * 1.375 
  }
  else if (_activityLevel.value == 3){
    return maleBmr * 1.55
  }
  else if (_activityLevel.value == 4){
      return maleBmr * 1.725
  }
  else{
      return maleBmr * 1.9
  }
}


// ! Creating function that calculate Female's BMR 
function femaleBmr(){

    let femaleBmr = (10 * _weight.value) + (6.25  * _height.value) - (5 * _age.value) - 161;

    if(_activityLevel.value == 1){
         return femaleBmr * 1.2
     }
      else if (_activityLevel.value == 2){
         return femaleBmr * 1.375
     }
     else if (_activityLevel.value == 3){
         return femaleBmr * 1.55
     }
     else if (_activityLevel.value == 4){
         return femaleBmr * 1.725 
     }
     else{
         return femaleBmr * 1.9 
         
    }
}

// ! Creating function that calculate tdee for male

function calTdeeForMale(){
    let maleBmr = (10 * _weight.value) + (6.25  * _height.value) - (5 * _age.value) + 5;
    document.getElementById("cal-tdee").textContent = "TDEE: " + maleBmr;
    return maleBmr
}

// ! Creating function that calculate tdee for female

function calTdeeForFemale(){
    let femaleBmr = (10 * _weight.value) + (6.25  * _height.value) - (5 * _age.value) - 161;
    document.getElementById("cal-tdee").textContent = "TDEE: " + femaleBmr;
    return femaleBmr
}


// ! Creating function that calculate BMI 

function calBmi(height, weight){

    let meter = height/100

    let BMI = weight / (meter * meter)

    if (BMI < 18.5) {
        let _BMI = Math.round(BMI) + ', You are under weight' 
    document.getElementById("bmi-area").textContent = "Body mass index :" + _BMI;

    } else if (BMI > 18.5 && BMI < 24.9) {
        let _BMI = Math.round(BMI) + ', You are normal weight'
    document.getElementById("bmi-area").textContent = "Body mass index :" + _BMI;

    }else if (BMI > 25 && BMI < 29.9) {
        let _BMI = Math.round(BMI) + ', You are over weight'
    document.getElementById("bmi-area").textContent = "Body mass index :" + _BMI;

    }else if (BMI > 30 && BMI < 34.9) {
        let _BMI = Math.round(BMI)  + ', You are Obese' 
    document.getElementById("bmi-area").textContent = "Body mass index :" + _BMI;

    }else{
        let _BMI = Math.round(BMI) + ', You are extreme Obese'
    document.getElementById("bmi-area").textContent = "Body mass index :" + _BMI;
    }
}

function weightGain(value){
    let _weightGain = value + 500 
    document.getElementById("weight-gain").textContent = "Wg: 0.5 kg per week take: " + _weightGain + " kcal";
}

function weightLoss(value){
    let _weightLoss = value - 500 
    document.getElementById("weight-loss").textContent = "Wl: 0.5 kg per week take: " + _weightLoss + " kcal";
}

function calculateWaterIntake() {
    
        let waterIntake = 1;

        if (_activityLevel.value == 1) {
             waterIntake = _weight.value * 35
        } 
        else if (_activityLevel.value == 2) {
            waterIntake = _weight.value * 40;
        } 
        else if (_activityLevel.value == 3) {
             waterIntake = _weight.value * 46;
        }
         else if (_activityLevel.value == 4) {
             waterIntake = _weight.value* 51;
        } 
         else {
             waterIntake = _weight.value * 55;
        }
        
        // Display the calculated water intake
        waterIntakeResult.textContent = "Rec daily water intake: " + waterIntake + " ml";
}

function macroNutrient(value1) {
   // Calculate fat, carbs, and protein as percentages of maleBmr

   let inputFatPercentage = _inputFatPercentage.value
   let carbsInputPercentage = _carbsInputPercentage.value
   let proteinInputPercentage = _proteinInputPercentage.value

   if(parseInt(inputFatPercentage) + parseInt(carbsInputPercentage) + parseInt(proteinInputPercentage) === 100){

       let fats = inputFatPercentage/100 * value1;   
       let carbs = carbsInputPercentage/100 * value1;
       let protein = proteinInputPercentage/100 * value1; 
         
       document.getElementById("macro-ratio").textContent = " Fat: " + Math.round(fats) + " Carbs: " + Math.round(carbs) + ' Protein: ' + Math.round(protein);

       _macroRatio = {
        fats: fats,
        carbs: carbs,
        protein: protein
    }

    localStorage.setItem("macroRatio", JSON.stringify(_macroRatio))

   }else{
    alert('Please Make Sure Your Macro Ratio Ends Up 100% ˆ∆ˆ')
   }

  }


function onSave(){
       
    if(_age.value == "" || _gender.value == "" || _height.value == "" || _weight.value == "" || _activityLevel.value == ""){
        alert('Are you blind or sum? Fill in the blank, fam')
    }else{

       let bmr = document.querySelector('#bmr-area')
       let bmi = document.querySelector('#bmi-area')
       let tdee = document.querySelector('#cal-tdee')
   
       localStorage.setItem("bmr", JSON.stringify(bmr.textContent))
       localStorage.setItem("bmi", JSON.stringify(bmi.textContent))
       localStorage.setItem("tdee", JSON.stringify(tdee.textContent))

    }
}

document.getElementById('submitBtnCalories').addEventListener("click", genderBmr)

const save = document.querySelector('.saveBtn')
save.addEventListener('click', onSave)


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




