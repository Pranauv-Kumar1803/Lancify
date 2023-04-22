/*eslint-disable*/

const signup_form = document.getElementById('signup-form');

signup_form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = signup_form.querySelector('#name').value;
    const email = signup_form.querySelector('#email').value;
    const password = signup_form.querySelector('#password').value;
    const confirmpassword = signup_form.querySelector('#confirmpassword').value;

    if (name === "") {
        alert("Name is required");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid email address");
        return;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters long.");
        return;
    }

    if (password !== confirmpassword) {
        alert("Passwords do not match");
        return;
    }

    obj = { name: name, email: email, password: password };
    const res = await fetch('http://localhost:5500/auth/register', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": 'application/json'
        }
    });

    if (!res.ok) {
        alert('invalid input/server error');
        signup_form.reset();
    }
    else {
        alert('Sign up successful');
        window.location.href = '/login'
    }
});

const signin_form = document.getElementById('signin-form');

signin_form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = signin_form.querySelector('#email').value;
    const password = signin_form.querySelector('#password').value;

    if (!isValidEmail(email)) {
        alert("Invalid email address.");
        return;
    }

    if (password === "") {
        alert("Password is required.");
        return;
    }

    obj = { email: email, password: password };
    const res = await fetch('http://localhost:5500/auth/login', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        alert('User Not Found / Server Error');
        signin_form.reset();
    }
    else {
        alert('login successful');
        window.location.href = '/'
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}