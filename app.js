"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getAuth,
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
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
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
// const colRef = collection(db, "guides");
//

const sideBarNav = document.querySelectorAll(".side-bar-nav");
const pages = document.querySelectorAll(".page");
const mainSection = document.querySelector(".main-section");
const userImg = document.querySelector(".welcome-img");
const labelBalance = document.querySelector(".balance");
const accountNumberValue = document.querySelector(".account-number");
const dateTxt = document.querySelector(".Date-txt");
const profileIcon = document.querySelector(".profile-icon");
const notificationIcon = document.querySelectorAll(".notification-icon");
const incomePrice = document.querySelector(".income-price");
const outcomePrice = document.querySelector(".outcome-price");
const tabBtn = document.querySelectorAll(".tab-btn");
const tabBtnImg = document.querySelectorAll(".tab-img");
const tabBtnHovered = document.querySelectorAll(".tab-img-hovered");
const recipientAccountNumber = document.getElementById("recipient-account");
const transferInput = document.getElementById("transfer-amount");
const sendMoneyBtn = document.querySelector(".send-money ");
const loanInput = document.getElementById("loan-input");
const loanBtn = document.querySelector(".apply");
const fundAccountNumber = document.querySelector(".fund-acnt-nmb");
const copyBtn = document.querySelector(".copy-btn");
const errorMsgemail = document.querySelector(".error-msg-email");
const errorMsgPassword = document.querySelector(".error-msg-password");
const bottomNav = document.querySelector(".botton-nav");
const btmNavItem = document.querySelectorAll(".btm-nav-item");
const btmIconInactive = document.querySelectorAll(`.btm-nav-img`);
const btmIconActive = document.querySelectorAll(".btm-nav-img-active");
const btmNavTitle = document.querySelectorAll(".btm-nav-title");
const notificationContainer = document.querySelector(".notification-maincont");
const overlay = document.querySelector(".overlay");
const userNAme = document.querySelector(".user-name");
const transactionHistoryCont = document.querySelector(".transaction-history");
const notificationContainer2 = document.querySelector(
  ".notification-container"
);
const modalHead = document.querySelector(".modal__header");
const modalDes = document.querySelector(".modal-desc");
const logOutBtn = document.querySelector(".login-out");
const transactionInputs = document.querySelectorAll(".transaction-input");
const transactionBtns = document.querySelectorAll(".transaction-btn");
const pushNotification = document.querySelector(".push-notificstion-cont");
const pushMsg = document.querySelector(".push-notif-msg");
const signInFotm = document.querySelector(".sign-in-form");

