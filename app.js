"use strict";

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
const transactionInputs = document.querySelectorAll(".transaction-input");
const transactionBtns = document.querySelectorAll(".transaction-btn");
const pushNotification = document.querySelector(".push-notificstion-cont");
const pushMsg = document.querySelector(".push-notif-msg");
// const fundAccountNumber
// const notificationIcon=document.querySelector('.notification-icon')
export let currentAccount;
export let accounts = [];
const storedAccounts = localStorage.getItem("accounts");
if (storedAccounts) {
  accounts = JSON.parse(storedAccounts);
}

// let accountNumber;
const account1 = {
  email: "andarsonbrel2@gmail.com",
  accountNumber: 7049030487,
  owner: "Innocent Daniel",

  transactions: [1000000],
  interestRate: 1.2, // %
  pin: 1111,
};
accounts.push(account1);
// console.log(accounts);

// const account2 = {
//   email: "ac@g",
//   accountNumber: 124,
//   owner: "Jessica Davis",

//   transactions: [],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   email: "ad@g",
//   accountNumber: 125,
//   owner: "Steven Thomas Williams",

//   transactions: [],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   email: "ae@g",
//   accountNumber: 126,
//   owner: "Sarah Smith",

//   transactions: [430, 1000, 700, 50, 90, 5000, 1000000],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// ========================================================NAVIGATION FUNCTION===================================================================
// date function
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
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
      // console.log(index);
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
      // Update the focusedInputIndex variable
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
  // Convert the number to a string
  let numStr = String(number);

  // Determine the length of the string
  let length = numStr.length;

  // Calculate the number of commas needed
  let numCommas = Math.floor((length - 1) / 3);

  // Initialize the formatted string
  let formattedStr = "";

  // Calculate the number of digits after the last comma
  let lastGroupDigits = length % 3;
  if (lastGroupDigits === 0) {
    lastGroupDigits = 3;
  }

  // Add the digits after the last comma
  formattedStr += numStr.substr(0, lastGroupDigits);

  // Iterate over the remaining characters and add commas
  for (let i = lastGroupDigits; i < length; i++) {
    if ((i - lastGroupDigits) % 3 === 0) {
      formattedStr += ",";
    }
    formattedStr += numStr[i];
  }

  return formattedStr;
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

// let currentAccount;
loginBtn.addEventListener("click", function (e) {
  navigation();
  togglePages(0);
  e.preventDefault();

  currentAccount = accounts.find((acc) => {
    return acc.email === inputLoginEmail.value.toLowerCase();
  });
  // console.log(currentAccount);
  if (
    !currentAccount ||
    currentAccount.pin != Number(inputLoginPassword.value)
  ) {
    showToast(
      `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Wrong Email or Password</p>`
    );
    inputLoginEmail.style.border = "1px solid #FF0000";
    inputLoginPassword.style.border = "1px solid #FF0000";
    inputLoginEmail.style.color = "#FF0000";
    inputLoginPassword.style.color = "#FF0000";
  }
  // console.log(Number(inputLoginPassword.value), currentAccount.pin);
  if (currentAccount.pin === Number(inputLoginPassword.value)) {
    // console.log(currentAccount);
    // console.log(currentAccount.pin);
    // const accountNumber = (Date.now() + "").slice(-10);
    // currentAccount.accountNumber = accountNumber;
    userNAme.textContent = currentAccount.owner.split(" ")[0];
    fundAccountNumber.textContent = currentAccount.accountNumber;
    accountNumberValue.textContent = currentAccount.accountNumber;
    closeLogin();
    displayTransaction(currentAccount);
    printBalance(currentAccount);
    calcDisplaySummary(currentAccount);
    dateTxt.textContent = getFormattedDate(today);
    // closeLogin();
    mainSection.style.display = "flex";
  }
});

// sumary
const updateUi = function (acc) {
  // displayMovement
  displayTransaction(acc);

  // displaybalance
  printBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

const calcDisplaySummary = function (acc) {
  // TOTAL DEPOSIT

  const totalDeposit = acc.transactions
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acm, curr) => acm + curr, 0);
  acc.totalDeposit = totalDeposit;
  incomePrice.textContent = `${formatLargeNumber(totalDeposit)}`;

  // TOTAL WITHDRAWAL

  const totalWithdrawal = acc.transactions
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acm, curr) => acm + curr, 0);

  outcomePrice.textContent = `${formatLargeNumber(Math.abs(totalWithdrawal))}`;

  // INTEREST

  // const interestRate = acc.interestRate / 100;
  // const interest = acc.movements
  //   .filter(mov => mov > 0)
  //   .map(mov => mov * interestRate)
  //   .filter(int => int >= 1)
  //   .reduce((acm, curr) => acm + curr, 0);
  // labelSumInterest.textContent = `${interest}€`;
};

// updating transaction history

