import 'dotenv/config' 
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    password: process.env.DB_contrasena,
    username: process.env.DB_usuario,
    database: process.env.DB_baseDeDatos,
    host: process.env.DB_host,
    dialect: "mysql"
});



/*(async()=>{
    try {
        await sequelize.authenticate()
        console.log("anda")
    } catch (error) {
        console.error(error)
    }
    
})()*/

export default sequelize