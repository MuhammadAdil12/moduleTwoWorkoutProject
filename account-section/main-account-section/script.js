// Retrieve the user's information from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedProfilePicUrl = localStorage.getItem("profilePicUrl");

// ! puts the username name from local storage
if (storedUser && storedUser.name) {
  const userNameElement = document.querySelector(".user-name");
  userNameElement.innerHTML = storedUser.name.toUpperCase();
}

// ! checks if user have signed in or not then display which page to show
document.addEventListener("DOMContentLoaded", function () {
  const isAuthenticated = localStorage.getItem("user");
  const accountLink = document.getElementById("account-icon");

  if (isAuthenticated !== null) {
    accountLink.href = "/account-section/main-account-section/index.html";
  } else {
    accountLink.href = "/account-section/index.html";
  }
});

// ! for able to change profile image
const cameraIcon = document.querySelector(".camera-icon");
const fileInput = document.getElementById("file-input");

//  will put profile picture from local storage if have any
const profilePic = document.getElementById("profile-pic");
if (storedProfilePicUrl !== null) {
  profilePic.style.backgroundImage = `url('${storedProfilePicUrl}')`;
  profilePic.style.backgroundSize = "cover";
  profilePic.style.backgroundPosition = "center";
}
cameraIcon.addEventListener("click", function () {
  fileInput.click();
});

// Function to update the profile picture
function updateProfilePicture(input) {
  const profilePic = document.getElementById("profile-pic");

  // Check if a file was selected
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      profilePic.style.backgroundImage = `url('${e.target.result}')`;
      profilePic.style.backgroundSize = "cover";
      profilePic.style.backgroundPosition = "center";

      localStorage.setItem("profilePicUrl", e.target.result);
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(input.files[0]);
  }
}

// ! Getting the calories from local storage and displaying
document.addEventListener("DOMContentLoaded", function () {
  let total = JSON.parse(localStorage.getItem("totalAmount") || "0");
  let totalCalories = total.totalCalories;
  const bmi = JSON.parse(localStorage.getItem("bmi"));
  const bmr = JSON.parse(localStorage.getItem("bmr"));
  const tdee = JSON.parse(localStorage.getItem("tdee"));

  const totalCaloriesLi = document.querySelector(".total-calories-intake");
  const bmiLi = document.querySelector(".bmi");
  const bmrLi = document.querySelector(".basal-metabolic-rate");
  const tdeeLi = document.querySelector(".tdee");

  if (
    totalCalories == 0 ||
    bmi !== "" ||
    bmr !== "" ||
    macroRatio !== "" ||
    tdee !== ""
  ) {
    totalCaloriesLi.textContent = `Total Calories Intake: ${totalCalories}`;
    bmrLi.textContent = bmr;
    bmiLi.textContent = bmi;
    tdeeLi.textContent = tdee;
  } else {
    bmrLi.textContent = "Saved Items will be shown here";
  }
});

// ! adding the toast in this page
document.addEventListener("DOMContentLoaded", function () {
  const shouldShowToast = localStorage.getItem("showToastOnNextPage");

  if (shouldShowToast === "true") {
    // Display the toast here
    const successToast = document.getElementById("success-toast");
    const toast = new bootstrap.Toast(successToast);
    toast.show();

    // Clear the flag in localStorage so that the toast doesn't show again
    localStorage.removeItem("showToastOnNextPage");
  }
});

//  ! will delete the user's account
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("deleteButton");
  logoutButton.addEventListener("click", function () {
    const userConfirmed = window.confirm("Are you sure you want to delete?");
    if (userConfirmed) {
      // Clear the user's session (remove the login information from localStorage)
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("profilePicUrl");
      window.location.href = "/account-section/index.html";
    }
  });
});

// ! will log out the user
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      // Set the isLoggedIn flag to 'false' when the user confirms logout
      localStorage.setItem("isLoggedIn", "false");

      // Redirect the user to the account section
      window.location.href = "/account-section/index.html";
    }
  });
});

// adding the chart
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDayOfWeek = new Date().getDay();
const today = new Date(); // Calculate the date of the current week's starting day (Sunday)
const currentWeekStart = new Date(today);
currentWeekStart.setDate(today.getDate() - currentDayOfWeek);

// Create labels for the entire week
const labels = [];
// starting data array with zeros
const dataValues = Array(7).fill(0);

