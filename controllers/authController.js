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


//LOGIN
exports.viewLogin = async (req, res) => {
	res.render("auth/login")
}


exports.login = async (req, res) => {
	try {

	//1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const email = req. body.email
	const password = req.body.password

	//2. VALIDACIÓN DE USUARIO ENCONTRADO ¿existe?
	const foundUser = await User.findOne({email}) //filtro que buscapor email y el resultado se guarda en foundUser

	if(!foundUser) {
		res.render("auth/login", {
			errorMessage: "Email o contraseña sin coincidencia"
		})
		return
	}

	//3. VALIDACIÓN DE CONTRASEÑA (una vez que veo que si existe, comparo el que manda el form vs el que está guardado en base de datos)
	//comparar la contraseña del formulario (1) vs la contraseña de la base de datos
	const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)

	if (!verifiedPass) {
		res.render("auth/login", {
			errorMessage: "Email o contraseña érronea. Intenta nuevamente."
		})
		return
	}

	//4. generar la sesión con cookies (soon)
	//persistencia de identidad
	req.session.currentUser = {
		_id: foundUser._id,
		username: foundUser.username,
		email: foundUser.email,
		mensaje: "LO LOGRAMOS CARAJO"
	}

	//5. redireccionar al home
	res.redirect ("/users/profile")
	
	} catch (error) {
		console.log(error)
	}
}


exports.logout = async (req, res) => {
	//res.clearCookie('session-token')
	req.session.destroy((error) => {
		//se ejecuta 
		if(error) {
			console.log(error)
			return //next (error)
		}
		res.redirect("/")
	})
}