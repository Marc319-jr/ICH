let bcryptjs = require('bcryptjs');

let hash = bcryptjs.hashSync('abc123' , 10);
console.log(hash);
console.log(bcryptjs.compareSync('abc123456' ,hash));