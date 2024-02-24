// import all the required things
const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/mongoose');

app.use(express.json());

app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log("Error in listen the server", err)
    }
    console.log("server is successfull listen the port", port)
})