// ========================================================NAVIGATION FUNCTION===================================================================
// date function
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}/${month}/${year}`;
}

const today = new Date();

const toggleNotification = function () {
  notificationContainer.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// Function to toggle pages based on clicked button
function togglePages(index) {
  // Hide all pages
  pages.forEach((page) => page.classList.add("page-hidden"));

  // Show the corresponding page based on the clicked button's index
  document.querySelector(`.page-${index + 1}`).classList.remove("page-hidden");
}

const navigation = function () {
  sideBarNav.forEach((navBtn, index) => {
    navBtn.addEventListener("click", function () {
      // When any button is clicked, remove "side-nav-active" from all buttons
      sideBarNav.forEach((btn) => btn.classList.remove("side-nav-active"));

      // Add "side-nav-active" to the clicked button
      navBtn.classList.add("side-nav-active");
      btmNavTitle.forEach((btmNavTitle) =>
        btmNavTitle.classList.remove("btm-nav-title-active")
      );

      btmIconActive.forEach((btn) => {
        btn.style.display = "none";
      });
      btmIconInactive.forEach((inactiveBtn) => {
        inactiveBtn.style.display = "block";
      });
      btmIconInactive[index].style.display = "none";
      btmIconActive[index].style.display = "block";
      btmNavTitle[index].classList.add("btm-nav-title-active");
      // change active page
      togglePages(index);
    });
  });
  let focusedInputIndex = 0;
  transactionInputs.forEach((input, index) =>
    input.addEventListener("focus", function () {
      transactionBtns.forEach((btn) => {
        btn.style.backgroundColor = "#b8ffd5";
        btn.style.color = "#b1d2bf";
      });
      if (index === 1) {
        index = 0;
      }
      if (index === 2) {
        index = 1;
      }
      transactionBtns[index].style.backgroundColor = "#16E069";
      transactionBtns[index].style.color = "white";
    })
  );
  transactionInputs.forEach((input, index) =>
    input.addEventListener("blur", function () {
      focusedInputIndex = 0;
    })
  );

  btmNavItem.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      btmNavTitle.forEach((btmNavTitle) =>
        btmNavTitle.classList.remove("btm-nav-title-active")
      );

      btmIconActive.forEach((btn) => {
        btn.style.display = "none";
      });
      btmIconInactive.forEach((inactiveBtn) => {
        inactiveBtn.style.display = "block";
      });
      btmIconInactive[index].style.display = "none";
      btmIconActive[index].style.display = "block";
      btmNavTitle[index].classList.add("btm-nav-title-active");
      sideBarNav.forEach((btn) => btn.classList.remove("side-nav-active"));

      // Add "side-nav-active" to the clicked button
      sideBarNav[index].classList.add("side-nav-active");
      togglePages(index);
    });
  });

  tabBtn.forEach((tab, index) => {
    tab.addEventListener("mouseover", function () {
      tab.style.color = "#00f262";
      tab.style.backgroundColor = "#363636";
      tabBtnImg[index].style.display = "none";
      tabBtnHovered[index].style.display = "block";
    });

    tab.addEventListener("mouseout", function () {
      tab.style.color = "#292d32";
      tab.style.backgroundColor = "#F7F9FC";
      tabBtnImg[index].style.display = "block";
      tabBtnHovered[index].style.display = "none";
    });

    tab.addEventListener("click", function () {
      btmNavTitle.forEach((btmNavTitle) =>
        btmNavTitle.classList.remove("btm-nav-title-active")
      );

      btmIconActive.forEach((btn) => {
        btn.style.display = "none";
      });
      btmIconInactive.forEach((inactiveBtn) => {
        inactiveBtn.style.display = "block";
      });
      btmIconInactive[index + 1].style.display = "none";
      btmIconActive[index + 1].style.display = "block";
      btmNavTitle[index + 1].classList.add("btm-nav-title-active");
      sideBarNav.forEach((btn) => btn.classList.remove("side-nav-active"));

      // Add "side-nav-active" to the clicked button
      sideBarNav[index + 1].classList.add("side-nav-active");
      togglePages(index + 1);
    });
  });
};
const toastBox = document.querySelector(".toast-box");

const showToast = function (msg) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);
  if (msg.includes("Successfully")) {
    toast.classList.add("success");
  }
  if (msg.includes("Wrong")) {
    toast.classList.add("error");
  }
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

function formatLargeNumber(number) {
  // Check if the number is a valid number
  if (isNaN(number)) {
    return "Invalid Number";
  }

  // Split the number into integer and decimal parts
  const parts = String(number).split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Format the integer part with commas
  let formattedInteger = "";
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--) {
    formattedInteger = integerPart[i] + formattedInteger;
    j++;
    if (j % 3 === 0 && i !== 0) {
      formattedInteger = "," + formattedInteger;
    }
  }

  // Combine the formatted integer and decimal parts
  let formattedNumber = formattedInteger;
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}

// ============================LOGIN=========================================================
const loginModal = document.querySelector(".login");
const inputLoginEmail = document.querySelector(".login-email");
const inputLoginPassword = document.querySelector(".login-password");

const loginBtn = document.querySelector(".login-submit");

const closeLogin = function () {
  loginModal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

profileIcon.addEventListener("click", closeLogin);
document.querySelector(".close-img").addEventListener("click", closeLogin);
// validate function
function validateForm(email, passWord) {
  let valid = true;
  if (!passWord) {
    errorMsgPassword.style.display = "block";
    errorMsgPassword.textContent = "Password Field is Empty";
    inputLoginPassword.style.border = "1px solid #FF0000";
    valid = false;
  } else {
    errorMsgPassword.style.display = "none";
    inputLoginPassword.style.border = "none";
  }
  if (!email) {
    errorMsgemail.style.display = "block";
    errorMsgemail.textContent = "Email Can't Be Blank";
    inputLoginEmail.style.border = "1px solid #FF0000";
    valid = false;
  } else {
    errorMsgemail.style.display = "none";
    inputLoginEmail.style.border = "none";
  }

  return valid;
}

// let currentAccount;
loginBtn.addEventListener("click", function (e) {
  navigation();
  togglePages(0);
  e.preventDefault();
  if (validateForm(inputLoginEmail.value, inputLoginPassword.value)) {
    signInWithEmailAndPassword(
      auth,
      inputLoginEmail.value,
      inputLoginPassword.value
    ).catch((error) => {
      console.log(error.code);
      if (error.code.includes("auth/network-request-failed")) {
        return showToast(
          `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Check Your Network Connection</p>`
        );
      }

      if (error.code.includes("auth/invalid-email")) {
        errorMsgemail.style.display = "block";
        errorMsgemail.textContent = "Email is invalid";
        inputLoginEmail.style.border = "1px solid #FF0000";
        return;
      } else {
        errorMsgemail.style.display = "none";
        inputLoginEmail.style.border = "none";
      }
      if (error.code.includes("auth/user-not-found")) {
        // errorMsgemail.style.display = "block";
        showToast(
          `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">User Not Found</p>`
        );
        // errorMsgemail.textContent = "Email is invalid";
        inputLoginEmail.style.border = "1px solid #FF0000";
        return;
      } else {
        errorMsgemail.style.display = "none";
        inputLoginEmail.style.border = "none";
      }
    });
  }

  // }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    dateTxt.textContent = getFormattedDate(today);
    //   // closeLogin();
    setTimeout(() => {
      mainSection.style.display = "flex";
    }, 2000);
    if (loginModal.classList != "hidden") {
      loginModal.classList.add("hidden");
      overlay.classList.add("hidden");
    } else {
      console.log("modal not hidded");
    }
    logOutBtn.style.display = "block";
    // loginModal.style.display = "none";
    loginBtn.style.display = "none";
    inputLoginPassword.style.display = "none";
    inputLoginEmail.style.display = "none";

    modalDes.style.display = "none";
    modalHead.textContent = "Logout";
    // transfer functionality
    sendMoneyBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const recipientAccNumber = Number(recipientAccountNumber.value);
      const transferAmount = Number(transferInput.value);
      // Create a reference to the 'users' collection
      const usersRef = collection(db, "users");

      // Query the database for the user with the given account number
      const recipientQuery = query(
        usersRef,
        where("accountNumber", "==", recipientAccNumber)
      );
      const currentUserDocRef = doc(db, "users", user.uid);

      getDoc(currentUserDocRef).then((userDocSnapshot) => {
        const userAccountNumber = userDocSnapshot.data().accountNumber;
        const userAccount = userDocSnapshot.data();

        // Check if the recipient account number is the same as the user's account number

        if (userAccount.balance < 1) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">You Don't have Sufficient Balance To Execute This Transaction, Fund Account and Try Again</p>`
          );
        }

        if (userAccount.balance < transferAmount) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Amount Cant Be Higher Than Current Balance:₦${formatLargeNumber(
              userAccount.balance
            )}.</p>`
          );
        }
        if (recipientAccNumber === userAccountNumber) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Cannot send money to your own account.</p>`
          );
        }
        getDocs(recipientQuery).then((recipientSnapshot) => {
          if (!recipientSnapshot.empty) {
            const recipientDoc = recipientSnapshot.docs[0];
            const recipientData = recipientDoc.data();
            console.log(recipientData);
            const recipientDocRef = doc(db, "users", recipientDoc.id);

            if (transferAmount < 1) {
              return showToast(
                `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Please Enter A Valid Amount</p>`
              );
            }
            // Update recipient's transactions array
            const confirmationCont = `<div class="confirmation-container">
        <h3 class="confirmation-heading">Transfer</h3>
        <p class="confirm-txt">Confirm Transction Details Below</p>
        <div class="transfer-details-cont">
      <div class="detail-row">
        <p class="detail-title">Account Number</p>
        <p class="detail">${recipientAccountNumber.value}</p>
      </div>
      <div class="detail-row">
        <p class="detail-title">Recipient Name</p>
        <p class="detail">${recipientData.owner}</p>
      </div>
      <div class="detail-row">
        <p class="detail-title">Amount</p>
        <p class="detail">₦${formatLargeNumber(transferAmount)}</p>
      </div>
        </div>
        <button class="btn-confirm">Confirm</button>
      </div>`;
            pushNotification.insertAdjacentHTML("afterbegin", confirmationCont);
            pushNotification.style.display = "flex";
            const confirmButton = document.querySelector(".btn-confirm");
            confirmButton.addEventListener("click", function () {
              updateDoc(recipientDocRef, {
                transactions: arrayUnion(transferAmount),
              })
                .then(() => {
                  // Update sender's transactions array (deducting the transferred amount)
                  const senderDocRef = doc(db, "users", user.uid);
                  updateDoc(senderDocRef, {
                    transactions: arrayUnion(-transferAmount),
                  })
                    .then(() => {
                      document.querySelector(
                        ".confirmation-container"
                      ).style.display = "none";
                      document.querySelector(
                        ".push-notificstion"
                      ).style.display = "block";

                      pushMsg.textContent = `₦${formatLargeNumber(
                        transferAmount
                      )} sent to ${recipientData.owner}`;
                      setTimeout(() => {
                        document.querySelector(
                          ".push-notificstion"
                        ).style.display = "none";
                        pushNotification.style.display = "none";
                        pushMsg.textContent = "";
                      }, 3000);
                      transferInput.value = "";
                      recipientAccountNumber.value = "";
                    })
                    .then((test) => {
                      console.log(test);
                    })
                    .catch((error) => {
                      // Handle error while updating sender's data
                    });
                })
                .catch((error) => {
                  // Handle error while updating recipient's data
                });
            });
          } else {
            // Recipient account not found
            showToast("Recipient account not found.");
          }
        });
      });
    });

    // loan functionality
    loanBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const amount = Number(loanInput.value);

      const colRef = collection(db, "users");
      const docRef = doc(colRef, user.uid);
      getDoc(docRef).then((doc) => {
        const currentAccount = doc.data();
        if (amount < 1) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i><p class="toast-msg"> Amount can't be less than 1</p>`
          );
        }
        if (currentAccount.totalDeposit === 0) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i><p class="toast-msg"> You Are Not Eligible for a Loan, Make Deposits To Qualify</p>`
          );
        }
        if (amount > currentAccount.totalDeposit) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Your loan amount is higher than your total deposit, try amount less than ₦${formatLargeNumber(
              currentAccount.totalDeposit
            )}</p>`
          );
        }
        if (amount > currentAccount.totalDeposit * 0.2) {
          return showToast(
            `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Amount is higher than your eligibility limt, you can only borrow 20% of your total deposit ₦${formatLargeNumber(
              currentAccount.totalDeposit * 0.2
            )}</p>`
          );
        }

        if (
          amount > 0 &&
          currentAccount.transactions.some((mov) => mov >= amount * 0.1) //&&
          // amount < currentAccount.totalDeposit
        ) {
          setTimeout(() => {
            pushNotification.style.display = "flex";
            document.querySelector(".push-notificstion").style.display =
              "block";

            pushMsg.textContent = `Your loan request of ₦${formatLargeNumber(
              amount
            )} was succesful`;
          }, 500);

          setTimeout(() => {
            document.querySelector(".push-notificstion").style.display = "none";
            pushNotification.style.display = "none";
            pushMsg.textContent = "";
          }, 5000);
          loanInput.value = "";

          setTimeout(() => {
            updateDoc(docRef, {
              transactions: arrayUnion(amount),
            });
          }, 1000);
        }
      });
    });

    const colRef = collection(db, "users");
    const docRef = doc(colRef, user.uid);
    onSnapshot(docRef, (doc) => {
      // logout functionality

      if (doc.exists()) {
        // console.log(doc, user.uid);
        displayTransaction(user);

        // displaybalance

        printBalance(user);

        // display summary
        calcDisplaySummary(user);

        const detail = doc.data();

        userNAme.textContent = detail.owner.split(" ")[0];
        fundAccountNumber.textContent = detail.accountNumber;
        accountNumberValue.textContent = detail.accountNumber;

        // closeLogin();

        dateTxt.textContent = getFormattedDate(today);
        // closeLogin();
        mainSection.style.display = "flex";
      }
    });
  } else {
    mainSection.style.display = "none";
    loginBtn.style.display = "block";
    inputLoginPassword.style.display = "block";
    inputLoginEmail.value = "";
    inputLoginPassword.value = "";
    inputLoginEmail.style.display = "block";

    modalDes.style.display = "block";
    modalHead.textContent = "Login";
    logOutBtn.style.display = "none";
    userNAme.textContent = "";
    fundAccountNumber.textContent = "";
    accountNumberValue.textContent = "";

    // closeLogin();

    dateTxt.textContent = getFormattedDate(today);
  }
  logOutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signOut(auth);
    location.reload();
    console.log("user logged out");
  });
  // calcDisplaySummary(user);
  notificationIcon.forEach((icon) => {
    icon.addEventListener("click", function () {
      toggleNotification();
      displayNotification(user);
    });
  });
});
// ===========================================DISPLAY TRANSACTION HISTORY==================================================
// displayMovement
const displayTransaction = function (user, sort = false) {
  const colRef = collection(db, "users");
  const docRef = doc(colRef, user.uid);
  getDoc(docRef).then((doc) => {
    notificationContainer2.innerHTML = "";
    const movs = sort
      ? doc
          .data()
          .transactions.slice()
          .sort((a, b) => a - b)
      : doc.data().transactions;
    movs.forEach((mov, i) => {
      const type = mov > 0 ? "deposit" : "withdrawal";

      // Find the other party's account in Firestore based on the transaction amount
      const otherPartyAccountPromise = findOtherPartyAccount(mov);

      // Use Promise to wait for the other party's account to be found
      otherPartyAccountPromise.then((otherPartyAccount) => {
        const otherPartyName = otherPartyAccount
          ? otherPartyAccount.owner
          : "Admin";

        const html = `
    <div class="transaction__row">
      <div class="transaction--type transaction--type__${type}">
        <p class="message">${type === "deposit" ? "Received" : "Sent"}
           Money ${type === "deposit" ? "from" : "to"}
          <span class="source">${otherPartyName}</span>
        </p>
         <!--<div class="transaction--date">3 days ago</div>-->
      </div>
      <div class="transaction-value value-type-${type}">
      ₦${formatLargeNumber(Math.abs(mov))}
      </div>
    </div>
  `;

        transactionHistoryCont.insertAdjacentHTML("afterbegin", html);
      });
    });
  });
};
// =================================PRINTBALANCE============================
// print balance
const printBalance = function (user) {
  const colRef = collection(db, "users");
  const docRef = doc(colRef, user.uid);
  getDoc(docRef).then((doc) => {
    const balance = doc.data().transactions.reduce((acm, cur) => {
      return acm + cur;
    }, 0);
    doc.data().balance = balance;
    labelBalance.textContent = `${formatLargeNumber(balance)}`;
  });
};
// ===========================================================DISPLAY SUMMARY================================
const calcDisplaySummary = function (user) {
  // TOTAL DEPOSIT
  const colRef = collection(db, "users");
  const docRef = doc(colRef, user.uid);
  getDoc(docRef).then((doc) => {
    // total deposit
    const totalDeposit = doc
      .data()
      .transactions.filter((mov) => {
        return mov > 0;
      })
      .reduce((acm, curr) => acm + curr, 0);
    doc.data().totalDeposit = totalDeposit;
    incomePrice.textContent = `${formatLargeNumber(totalDeposit)}`;

    // TOTAL WITHDRAWAL

    const totalWithdrawal = doc
      .data()
      .transactions.filter((mov) => {
        return mov < 0;
      })
      .reduce((acm, curr) => acm + curr, 0);

    outcomePrice.textContent = `${formatLargeNumber(
      Math.abs(totalWithdrawal)
    )}`;
  });
};

