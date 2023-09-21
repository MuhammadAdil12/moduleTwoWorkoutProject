let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("nameField");
let signInSubmit = document.getElementById("signInSubmit");
let signUpSubmit = document.getElementById("signUpSubmit");
let title = document.getElementById("title");

// Initially, hide the sign-in submit button
signInSubmit.style.display = "none";
signInBtn.style.backgroundColor = "#e7e7f3";
signInBtn.style.color = "black";

signInBtn.onclick = function () {
  nameField.style.maxHeight = "0px";
  title.innerHTML = "Sign In";

  signInSubmit.style.display = "block";
  signUpSubmit.style.display = "none";

  signUpBtn.style.backgroundColor = "#e7e7f3";
  signUpBtn.style.color = "black";
  signInBtn.style.backgroundColor = "";
  signInBtn.style.color = "";
};

signUpBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";

  signUpSubmit.style.display = "block";
  signInSubmit.style.display = "none";

  signUpBtn.style.backgroundColor = "";
  signUpBtn.style.color = "";
  signInBtn.style.backgroundColor = "#e7e7f3";
  signInBtn.style.color = "black";
};

// Function to handle sign-up
document
  .getElementById("signUpSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (name && email && password) {
      const isEmailTaken = checkEmailExists(email);

      if (isEmailTaken) {
        alert("Email already exists. Please choose another.");
      } else {
        const user = {
          name: name,
          email: email,
          password: password,
        };

        // After successful signup or sign-in
        localStorage.setItem("showToastOnNextPage", "true");

        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("isLoggedIn", "true");

        // Redirect to the desired page
        window.location.href =
          "/account-section/main-account-section/index.html";
      }
    } else {
      alert("Please fill in all fields.");
    }
  });

// Function to check if an email already exists
function checkEmailExists(email) {
  return false;
}

document.getElementById("signInSubmit").addEventListener("click", function () {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ) {
    window.location.href = "/account-section/main-account-section/index.html";
    alert("Sign in successful!");
    // When the user logs in successfully
    localStorage.setItem("isLoggedIn", "true");
  } else {
    alert("Invalid Email or Password. Try Again");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  const accountLink = document.getElementById("account-icon");

  if (isAuthenticated === "true") {
    // User is logged in, show the account page
    accountLink.href = "/account-section/main-account-section/index.html";
  } else {
    // User is not logged in, show the make an account page
    accountLink.href = "/account-section/index.html";
  }
});
