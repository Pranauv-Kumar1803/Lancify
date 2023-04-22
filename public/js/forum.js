let icon1 = document.getElementById("icon1");
let menu1 = document.getElementById("menu1");
const showMenu1 = (flag) => {
    if (flag) {
        icon1.classList.toggle("rotate-180");
        menu1.classList.toggle("hidden")
    }
}
let icon2 = document.getElementById("icon2");

const showMenu2 = (flag) => {
    if (flag) {
        icon2.classList.toggle("rotate-180");
    }
}
let icon3 = document.getElementById("icon3");

const showMenu3 = (flag) => {
    if (flag) {
        icon3.classList.toggle("rotate-180");
    }
};

let Main = document.getElementById("Main");
let open = document.getElementById("open");
let close = document.getElementById("close")

const showNav = (flag) => {
    if (flag) {
        Main.classList.toggle("-translate-x-full")
        Main.classList.toggle("translate-x-0")
        open.classList.toggle("hidden");
        close.classList.toggle("hidden")
    }
};

const s = document.getElementById('submit');
s.addEventListener('click', async (e) => {
    e.preventDefault();

    const some = document.getElementById('something');
    console.log(some.value);
    const href = window.location.href.split('/');
    const forum = href[href.length-1];

    const res = await fetch('http://localhost:5500/discussions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({msg:some.value,forum:forum})
    });

    console.log(res);

    if (res.ok) {
        window.location.href = '/forum';
    }
    else if(res.status==404) {
        alert('login to write a discussion! ');
        window.location.reload();
    }
    else {
        alert('some error occured');
        window.location.reload();
    }
})


const some = document.getElementsByClassName('some');
Array.from(some).forEach((s)=>{
    s.addEventListener('click', () => {
        console.log('in');
        const id = s.querySelector('#some_id').innerHTML;
        console.log(id);
        window.location.href = `/discussions/${id}`;
    })
})