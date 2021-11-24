//1. IMPORTACION
const mongoose = require ("mongoose")


//2. SCHEMA
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    passwordEncriptado: String
})

//3. MODELO
const User = mongoose.model("User", userSchema)

//4. EXPORTACIÓN
module.exports = User