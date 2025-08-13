import routes from '../controllers/controllers.js'



routes.get('/', routes)
routes.get('/registrarse', routes)
routes.post('/registrarse', routes)
routes.get('/iniciarSesion', routes)
//routes.get('/borrarUsuario', routes)
//routes.delete('/borrarUsuario', routes)
routes.post('/iniciarSesion', routes)


export default routes