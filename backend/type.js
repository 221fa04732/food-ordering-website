const zod = require('zod')

const user = {
    name :  zod.string(),
    email : zod.string(),
    password : zod.string().min(8),
    phone : zod.string().min(10)
}

module.exports = {
    Uname : user.name,
    Uemail : user.email,
    Upassword : user.password,
    Uphone : user.phone
}