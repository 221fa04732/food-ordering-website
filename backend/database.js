const dotenv = require('dotenv')
const mongoose = require("mongoose");
dotenv.config()

const URL = process.env.URL
console.log(URL)

mongoose.connect(URL)

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : String
})

const user =mongoose.model('user' ,userSchema)

module.exports={
    userdata : user
}