// Function to find the other party's account in Firestore based on the transaction amount
const findOtherPartyAccount = (transactionAmount) => {
  const colRef = collection(db, "users");
  const refQuery = query(
    colRef,
    where("transactions", "array-contains", -transactionAmount)
  );

  return getDocs(refQuery)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const otherPartyAccount = querySnapshot.docs[0].data();
        return otherPartyAccount;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error finding other party's account:", error);
      return null;
    });
};
const displayNotification = function (user, sort = false) {
  const colRef = collection(db, "users");
  const docRef = doc(colRef, user.uid);
  getDoc(docRef).then((doc) => {
    notificationContainer2.innerHTML = "";
    const movs = sort
      ? doc
          .data()
          .transactions.slice()
          .sort((a, b) => a - b)
      : doc.data().transactions;
    movs.forEach((mov, i) => {
      const type = mov > 0 ? "deposit" : "withdrawal";

      // Find the other party's account in Firestore based on the transaction amount
      const otherPartyAccountPromise = findOtherPartyAccount(mov);

      // Use Promise to wait for the other party's account to be found
      otherPartyAccountPromise.then((otherPartyAccount) => {
        const otherPartyName = otherPartyAccount
          ? otherPartyAccount.owner
          : "Admin";

        const html = `
          <div class="notification-div">
            <div class="notification-thmb notification-thmb--${type}"></div>
            <div class="notification-msg-cont">
              <p class="notification-msg">
                ${type === "deposit" ? "you" : "Your"} ${
          type === "deposit" ? "received" : "transfer"
        } ${
          type === "deposit" ? "" : "of"
        } ₦<span class="msg-amount">${formatLargeNumber(
          Math.abs(mov)
        )}.00</span> ${type === "deposit" ? "from" : "to"}
                <span class="notification-source">${otherPartyName}</span>
                ${type === "deposit" ? "Successfully" : "was successful"}
              </p>
            </div>
          </div>
        `;

        notificationContainer2.insertAdjacentHTML("afterbegin", html);
      });
    });
  });
};

// copy functionality

copyBtn.addEventListener("click", function () {
  const textToCopy = fundAccountNumber.textContent;

  // Create a temporary input element to facilitate copying
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select the text within the input element
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the selected text to the clipboard
  document.execCommand("copy");
  showToast(
    `<i class="fa-solid fa-circle-exclamation success"></i><p class="toast-msg"> Account Number Copied Successfully</p>`
  );
  // Remove the temporary input element
  document.body.removeChild(tempInput);
});

// ===================================================NOTIFICATION FUNCTIONALITY=============================================================

overlay.addEventListener("click", toggleNotification);

// ====================================================APP FUNCTIONALITY=============================================================================================================

// ================================================================= ALL FUNCTIONS ========================================================================
navigation();
