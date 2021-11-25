//AREAS PRIVADAS: EL USUARIO DEBE DE ESTAR LOGGEADO PARA PODER ACCEDER
const usuarioLoggeado = (req, res, next) => {
	// EVALUAR SI EL USUARIO NO ESTÁ LOGGEADO
	// si no está loggeado, enviarlo a /login
	if(!req.session.currentUser){
		res.redirect("/auth/login")
		return
	}
	// Si sí está loggeado, enviarlo a la siguiente funcion(controller)
	next()
}

//AREAS DE AUTENTICACIÓN: El usuario ya se autenticó y quiere 
const usuarioNoLoggeado = (req, res, next) => {
// EVALUAR SI ESTÁ AUTENTICADO
	// SI SÍ ESTÁ AUTENTICADO...
	if(req.session.currentUser){
		return res.redirect("/")
	}

	// SI NO ESTÁ AUTENTICADO, DÉJALO PASAR AL SIGNUP O LOGIN
	next()
}

module.exports = {
	usuarioLoggeado,
	usuarioNoLoggeado
}
