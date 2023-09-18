// Retrieve the user's information from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedProfilePicUrl = localStorage.getItem('profilePicUrl')

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
const profilePic = document.getElementById('profile-pic');
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

            localStorage.setItem('profilePicUrl', e.target.result);
            
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(input.files[0]);     
    }
}

// ! Getting the calories from local storage and displaying
document.addEventListener('DOMContentLoaded', function () {
    const total = localStorage.getItem('total');
    const bmi = JSON.parse(localStorage.getItem('bmi'));
    const bmr = JSON.parse(localStorage.getItem('bmr'));
    const macroRatio = JSON.parse(localStorage.getItem('macroRatio'));
    const tdee = JSON.parse(localStorage.getItem('tdee'))

    const totalCaloriesLi = document.querySelector('.total-calories-intake');
    const bmiLi = document.querySelector('.bmi');
    const bmrLi = document.querySelector('.basal-metabolic-rate');
    const macroRatioLi = document.querySelector('.macro-ratio');
    const tdeeLi = document.querySelector('.tdee')


    
    if (total == 0  || bmi !== "" || bmr !== "" || macroRatio !== "" || tdee !== "" ) {

        totalCaloriesLi.textContent = `Total Calories Intake: ${total}`;
        bmrLi.textContent = bmr; 
        bmiLi.textContent = bmi;
        macroRatioLi.textContent = macroRatio;
        tdeeLi.textContent = tdee

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
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('deleteButton');
    logoutButton.addEventListener('click', function () {
        const userConfirmed = window.confirm('Are you sure you want to delete?');
        if (userConfirmed) {
            // Clear the user's session (remove the login information from localStorage)
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('profilePicUrl')
            window.location.href = "/account-section/index.html";
        }
    });
});


// ! will log out the user
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function () {
        const isConfirmed = window.confirm('Are you sure you want to log out?');

        if (isConfirmed) {
            // Set the isLoggedIn flag to 'false' when the user confirms logout
            localStorage.setItem('isLoggedIn', 'false');

            // Redirect the user to the account section
            window.location.href = "/account-section/index.html";
        }
    });
});









// adding the chart 
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let currentDayOfWeek = new Date().getDay();
const today = new Date(); // Calculate the date of the current week's starting day (Sunday)
const currentWeekStart = new Date(today);
currentWeekStart.setDate(today.getDate() - currentDayOfWeek);

// Create labels for the entire week
const labels = [];
for (let i = 0; i < 7; i++) {
  const date = new Date(currentWeekStart);
  date.setDate(currentWeekStart.getDate() + i);
  labels.push(dayNames[date.getDay()]);
}

// starting data array with zeros
const dataValues = Array(7).fill();
// Set the data value for the current day
dataValues[currentDayOfWeek] = localStorage.getItem('total') || 0;

// Setup data
const data = {
  labels,
  datasets: [{
    label: 'Total Calories Intake',
    data: dataValues,
    backgroundColor: [
      'rgba(255, 26, 104, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(0, 0, 0, 0.2)',
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)',
    ],
    borderWidth: 1,
  }],
};

// Config
const config = {
    type: 'bar',
    data,
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true,
            },
    },
},
};

// Render init block
const myChart = new Chart(document.getElementById('myChart'), config);
let savedData = JSON.parse(localStorage.getItem('total')) || {};

function checkMidnight() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
      // It's midnight; save the data for the next day
      currentDayOfWeek = (currentDayOfWeek + 1) % 7;
      
      // Save the current day's data in local storage with the day name as the key
      savedData[labels[currentDayOfWeek]] = dataValues[currentDayOfWeek];
      localStorage.setItem('total', JSON.stringify(savedData));
  
      // Reset data for the next day
      dataValues[currentDayOfWeek] = 0;
      myChart.update();
  
      const previousDayIndex = (currentDayOfWeek + 6) % 7; // Getting index of the previous day
      if (savedData[labels[previousDayIndex]]) {
        dataValues[previousDayIndex] = savedData[labels[previousDayIndex]];
        myChart.update();
      }
    }
}
  



