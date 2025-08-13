
import app from 'express'
const router = app.Router()
import usuarios from '../models/users.js'
import {registrarUsuarioSchema, cambiarNombreDeUsuarioSchema} from "../../zodSchema.js";
import z, { number } from "zod"
import bcrypt from "bcrypt";







router.get('/', (req, res)=>{
	res.render("inicio")
})
router.get('/registrarse', (req, res)=>{
	res.render("registrarse")
})

router.get('/iniciarSesion', (req, res)=>{
	res.render("iniciarSesion")
})


router.post('/registrarse',async (req, res)=>{
	try {
		const viejosnombreDeUsuario = await usuarios.findOne({where:{nombreDeUsuario: `${req.body.nombreDeUsuario}`}, raw: true}) 
		const viejosEmails = await usuarios.findOne({where:{email: `${req.body.email}`}, raw: true}) 
		if(viejosnombreDeUsuario !== null || viejosEmails !== null){ 
			if(viejosEmails === null && viejosnombreDeUsuario !== null){
				throw res.send("nombre de usuario en uso")
			}else{
				throw res.send("email en uso")
			}
		}else{
			const edadANumero = Number(req.body.edad)
			req.body.edad = edadANumero
			const resultado = await registrarUsuarioSchema.parse(req.body)
			if(resultado !== typeof(Error)){
				const encriptarContraseña = await bcrypt.hash(`${req.body.contraseña}`, 10)
				const resultado = await bcrypt.compare(`${req.body.confirmarContraseña}`, `${encriptarContraseña}`)
				if(resultado){
					req.body.contraseña = encriptarContraseña
					await usuarios.create(req.body)
					res.send("mi perfil")
				}else{
					res.send("no coinciden las contraseñas")
				}
			}
		}
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}else{
			console.log(error)
		}
	}
})


router.post('/iniciarSesion', async (req, res)=>{
	const usuario = await usuarios.findOne({where:{nombreDeUsuario: `${req.body.nombreDeUsuario}`}, raw: true, attributes: ['nombreDeUsuario', 'contraseña', 'id']}) 
	if(usuario === null){
		throw res.send("nombre de usuario no existe")
	}
	const coincidencia = await bcrypt.compare(`${req.body.contraseña}`, `${usuario.contraseña}`) 
	if(!coincidencia){
		res.send("contraseña incorrecta")
	}else{
		res.send("mi perfil")
	}
})


export default router