const displayTransaction = function (acc, sort = false) {
  transactionHistoryCont.innerHTML = "";
  const movs = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const otherPartyAccount = accounts.find((a) =>
      a.transactions.includes(-mov)
    );
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
          <div class="transaction--date">3 days ago</div>
        </div>
        <div class="transaction-value value-type-${type}">
        ₦${formatLargeNumber(Math.abs(mov))}
        </div>
      </div>
    `;

    transactionHistoryCont.insertAdjacentHTML("afterbegin", html);
  });
};

// display notification functionality

const displayNotification = function (acc, sort = false) {
  notificationContainer2.innerHTML = "";
  const movs = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const otherPartyAccount = accounts.find((a) =>
      a.transactions.includes(-mov)
    );
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
    } ₦<span class="msg-amount">${formatLargeNumber(Math.abs(mov))}.00</span> ${
      type === "deposit" ? "from" : "to"
    }
                <span class="notification-source">${otherPartyName}</span>
                ${type === "deposit" ? "Successfully" : "was successfull"}
              </p>
              <p class="notification-time">1:20pm</p>
            </div>
           
          </div>
    `;

    notificationContainer2.insertAdjacentHTML("afterbegin", html);
  });
};

// print balance
const printBalance = function (acc) {
  const balance = acc.transactions.reduce((acm, cur) => {
    return acm + cur;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${formatLargeNumber(acc.balance)}`;
};

sendMoneyBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const receiverAcnt = accounts.find(
    (acc) => acc.accountNumber === Number(recipientAccountNumber.value)
  );

  const amount = Number(transferInput.value);
  if (!receiverAcnt) {
    return showToast(
      `<i class="fa-solid fa-circle-exclamation"></i><p class="toast-msg"> Recipient Account Number Does Not Exist, Check Account Number and Try Again</p>`
    );
  }
  if (receiverAcnt) {
    if (amount < 1) {
      return showToast(
        `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Please Enter A Valid Amount</p>`
      );
    }
    if (currentAccount.balance < 1 || currentAccount.balance < amount) {
      return showToast(
        `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">You Don't have Sufficient Balance To Execute This Transaction, Fund Account and Try Again</p>`
      );
    }
    if (receiverAcnt.accountNumber === currentAccount.accountNumber) {
      return showToast(
        `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">You can not send money to your own account</p>`
      );
    }
    if (
      amount > 0 &&
      currentAccount.balance > 0 &&
      currentAccount.balance >= amount &&
      receiverAcnt.accountNumber !== currentAccount.accountNumber
    ) {
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
      <p class="detail">${receiverAcnt.owner}</p>
    </div>
    <div class="detail-row">
      <p class="detail-title">Amount</p>
      <p class="detail">₦${formatLargeNumber(amount)}</p>
    </div>
      </div>
      <button class="btn-confirm">Confirm</button>
    </div>`;
      pushNotification.insertAdjacentHTML("afterbegin", confirmationCont);
      pushNotification.style.display = "flex";
      const confirmButton = document.querySelector(".btn-confirm");
      confirmButton.addEventListener("click", function () {
        currentAccount.transactions.push(-amount);
        receiverAcnt.transactions.push(amount);

        updateUi(currentAccount);
        displayNotification(currentAccount);
        document.querySelector(".confirmation-container").style.display =
          "none";
        document.querySelector(".push-notificstion").style.display = "block";

        pushMsg.textContent = `₦${formatLargeNumber(amount)} sent to ${
          receiverAcnt.owner
        }`;
        // Set a timeout to hide the push notification after 6 seconds
        setTimeout(() => {
          document.querySelector(".push-notificstion").style.display = "none";
          pushNotification.style.display = "none";
          pushMsg.textContent = "";
        }, 3000);
        localStorage.setItem("accounts", JSON.stringify(accounts));
      });
    }

    transferInput.value = "";
    recipientAccountNumber.value = "";
  }
});

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

// loan functionality

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(loanInput.value);
  if (currentAccount.totalDeposit === 0) {
    return showToast(
      `<i class="fa-solid fa-circle-exclamation"></i><p class="toast-msg"> You Are Not Eligible for a Loan, Make Deposits To Qualify</p>`
    );
  }
  if (amount < 1) {
    return showToast(
      `<i class="fa-solid fa-circle-exclamation"></i><p class="toast-msg"> Amount can't be less than 1</p>`
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
    currentAccount.transactions.some((mov) => mov >= amount * 0.1) &&
    amount < currentAccount.totalDeposit
  ) {
    setTimeout(() => {
      // inputLoanAmount.value = "";
      // document.querySelector(".confirmation-container").style.display = "none";
      pushNotification.style.display = "flex";
      document.querySelector(".push-notificstion").style.display = "block";

      pushMsg.textContent = `Your loan request of ₦${formatLargeNumber(
        amount
      )} was succesful`;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }, 500);

    setTimeout(() => {
      document.querySelector(".push-notificstion").style.display = "none";
      pushNotification.style.display = "none";
      pushMsg.textContent = "";
    }, 5000);
    loanInput.value = "";

    setTimeout(() => {
      currentAccount.transactions.push(amount);

      updateUi(currentAccount);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }, 8000);
  }
});

// ===================================================NOTIFICATION FUNCTIONALITY=============================================================
notificationIcon.forEach((icon) => {
  icon.addEventListener("click", function () {
    toggleNotification();
    displayNotification(currentAccount);
  });
});
overlay.addEventListener("click", toggleNotification);

// ====================================================APP FUNCTIONALITY=============================================================================================================

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

// ================================================================= ALL FUNCTIONS ========================================================================
navigation();
