const btn = document.getElementById('submit');

btn.addEventListener('click',async (e)=>{
    e.preventDefault();

    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;

    const two = document.getElementById('2d').checked;
    const four = document.getElementById('4d').checked;
    const seven = document.getElementById('7d').checked;

    const days = two?2:four?4:seven?7:null;
    
    if(days)
    {
        window.location.href = window.location.href + `?min=${min}&max=${max}&days=${days}`
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