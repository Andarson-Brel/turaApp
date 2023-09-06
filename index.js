"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAr48_kpmT-W63JxukixljckWNHg3KxV4M",
  authDomain: "tura-bank.firebaseapp.com",
  databaseURL:
    "https://tura-bank-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tura-bank",
  storageBucket: "tura-bank.appspot.com",
  messagingSenderId: "106185755291",
  appId: "1:106185755291:web:57cdee3b12de5774b1943e",
  measurementId: "G-CM591N3G8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const colRef = collection(db, "guides");
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
const signUpform = document.querySelector(".sign-up-form");
const createPassword = document.getElementById("create-password");
const verifyPasswordInput = document.getElementById("verify-password");
////////////////////////////////// // Get references to all input fields and error message elements
/////////////////////////////////////
const inputSignupEmail = document.querySelector(".sign-up-email");
const inputFirstName = document.querySelector(".first-name");
const inputLastName = document.querySelector(".last-name");
const inputSignupPassword = document.querySelector(".sign-up-password");
const inputLoginEmail = document.querySelector(".login-email");
const inputLoginPassword = document.querySelector(".login-password");
const checkboxPass = document.querySelector(".checkboxpass");
//////////////////////////////// containers/////////////////////////////
const signupModal = document.querySelector(".sign-up");
const loginModal = document.querySelector(".login");
const overlay = document.querySelector(".overlay");
const errorMsgemail = document.querySelector(".error-msg-email");
const errorMsgPassword = document.querySelector(".error-msg-password");
const errorMsgLastname = document.querySelector(".error-msg-lastname");
const errorMsgfirstname = document.querySelector(".error-msg-firstname");
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
//
function validateForm(email, passWord, verifyPassword, firstName, lastName) {
  let valid = true;
  if (passWord != verifyPassword) {
    // console.log("failed");
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Your Password Doesn't Match";
    verifyPasswordInput.style.border = "1px solid #FF0000";
    inputSignupPassword.style.border = "1px solid #FF0000";
    valid = false;
  } else if (!passWord && !verifyPassword) {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Password Field is Empty";
    verifyPasswordInput.style.border = "1px solid #FF0000";
    inputSignupPassword.style.border = "1px solid #FF0000";
    valid = false;
  } else if (!passWord && verifyPassword) {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Password Field is Empty";
    inputSignupPassword.style.border = "1px solid #FF0000";

    verifyPasswordInput.style.border = "none";

    valid = false;
  }
  if (!verifyPassword && passWord) {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Password Field is Empty";
    verifyPasswordInput.style.border = "1px solid #FF0000";

    inputSignupPassword.style.border = "none";

    valid = false;
  }
  if (!email) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Can't Be Blank";
    inputSignupEmail.style.border = "1px solid #FF0000";
    valid = false;
  } else {
    errorMsgemail.style.display = "none";
    inputSignupEmail.style.border = "none";
  }
  if (!firstName) {
    errorMsgfirstname.style.display = "block";
    errorMsgfirstname.textContent = "First Name Can't be Blank";
    inputFirstName.style.border = "1px solid #FF0000";
    valid = false;
  } else {
    errorMsgfirstname.style.display = "none";
    inputFirstName.style.border = "none";
  }
  if (!lastName) {
    errorMsgLastname.style.display = "block";
    errorMsgLastname.textContent = "Last Name Can't be Blank";
    inputLastName.style.border = "1px solid #FF0000";
    valid = false;
  } else {
    errorMsgLastname.style.display = "none";
    inputLastName.style.border = "none";
  }

  return valid;
}
function showPassword() {
  if (
    createPassword.type === "password" &&
    verifyPasswordInput.type === "password"
  ) {
    createPassword.type = "text";
    verifyPasswordInput.type = "text";
  } else {
    createPassword.type = "password";
    verifyPasswordInput.type = "password";
  }
}
checkboxPass.addEventListener("click", showPassword);
function convertToTitleCase(inputval) {
  var words = inputval.split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

signupSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const email = inputSignupEmail.value;
  const firstName = convertToTitleCase(inputFirstName.value);
  const lastName = convertToTitleCase(inputLastName.value);
  const passWord = inputSignupPassword.value;
  const verifyPassword = verifyPasswordInput.value;
  const owner = `${firstName} ${lastName}`;
  // console.log(owner);
  if (validateForm(email, passWord, verifyPassword, firstName, lastName)) {
    createUserWithEmailAndPassword(auth, email, passWord)
      .then((credential) => {
        const colRef = collection(db, "users");
        const docRef = doc(colRef, credential.user.uid);
        return setDoc(docRef, {
          firstName: firstName,
          lastName: lastName,
          transactions: [],
          totalDeposit: 0,
          balance: 0,
          owner: owner,
          accountNumber: Number((Date.now() + "").slice(-10)),
        }).then(() => {
          window.location.href = "account.html";
          closeModal();

          signUpform.reset();
        });
      })
      .catch((error) => {
        // console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          errorMsgemail.style.display = "block";
          errorMsgemail.textContent = "Email has already been registered";
          inputSignupEmail.style.border = "1px solid #FF0000";
        } else {
          errorMsgemail.style.display = "none";
          inputSignupEmail.style.border = "none";
        }
        if (error.code.includes("auth/invalid-email")) {
          errorMsgemail.style.display = "block";
          errorMsgemail.textContent = "Email is invalid";
          inputSignupEmail.style.border = "1px solid #FF0000";
        } else {
          errorMsgemail.style.display = "none";
          inputSignupEmail.style.border = "none";
        }
        if (error.code.includes("auth/missing-password")) {
          errorMsgPassword.style.display = "block";
          errorMsgPassword.textContent = "Password Field is Empty";
          inputSignupPassword.style.border = "1px solid #FF0000";
        } else {
          errorMsgPassword.style.display = "none";
          inputSignupPassword.style.border = "none";
        }
        if (error.code.includes("auth/weak-password")) {
          errorMsgPassword.style.display = "block";
          errorMsgPassword.textContent = "Password Must Be Atleast 6 Values";
          inputSignupPassword.style.border = "1px solid #FF0000";
        } else {
          errorMsgPassword.style.display = "none";
          inputSignupPassword.style.border = "none";
        }
      });
  }
});
