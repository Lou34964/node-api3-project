// code away!
const server = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
  console.log(`\n\n *** API Server is runnng and listening on port:${port}. *** \n\n`);
})