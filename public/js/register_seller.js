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
        document.getElementById("nextBtn").innerHTML = "Register!";
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
    let portfolio = document.getElementById('portfolio').value;
    let github = document.getElementById('github').value;
    let stack = document.getElementById('stack-overflow').value;
    let linkedin = document.getElementById('linkedin').value;

    console.log(title,major,year,portfolio,github,stack,linkedin,country,occupation,institute_name,languages,fname,lname,desc);

    if (fname.length < 5) {
        alert('first name must be atleast 5 characters in length');
        showTab(0);
        return;
    }

    if (lname.length < 5) {
        alert('last name must be atleast 5 characters in length');
        showTab(0);
        return;
    }
    
    if (desc.length < 50) {
        alert('description must be atleast 50 characters in length');
        showTab(0);
        return;
    }
    
    if (profile.files.length === 0) {
        alert('select one file atleast');
        showTab(0);
        return;
    }
    
    if (languages === 'None') {
        alert('select atleast one language');
        showTab(0);
        return;
    }

    if (occupation.length < 5) {
        alert('occupation must be atleast 5 characters in length');
        showTab(1);
        return;
    }

    if (country.length < 2) {
        alert('country name must be atleast 5 characters in length');
        showTab(1);
        return;
    }

    if (institute_name.length < 5) {
        alert('institute name must be atleast 5 characters in length');
        showTab(1);
        return;
    }
    
    if (title.length < 2) {
        alert('title name must be atleast 2 characters in length');
        showTab(1);
        return;
    }
    
    const y = new Date().getFullYear() + 4;
    if(year > y || y-year > 100) {
        alert('invalid year provided');
        showTab(1);
        return;
    }

    if ( portfolio.length>0 && portfolio.length < 15) {
        alert('portfolio link must be atleast 15 characters in length');
        showTab(1);
        return;
    }
    else portfolio = ''

    if (github.length>0 && github.length < 15) {
        alert('github link must be atleast 15 characters in length');
        showTab(2);
        return;
    }
    else github = ''


    if (stack.length>0 && stack.length < 15) {
        alert('stack overflow link must be atleast 15 characters in length');
        showTab(2);
        return;
    }
    else stack = ''


    if (linkedin.length < 15) {
        alert('linkedin profile link must be atleast 15 characters in length');
        showTab(2);
        return;
    }

    
    let obj = {};

    const file = document.querySelector('#profile').files[0];
    const certificates = document.querySelector('#certification').files;
    // console.log(certificates);
    try {
        let cert = [];
        for (let i = 0; i < certificates.length; i++) {
            const file = certificates[i];
            const b = await toBase64(file);
            cert.push(b);
        }
        // console.log(cert);

        const b = await toBase64(file);
        obj = { seller_id: '', fname, lname, desc, occupation, country, institute_name, title: title, major, year, portfolio, github, stack, linkedin, languages, profile: b, certificates: cert };
    } catch (err) {
        console.log(err);
    }

    // console.log(obj);

    const res = await fetch('http://localhost:5500/app/register_seller', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(res);

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
        console.log(y[i].id);
        if(( y[i].id == 'portfolio' || y[i].id == 'linkedin' || y[i].id == 'github' || y[i].id == 'stack-overflow' ))
        {
            valid = true;
        }
        else if ( y[i].value == "") 
        {
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
