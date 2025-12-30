// ---------------- MOBILE VALIDATION ----------------
const mobile = document.getElementById("mobile");
const mobileError = document.getElementById("mobileError");

mobile.addEventListener("input", () => {
  const value = mobile.value.replace(/\D/g, "");
  mobile.value = value;

  if (value.length === 0) {
    mobileError.style.display = "none";
  } 
  else if (value.length > 10) {
    mobileError.textContent = "Mobile number must not exceed 10 digits.";
    mobileError.style.display = "block";
  } 
  else if (!/^[9876]/.test(value)) {
    mobileError.textContent = "Mobile number must start with 9, 8, 6, or 7.";
    mobileError.style.display = "block";
  } 
  else if (value.length < 10) {
    mobileError.textContent = "Mobile number must contain exactly 10 digits.";
    mobileError.style.display = "block";
  } 
  else {
    mobileError.style.display = "none";
  }
});

// ---------------- EMAIL VALIDATION ----------------
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");

email.addEventListener("input", () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (email.value === "") {
    emailError.style.display = "none";
  } 
  else if (!emailPattern.test(email.value)) {
    emailError.textContent =
      "Please provide a valid email address ending with @gmail.com.";
    emailError.style.display = "block";
  } 
  else {
    emailError.style.display = "none";
  }
});

// ---------------- INSTALLMENT CALCULATION ----------------
function calculateInstallments() {
  const budgetInput = document.getElementById("budget");
  const budget = parseFloat(budgetInput.value);

  if (isNaN(budget) || budget <= 0) {
    alert("Please enter a valid project budget.");
    budgetInput.focus();
    return;
  }

  const installment = (budget / 3).toFixed(2);

  const first = document.querySelector(".advance");
  const second = document.querySelector(".project");
  const third = document.querySelector(".completion");

  first.textContent = `First: ₹${installment}`;
  second.textContent = `Second: ₹${installment}`;
  third.textContent = `Third: ₹${installment}`;

  // Add professional active state
  first.classList.add("active");
  second.classList.add("active");
  third.classList.add("active");
}


// ---------------- PRINT VALIDATION ----------------
function printPage() {

  const requiredFields = document.querySelectorAll(
    "input[required], textarea[required]"
  );

  let firstErrorField = null;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.border = "2px solid red";
      if (!firstErrorField) firstErrorField = field;
    } else {
      field.style.border = "";
    }
  });

  // 🔴 REQUIRED FIELD CHECK
  if (firstErrorField) {
    alert("Please fill all required fields before printing.");
    firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstErrorField.focus();
    return;
  }

  // 🔴 MOBILE / EMAIL CHECK
  if (
    mobileError.style.display === "block" ||
    emailError.style.display === "block"
  ) {
    alert("Please correct mobile number or email before printing.");
    return;
  }

  // 🔴 INSTALLMENT CHECK
  const budget = document.getElementById("budget").value;
  if (!budget || budget <= 0) {
    alert("Please enter project budget and calculate installments.");
    return;
  }

  // ✅ ALL OK
  window.print();
}
