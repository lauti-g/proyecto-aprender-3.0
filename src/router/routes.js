import routes from '../controllers/controllers.js'



routes.get('/', routes)
routes.get('/registrarse', routes)
routes.post('/registrarse', routes)
routes.get('/iniciarSesion', routes)
routes.post('/iniciarSesion', routes)
routes.put('/cambiarNombreDeUsuario', routes)
routes.delete('/borrarUsuario', routes)




export default routes