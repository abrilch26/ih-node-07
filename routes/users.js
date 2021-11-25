//1. IMPORTACIONES
const express = require("express")
const router = express.Router()

const usersController = require("./../controllers/usersControllers")

const routeGuard = require("./../middlewares/route-guard")
console.log("El routeguard importado es:", routeGuard.usuarioLoggeado)

//2. RUTEO
router.get("/profile", routeGuard.usuarioLoggeado, usersController.profile)

module.exports = router