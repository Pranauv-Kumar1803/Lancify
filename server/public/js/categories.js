const btn = document.getElementById('submit');

btn.addEventListener('click',async (e)=>{
    e.preventDefault();

    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;

    const two = document.getElementById('1d').checked;
    const four = document.getElementById('3d').checked;
    const seven = document.getElementById('4d').checked;

    const hours = two?24:four?48:seven?90:null;
    
    if(hours)
    {
        window.location.href = window.location.href + `?min=${min}&max=${max}&hours=${hours}`
    }
    else
    {
        window.location.href = window.location.href + `?min=${min}&max=${max}`
    }

})

const clear = document.getElementById('clear');

clear.addEventListener('click',async (e)=>{
    e.preventDefault();
    window.location.href = window.location.href.split('?')[0]
})