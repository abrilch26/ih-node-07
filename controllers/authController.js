const User = require("./../models/User")
const bcryptjs = require("bcryptjs")

exports.viewRegister = (req, res) => {
	res.render("auth/signup")
}


exports.register = async (req, res) => {

	//1. OBTENCION DE DATOS DEL FORMULARIO
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password

	//=> VALIDACIÓN #1: DATOS COMPLETOS
	//Verificar que username, email y password tengan contenido
	//no deben de llegar vacíos
	if(!username || !email || !password) {
		res.render("auth/signup", {
			errorMessage: "Unos o más campos están vacíos. Revísalos nuevamente"
		})
		return 
	}

	// => VALIDACION #2: FORTALEIMIENTO DE PASSWORD
	// página: https://regexr.com/
	// regex es un conjunto de reglas que auditan un texto plano. 
	// regex es un método implítico de javaScript. Por tanto, no es necesario declararlo 
	const regex =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
	if(!regex.test(password)){
		res.render("auth/signup", {
			errorMessage: "Tu password debde de contener 6 caracteres, mínimo un númeroy una mayúscula"
		})
		return
	}


	//2. ENCRIPTACIÓN DE PASSWORD 🚩 🚩 🚩 🚩 paso super importante
	try {
		const salt = await bcryptjs.genSalt(10)
		const passwordEncriptado = await bcryptjs.hash(password, salt)
		
		const newUser = await User.create({
			username,
			email,
			passwordEncriptado
		})

		//3. REDIRECCIÓN DEL USUARIO
		res.redirect("/")
	} catch (error) {
	
		res.status(500).render("auth/signup", {
			errorMessage: "Hubo un error con la validez de tu correo. Intenta nuevamente. No dejes espacios en blanco y utiliza minúsculas"
		})
	}
}
	