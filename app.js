"use strict";

const sideBarNav = document.querySelectorAll(".side-bar-nav");
const pages = document.querySelectorAll(".page");
const userImg = document.querySelector(".welcome-img");
const balance = document.querySelector(".balance");
const accountNumber = document.querySelector(".account-number");
const dateTxt = document.querySelector(".Date-txt");
const profileIcon = document.querySelector(".profile-icon");
const notificationIcon = document.querySelector(".notification-icon");
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
const fundAccountNumber = document.querySelector(".fund-acnt-num");
const copyBtn = document.querySelector(".copy-btn");
const bottomNav = document.querySelector(".botton-nav");
const btmNavItem = document.querySelectorAll(".btm-nav-item");
const btmIconInactive = document.querySelectorAll(`.btm-nav-img`);
const btmIconActive = document.querySelectorAll(".btm-nav-img-active");
const btmNavTitle = document.querySelectorAll(".btm-nav-title");
const notificationContainer = document.querySelector(".notification-maincont");
const overlay = document.querySelector(".overlay");
// const notificationIcon=document.querySelector('.notification-icon')
// ========================================================NAVIGATION FUNCTION===================================================================
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

  btmNavItem.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      btmNavTitle.forEach((btmNavTitle) =>
        btmNavTitle.classList.remove("btm-nav-title-active")
      );
      // btmIconActive.forEach((inactiveBtn) => {
      //   inactiveBtn.style.display = "block";
      // });
      btmIconActive.forEach((btn) => {
        btn.style.display = "none";
      });
      btmIconInactive.forEach((inactiveBtn) => {
        inactiveBtn.style.display = "block";
      });
      btmIconInactive[index].style.display = "none";
      btmIconActive[index].style.display = "block";
      btmNavTitle[index].classList.add("btm-nav-title-active");
      console.log(btmNavTitle[index]);
      togglePages(index);
    });
  });
  //  variable to track the clicked state
  let clicked = false;
  tabBtn.forEach((tab, index) => {
    tab.addEventListener("mouseover", function () {
      tab.style.color = "#00f262";
      tab.style.backgroundColor = "#363636";
      tabBtnImg[index].style.display = "none";
      tabBtnHovered[index].style.display = "block";
      console.log(`${index} was hovered`);
    });

    tab.addEventListener("mouseout", function () {
      tab.style.color = "#292d32";
      tab.style.backgroundColor = "#F7F9FC";
      tabBtnImg[index].style.display = "block";
      tabBtnHovered[index].style.display = "none";
      console.log(`${index} was out`);
    });

    tab.addEventListener("click", function () {
      togglePages(index + 1);
    });
  });
};

// ===================================================NOTIFICATION FUNCTIONALITY=============================================================
notificationIcon.addEventListener("click", toggleNotification);
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
// const accounts = require("./index");
// console.log(accounts);

// ================================================================= ALL FUNCTIONS ========================================================================
navigation();
