const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")
const routeGuard = require("./../middlewares/route-guard")

//CREAR USUARIO
//Mostrar el formulario
router.get("/signup", routeGuard.usuarioNoLoggeado, authController.viewRegister)

//Enviar datos a la DB que viene del formulario
router.post("/signup", routeGuard.usuarioNoLoggeado, authController.register)



//INICIAR SESIÓN
//a. mostrar el formulario
router.get("/login", routeGuard.usuarioNoLoggeado, authController.viewLogin)

//B. manejo del formulario
router.post("/login", routeGuard.usuarioNoLoggeado, authController.login)


// CERRAR SESIÓN
router.post("/logout", routeGuard.usuarioLoggeado, authController.logout)

module.exports = router