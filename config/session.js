//GESTIÓN DE LA SESIÓN
//Configuración: tiempo de expiración de la sesión

//1. IMPORTACIONES
const session = require("express-session")
const MongoStore = require("connect-mongo") // hace una copia de la cookie que mandó el cliente y la guarda en la base de datos


//2. GESTIÓN DE SESION
const sessionManager = (app) => {

    //config 1: Establecer seguridad y flexibilidad ante servidores externos, puntualmente Cloud.
    app.set("trust proxy", 1) //esto es parte de la configuración. sirve para darle flexibilidad entre elementos cloud. (1 = true)
    
    // config 2: Establecer la configuracion de la sesión
    app.use(session({
        secret: process.env.SESSION, //secret es palabra secreta para darle más seguridad a la sesión (puedes poner los caracteres que tú quieras) may, min, numero
        resave: true, //hace que tan pronto borremos una cookie, forza la reinserción de la cookie
        saveUninitialized: false, //hace que no se generen cookies a cada rato
        cookie: { // archivo único que se genera en el servidor con los datos elegidos del usuario, se envía parcialmente una copia de los datos a la base de datos y la cookie se envía al cliente
            httpOnly: true, // feature para evitar ataques de inyección (o ataques XSS)
            maxAge: 86400000 // 1 milisegundo. 1000*60*60*24 => 24 horas
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    }))
}

//3. EXPORTACIÓN
module.exports= sessionManager