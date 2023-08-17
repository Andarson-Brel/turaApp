"use strict";

const sideBarNav = document.querySelectorAll(".side-bar-nav");
const pages = document.querySelectorAll(".page");
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
// const fundAccountNumber
// const notificationIcon=document.querySelector('.notification-icon')
let accountNumber;
const account1 = {
  email: "ab@g",
  accountNumber: 123,
  owner: "Jonas Schmedtmann",

  transactions: [],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  email: "ac@g",
  accountNumber: 124,
  owner: "Jessica Davis",

  transactions: [],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  email: "ad@g",
  accountNumber: 125,
  owner: "Steven Thomas Williams",

  transactions: [],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  email: "ae@g",
  accountNumber: 126,
  owner: "Sarah Smith",

  transactions: [430, 1000, 700, 50, -90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// console.log(accounts);
// console.log(accounts);

// ========================================================NAVIGATION FUNCTION===================================================================
// date function
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
}

const today = new Date();

// console.log(formattedDate); // Output: 08/13/2023 (for today's date)

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

      // change active page
      togglePages(index);
    });
  });
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
      // console.log(btmNavTitle[index]);
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
      togglePages(index + 1);
    });
  });
};

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

let currentAccount;
loginBtn.addEventListener("click", function (e) {
  navigation();
  togglePages(0);
  e.preventDefault();
  currentAccount = accounts.find((acc) => {
    return acc.email === inputLoginEmail.value.toLowerCase();
  });

  if (currentAccount?.pin === Number(inputLoginPassword.value)) {
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
    // console.log(currentAccount);
  } else {
    console.log("Account not found.");
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
  incomePrice.textContent = `${totalDeposit}`;

  // TOTAL WITHDRAWAL

  const totalWithdrawal = acc.transactions
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acm, curr) => acm + curr, 0);

  outcomePrice.textContent = `${Math.abs(totalWithdrawal)}`;

  // INTEREST

  // const interestRate = acc.interestRate / 100;
  // const interest = acc.movements
  //   .filter(mov => mov > 0)
  //   .map(mov => mov * interestRate)
  //   .filter(int => int >= 1)
  //   .reduce((acm, curr) => acm + curr, 0);
  // labelSumInterest.textContent = `${interest}€`;
  // return console.log(totalDeposit);
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
      : "Unknown";

    const html = `
      <div class="transaction__row">
        <div class="transaction--type transaction--type__${type}">
          <p class="message">${type === "deposit" ? "received" : "sent"}
             Money ${type === "deposit" ? "from" : "to"}
            <span class="source">${otherPartyName}</span>
          </p>
          <div class="transaction--date">3 days ago</div>
        </div>
        <div class="transaction-value value-type-credit">
        &#x20A6 ${mov}
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
      : "Unknown";

    const html = `
     <div class="notification-div">
     
            <div class="notification-thmb notification-thmb--${type}"></div>
            <div class="notification-msg-cont">
              <p class="notification-msg">
                you ${type === "deposit" ? "received" : "sent"} &#x20A6;
                <span class="msg-amount">${mov}.00</span> ${
      type === "deposit" ? "from" : "to"
    }
                <span class="notification-source">${otherPartyName}</span>
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
  labelBalance.textContent = `${acc.balance}`;
};

sendMoneyBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const receiverAcnt = accounts.find(
    (acc) => acc.accountNumber === Number(recipientAccountNumber.value)
  );

  const amount = Number(transferInput.value);
  if (
    amount > 0 &&
    currentAccount.balance > 0 &&
    receiverAcnt &&
    currentAccount.balance >= amount &&
    receiverAcnt.accountNumber !== currentAccount.accountNumber
  ) {
    currentAccount.transactions.push(-amount);
    receiverAcnt.transactions.push(amount);

    updateUi(currentAccount);
    displayNotification(currentAccount);
    console.log(`${amount} sent to ${receiverAcnt.owner}`);
  }
  transferInput.value = recipientAccountNumber.value = "";
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

  // Remove the temporary input element
  document.body.removeChild(tempInput);
});

// loan functionality

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(loanInput.value);
  if (
    amount > 0 &&
    currentAccount.transactions.some((mov) => mov >= amount * 0.1) &&
    amount < currentAccount.totalDeposit
  ) {
    currentAccount.transactions.push(amount);

    updateUi(currentAccount);
    // inputLoanAmount.value = "";
    loanInput.value = "";
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
