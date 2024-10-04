
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mrityunjay:sLVhARIgCxR2sqPO@test-project.evy2o.mongodb.net/testUsers")

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
