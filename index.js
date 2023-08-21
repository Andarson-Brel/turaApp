"use strict";
// =======================================================APP/JSSELECTOR
// =========================================SELECTORS==========================================

/////////////////////////// btns//////////////////////////////////
const loginBtn = document.querySelectorAll(".login-btn");
const signupBtn = document.querySelectorAll(".sign-up-btn");
// console.log(loginBtn, signupBtn);
const loginSubmit = document.querySelector(".login-submit");
const signupSubmit = document.querySelector(".sign-up-submit");
const closeModalicon = document.querySelectorAll(".close-img");
const loginSpan = document.querySelector(".loginst-span");
////////////////////////////////// // Get references to all input fields and error message elements
/////////////////////////////////////
const inputSignupEmail = document.querySelector(".sign-up-email");
const inputFirstName = document.querySelector(".first-name");
const inputLastName = document.querySelector(".last-name");
const inputSignupPassword = document.querySelector(".sign-up-password");
const inputLoginEmail = document.querySelector(".login-email");
const inputLoginPassword = document.querySelector(".login-password");
//////////////////////////////// containers/////////////////////////////
const signupModal = document.querySelector(".sign-up");
const loginModal = document.querySelector(".login");
const overlay = document.querySelector(".overlay");
const errorMsgemail = document.querySelector(".error-msg-email");
const errorMsgPassword = document.querySelector(".error-msg-password");
const errorMsgLastname = document.querySelector(".error-msg-lastname");
const errorMsgfirstname = document.querySelector(".error-msg-firstname");
// =======================================================class================================================================
class account {
  constructor(emailAddress, firstName, Lastname, passWord, transactions) {
    this.accountNumber = Number((Date.now() + "").slice(-10));
    this.email = emailAddress;
    this.owner = `${firstName} ${Lastname}`;
    this.firstName = firstName;
    this.Lastname = Lastname;
    this.pin = Number(passWord);
    this.transactions = transactions;
  }
}
let currentAccount;
let accounts = [];
// Retrieve existing accounts from localStorage if available
const storedAccounts = localStorage.getItem("accounts");
if (storedAccounts) {
  accounts = JSON.parse(storedAccounts);
}
// import { currentAccount, accounts } from "./app.js";

// Use the currentAccount object
// console.log(currentAccount); // Access the shared data

// ==============================================FUNCTIONS=====================================================
const closeModal = function (e) {
  //   e.preventDefault();
  loginModal.classList.add("hidden");
  signupModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//////////////////////////////////////////////// event listners//////////////////////////////////////////////
loginSpan.addEventListener("click", function () {
  window.location.href = "account.html";
});
loginBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "account.html";
  });
});
signupBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    signupModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});
closeModalicon.forEach((closeIcon) => {
  closeIcon.addEventListener("click", closeModal);
});
overlay.addEventListener("click", function () {
  loginModal.classList.add("hidden");
  signupModal.classList.add("hidden");
  overlay.classList.add("hidden");
});
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    (!loginModal.classList.contains("hidden") ||
      !signupModal.classList.contains("hidden"))
  ) {
    closeModal();
  }
});

//================================================== form validation============================================
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Add an input event listener to the inputSignupEmail field
inputSignupEmail.addEventListener("input", function () {
  if (!inputSignupEmail.value.match(validRegex)) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Not correct";
  } else {
    errorMsgemail.style.display = "none";
  }
});
function validateFunction() {
  let isValid = true; // Assume the form is valid initially
  if (
    (currentAccount = accounts.find((acc) => {
      return acc.email === inputSignupEmail.value.toLowerCase();
    }))
  ) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent =
      "Email Address is Already Registeered to Another Account";
    isValid = false;
  }
  // Validate Email
  if (!inputSignupEmail.value.match(validRegex)) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Not correct";
    isValid = false;
  } else {
    errorMsgemail.style.display = "none";
  }

  // Validate First Name
  if (inputFirstName.value === "") {
    errorMsgfirstname.style.display = "block";
    errorMsgfirstname.textContent = "Field can't be blank";
    isValid = false;
  } else {
    errorMsgfirstname.style.display = "none";
  }

  // Validate Last Name
  if (inputLastName.value === "") {
    errorMsgLastname.style.display = "block";
    errorMsgLastname.textContent = "Field can't be blank";
    isValid = false;
  } else {
    errorMsgLastname.style.display = "none";
  }

  // Validate Password
  if (inputSignupPassword.value === "") {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Field can't be blank";
    isValid = false;
  } else {
    errorMsgPassword.style.display = "none";
  }

  return isValid; // Return the validation status
}

// Add an input event listener to the inputSignupEmail field
inputSignupEmail.addEventListener("input", function () {
  if (!inputSignupEmail.value.match(validRegex)) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Not correct";
  } else {
    errorMsgemail.style.display = "none";
  }
});

// Keep the click event listener for the signupSubmit button
// signupSubmit.addEventListener("click", function (e) {
//   e.preventDefault();

//   const isValid = validateFunction(); // Validate the form

//   if (isValid) {
//     // If all validations pass, create a new account object with the input values
//     const emailAddress = inputSignupEmail.value;
//     const firstName = inputFirstName.value;
//     const lastName = inputLastName.value;
//     const passWord = inputSignupPassword.value;

//     // Create a new account object
//     const newAccount = new account(
//       emailAddress,
//       firstName,
//       lastName,
//       passWord,
//       []
//     );
//     // Push the new account object into the accounts array
//     accounts.push(newAccount);

//     // Store the updated accounts array in localStorage

//     localStorage.setItem("accounts", JSON.stringify(accounts));
//     // Do something with the newAccount object, e.g., store it in an array or send it to a server.
//     console.log("New Account Object:", newAccount, console.log(accounts));

//     // Redirect to the account.html page
//     window.location.href = "account.html";
//   } else {
//     // If any validation fails, do not proceed with creating the account.
//     console.log("Form validation failed. Please check your input fields.");
//   }
// });
// ... (previous code)

// Keep the click event listener for the signupSubmit button
signupSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const isValid = validateFunction(); // Validate the form
  // Check if the email already exists
  if (
    accounts.some((acc) => acc.email === inputSignupEmail.value.toLowerCase())
  ) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent =
      "Email Address is Already Registered to Another Account";
    console.log("Email Address is Already Registered to Another Account");
    // return; // Exit early if email already exists
  }
  if (isValid) {
    // If all validations pass and the email is not already registered
    const emailAddress = inputSignupEmail.value;
    const firstName = inputFirstName.value;
    const lastName = inputLastName.value;
    const passWord = inputSignupPassword.value;

    // Create a new account object
    const newAccount = new account(
      emailAddress,
      firstName,
      lastName,
      passWord,
      []
    );
    // Push the new account object into the accounts array
    accounts.push(newAccount);

    // Store the updated accounts array in localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Redirect to the account.html page
    window.location.href = "account.html";
  } else {
    // If any validation fails, do not proceed with creating the account.
    console.log("Form validation failed. Please check your input fields.");
  }
});

// ... (rest of the code)

// let currentAccount;

// console.log(currentAccount, accounts);
// export default accounts;
// window.myApp = { accounts };
