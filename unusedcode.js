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

// ======================================================LOGIN VALIDATION========================
console.log("logged in");
currentAccount = accounts.find((acc) => {
  return acc.email === inputLoginEmail.value.toLowerCase();
});
console.log(currentAccount);
if (!currentAccount || currentAccount.pin != Number(inputLoginPassword.value)) {
  showToast(
    `<i class="fa-solid fa-circle-exclamation"></i> <p class="toast-msg">Wrong Email or Password</p>`
  );
  inputLoginEmail.style.border = "1px solid #FF0000";
  inputLoginPassword.style.border = "1px solid #FF0000";
  inputLoginEmail.style.color = "#FF0000";
  inputLoginPassword.style.color = "#FF0000";
}

// ====================================================================LOAN VALIDATION=============================================================
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
