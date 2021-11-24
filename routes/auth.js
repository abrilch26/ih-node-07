const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")

//Crear usuario
//Mostrar el formulario
router.get("/signup", authController.viewRegister)

//Enviar datos a la DB que viene del formulario
router.post("/signup", authController.register)

module.exports = router