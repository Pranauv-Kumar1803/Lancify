/*eslint-disable*/

const signup_form = document.getElementById("signup-form");
const emailError = document.querySelector(".email-err");
const passwordError = document.querySelector(".password-err");
const nameError = document.querySelector(".name-err");

const indi = (x) => {
  x.classList.add("hide");
  x.classList.remove("show");
};

const clearFn = () => {
  indi(emailError);
  indi(passwordError);
  indi(nameError);
};

signup_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = signup_form.querySelector("#name").value;
  const email = signup_form.querySelector("#email").value;
  const password = signup_form.querySelector("#password").value;
  const confirmpassword = signup_form.querySelector("#confirmpassword").value;
  if (name === "") {
    // alert("Name is required");
    nameError.textContent = "Name is required";
    nameError.classList.remove("hide");
    nameError.classList.add("show");
    return;
  }

  if (!isValidEmail(email)) {
    // alert("Invalid email address");
    emailError.textContent = "Invalid email address";
    emailError.classList.remove("hide");
    emailError.classList.add("show");
    boolVal = true;
    return;
  }

  if (password.length < 7) {
    // alert("");
    passwordError.textContent = "Password must be at least 7 characters long.";
    passwordError.classList.remove("hide");
    passwordError.classList.add("show");
    boolVal = true;
    return;
  }

  if (confirmpassword !== password) {
    passwordError.textContent = "passwords doesnot match";
    passwordError.classList.remove("hide");
    passwordError.classList.add("show");
  }

  if (!isValidPassword(password)) {
    // alert(
    // );

    passwordError.textContent =
      "password should contain atleast one digit one special character ,one uppercase letter";
    passwordError.classList.remove("hide");
    passwordError.classList.add("show");
    boolVal = true;
    return;
  }
  obj = { name: name, email: email, password: password };
  const res = await fetch("http://localhost:5500/auth/register", {
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // alert("invalid input/server error");
    nameError.textContent = "user already exists with the given mail";
    nameError.classList.remove("hide");
    nameError.classList.add("show");
    signup_form.reset();
  } else {
    clearFn();

    document.querySelector(".spinnerrr").classList.remove("spin-hide");
    document.querySelector(".spinnerrr").classList.add("spin-block");

    setTimeout(() => {
      document.querySelector(".spinnerrr").classList.remove("spin-block");
      document.querySelector(".spinnerrr").classList.add("spin-hide");
      document.querySelector(".sign-suc-message").classList.add("flexii");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 900);
    }, 2000);
  }
});

const signin_form = document.getElementById("signin-form");
const totalsumm = document.querySelector(".total-summary");
signin_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signin_form.querySelector("#email").value;
  const password = signin_form.querySelector("#password").value;
  if (!isValidEmail(email)) {
    totalsumm.textContent = "Invalid email";
    totalsumm.classList.remove("hide");
    totalsumm.classList.add("show");
    return;
  }

  if (password === "") {
    totalsumm.textContent = "Incorrect password";
    totalsumm.classList.remove("hide");
    totalsumm.classList.add("show");
    return;
  }

  obj = { email: email, password: password };
  const res = await fetch("http://localhost:5500/auth/login", {
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    totalsumm.textContent = "User not found";
    totalsumm.classList.remove("hide");
    totalsumm.classList.add("show");
    signin_form.reset();
  } else {
    document.querySelector(".spinnerrr").classList.remove("spin-hide");
    document.querySelector(".spinnerrr").classList.add("spin-block");

    setTimeout(() => {
      document.querySelector(".spinnerrr").classList.add("spin-hide");
      document.querySelector(".spinnerrr").classList.remove("spin-block");
      document.querySelector(".xism").classList.add("flexii");
      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    }, 2000);
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passWordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/])[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/]{7,}$/;
  return passWordRegex.test(password);
}
