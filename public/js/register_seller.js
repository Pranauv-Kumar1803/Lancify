var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("step");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

document.getElementById("signUpForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const desc = document.getElementById('description').value;

    const languages = getSelectValues(document.getElementById('languages'));

    const occupation = document.getElementById('occupation').value;
    const country = document.getElementById('country').value;
    const institute_name = document.getElementById('institute_name').value;
    const title = document.querySelector('#in_title').value;
    const major = document.getElementById('major').value;
    const year = document.getElementById('year').value;
    const portfolio = document.getElementById('portfolio').value;
    const github = document.getElementById('github').value;
    const stack = document.getElementById('stack-overflow').value;
    const linkedin = document.getElementById('linkedin').value;

    console.log(title,major,year,portfolio,github,stack,linkedin,country,occupation,institute_name,languages,fname,lname,desc);

    if (fname.length < 5) {
        alert('first name must be atleast 5 characters in length');
        return;
    }

    if (lname.length < 5) {
        alert('last name must be atleast 5 characters in length');
        return;
    }
    
    if (description.length < 50) {
        alert('description must be atleast 50 characters in length');
        return;
    }
    
    if (profile.files.length === 0) {
        alert('select one file atleast');
        return;
    }
    
    if (languages === 'None') {
        alert('select atleast one language');
        return;
    }

    if (occupation.length < 5) {
        alert('occupation must be atleast 5 characters in length');
        return;
    }

    if (country.length < 2) {
        alert('country name must be atleast 5 characters in length');
        return;
    }

    if (institute_name.length < 5) {
        alert('institute name must be atleast 5 characters in length');
        return;
    }
    
    if (title.length < 2) {
        alert('title name must be atleast 5 characters in length');
        return;
    }
    
    if (year.length < 4) {
        alert('year must be atleast 4 characters in length');
        return;
    }

    if (portfolio.length < 5) {
        alert('any link must be atleast 15 characters in length');
        return;
    }

    if (github.length < 5) {
        alert('any link must be atleast 15 characters in length');
        return;
    }

    if (stack.length < 5) {
        alert('any link must be atleast 15 characters in length');
        return;
    }

    if (linkedin.length < 5) {
        alert('any link must be atleast 15 characters in length');
        return;
    }
    
    let obj = {};

    const file = document.querySelector('#profile').files[0];
    try {
        const b = await toBase64(file);
        obj = { seller_id: document.cookie.split(';')[1].split('=')[1], fname, lname, desc, occupation, country, institute_name, title: title, major, year, portfolio, github, stack, linkedin, languages, profile: b };
    } catch (err) {
        console.log(err);
    }

    console.log(obj);

    const res = await fetch('http://localhost:5500/register_seller', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        alert('registration successful');
        window.location.href = '/';
    }
    else {
        alert('Error in form inputs! Please Try Again');
        window.location.reload();
    }
})

function nextPrev(n) {
    var x = document.getElementsByClassName("step");

    if (n == 1 && !validateForm()) return false;

    x[currentTab].style.display = "none";

    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        document.getElementById("signUpForm").requestSubmit();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("step");
    y = x[currentTab].getElementsByTagName("input");

    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("stepIndicator")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("stepIndicator");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }

    x[n].className += " active";
}
