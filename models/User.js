//1. IMPORTACION
const mongoose = require ("mongoose")


//2. SCHEMA
const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Email es requerido."],
        match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un email válido."], //regex del email
        unique: true, //unico email en la base de datos
        lowercase: true, //minúsculas
        trim: true //sin espacios vacios
    },
    passwordEncriptado: String
})

//3. MODELO
const User = mongoose.model("User", userSchema)

//4. EXPORTACIÓN
module.exports = User