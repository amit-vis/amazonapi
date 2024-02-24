const mongoose = require('mongoose');
const secure = require('./secure');
mongoose.connect(secure.mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to database"));

db.once('open', ()=>{
    console.log("Database connected to mongodb successfully")
})

module.exports = db;