for (let i = 0; i < 7; i++) {
  const date = new Date(currentWeekStart);
  date.setDate(currentWeekStart.getDate() + i);
  labels.push(dayNames[date.getDay()]);
  dataValues[i] = localStorage.getItem(dayNames[date.getDay()]) || 0;
}

// Setup data
const data = {
  labels,
  datasets: [
    {
      label: "Total Calories Intake",
      data: dataValues,
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Config
const config = {
  type: "bar",
  data,
  options: {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// Render init block
const myChart = new Chart(document.getElementById("myChart"), config);
const now = new Date();
const midnight = new Date();
midnight.setHours(0, 0, 0, 0);

if (now >= midnight && !localStorage.getItem("resetFlag")) {
  localStorage.setItem("total", "0");
  localStorage.setItem("resetFlag", "true");
  dataValues[currentDayOfWeek] = 0;
  myChart.update();
}

document.addEventListener("DOMContentLoaded", () => {
  let _list = JSON.parse(localStorage.getItem("totalAmount") || "0");
  let totalCalories = _list.totalCalories;

  if (!isNaN(totalCalories)) {
    localStorage.setItem(labels[currentDayOfWeek], totalCalories);

    dataValues[currentDayOfWeek] = Number(totalCalories);
    myChart.update();
  } else {
    console.log("Total Calories data not found in local storage.");
  }
});

// ! Setup data for the total price chart
const priceLabels = labels; // Use the same labels as the total calories chart
const priceDataValues = Array(7).fill(0);
for (let i = 0; i < 7; i++) {
  priceDataValues[i] = localStorage.getItem(dayNames[i] + "price") || 0;
}

// Setup data for the total price chart
const priceData = {
  labels: priceLabels,
  datasets: [
    {
      label: "Total Price",
      data: priceDataValues,
      backgroundColor: [
        "rgba(153, 102, 255, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 26, 104, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(153, 102, 255, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 26, 104, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Config for the total price chart
const priceConfig = {
  type: "bar",
  data: priceData,
  options: {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// Create the total price chart
const priceChart = new Chart(
  document.getElementById("secondChart"),
  priceConfig
);

const now1 = new Date();
const midnight1 = new Date();
midnight1.setHours(0, 0, 0, 0);

if (now1 >= midnight1 && !localStorage.getItem("resetFlag")) {
  localStorage.setItem("totalPrice", "0");
  localStorage.setItem("resetFlag", "true");
  dataValues[currentDayOfWeek] = 0;
  priceChart.update();
}

document.addEventListener("DOMContentLoaded", () => {
  let _list = JSON.parse(localStorage.getItem("totalAmount") || "0");
  let _totalPrice = _list.totalPrice;

  if (!isNaN(_totalPrice)) {
    // Set the new value in local storage
    localStorage.setItem(dayNames[currentDayOfWeek] + "price", _totalPrice);

    // Update the chart with the new data
    priceDataValues[currentDayOfWeek] = Number(_totalPrice);
    priceChart.data.datasets[0].data = priceDataValues;
    priceChart.update();
  } else {
    console.log("Total Price data not found in local storage.");
  }
});

//! function for displaying progress of macro ratio
const macroRatioFats = document.querySelector(".macro-ratio-fat");
const macroRatioCarbs = document.querySelector(".macro-ratio-carbs");
const macroRatioProtein = document.querySelector(".macro-ratio-protein");

// Calculate the percentage of macro intake and display it
function displayMacroIntake() {
  let macroRatioIntake = JSON.parse(localStorage.getItem("totalAmount") || "0");
  let fatRatio = macroRatioIntake.totalFat;
  let carbsRatio = macroRatioIntake.totalCarbs;
  let proteinRatio = macroRatioIntake.totalProtein;

  let macroRatio = JSON.parse(localStorage.getItem("macroRatio") || "0");

  let fatIntake = macroRatio.fats;
  let carbsIntake = macroRatio.carbs;
  let proteinIntake = macroRatio.protein;

  if (!isNaN(fatRatio) && !isNaN(fatIntake)) {
    // Calculate the percentage of macro intake
    macroRatioFats.innerHTML = `Fats: ${fatRatio} / ${Math.round(fatIntake)}`;
    macroRatioCarbs.innerHTML = `Carbs: ${carbsRatio} / ${Math.round(
      carbsIntake
    )}`;
    macroRatioProtein.innerHTML = `Protein: ${proteinRatio} / ${Math.round(
      proteinIntake
    )}`;
  } else {
    macroRatioFats.innerHTML = "There is nothing to show";
  }
}

displayMacroIntake();
