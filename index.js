"use strict";
// =========================================SELECTORS==========================================

/////////////////////////// btns//////////////////////////////////
const loginBtn = document.querySelectorAll(".login-btn");
const signupBtn = document.querySelectorAll(".sign-up-btn");
// console.log(loginBtn, signupBtn);
const loginSubmit = document.querySelector(".login-submit");
const signupSubmit = document.querySelector(".sign-up-submit");
const closeModalicon = document.querySelectorAll(".close-img");
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
  #accountNumber = (Date.now() + "").slice(-10);
  #emailAddress;
  #passWord;

  constructor(emailAddress, firstName, Lastname, passWord) {
    this.#emailAddress = emailAddress;

    this.firstName = firstName;
    this.Lastname = Lastname;
    this.#passWord = passWord;
  }
}
// ==============================================FUNCTIONS=====================================================
const closeModal = function (e) {
  //   e.preventDefault();
  loginModal.classList.add("hidden");
  signupModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//////////////////////////////////////////////// event listners//////////////////////////////////////////////
loginBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
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
let validate = false;
function validateFunction() {
  // Validate Email
  if (!inputSignupEmail.value.match(validRegex)) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Not correct";
  } else {
    errorMsgemail.style.display = "none";
  }

  // Validate First Name
  if (inputFirstName.value === "") {
    errorMsgfirstname.style.display = "block";
    errorMsgfirstname.textContent = "Field can't be blank";
  } else {
    errorMsgfirstname.style.display = "none";
  }

  // Validate Last Name
  if (inputLastName.value === "") {
    errorMsgLastname.style.display = "block";
    errorMsgLastname.textContent = "Field can't be blank";
  } else {
    errorMsgLastname.style.display = "none";
  }

  // Validate Password
  if (inputSignupPassword.value === "") {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Field can't be blank";
  } else {
    errorMsgPassword.style.display = "none";
  }
  validate = true;
}

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

// Keep the click event listener for the signupSubmit button
signupSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  //
  validateFunction();
  if (validate) {
    // If all validations pass, create a new account object with the input values
    const emailAddress = inputSignupEmail.value;
    const firstName = inputFirstName.value;
    const lastName = inputLastName.value;
    const passWord = inputSignupPassword.value;

    // Create a new account object
    const newAccount = new account(emailAddress, firstName, lastName, passWord);

    // Do something with the newAccount object, e.g., store it in an array or send it to a server.
    console.log("New Account Object:", newAccount);
  } else {
    // If any validation fails, do not proceed with creating the account.
    console.log("Form validation failed. Please check your input fields.");
  }

  // Redirect to the account.html page
  window.location.href = "account.html";
});
const account1 = {
  accountNumber: (Date.now() + "").slice(-9) + 1,
  owner: "Jonas Schmedtmann",

  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  accountNumber: (Date.now() + "").slice(-9) + 2,
  owner: "Jessica Davis",

  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  accountNumber: (Date.now() + "").slice(-9) + 3,
  owner: "Steven Thomas Williams",

  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  accountNumber: (Date.now() + "").slice(-9) + 4,
  owner: "Sarah Smith",

  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// export default accounts;
// window.myApp = { accounts };
