const bcrypt = require('bcrypt');

const f = async()=>{
    const p = await bcrypt.hash('pranauv1',10);

    console.log(p);
}

f();