
/*

const app = require('./app.js');
const port = 3000;

app.listen(port, () => { console.log(`Express now departing from port ${port}`)})

*/

const server = require("./app")
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Express now departing from port ${port}`)) 



