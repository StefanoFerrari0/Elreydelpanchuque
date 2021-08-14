import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel'
import jwt from 'jsonwebtoken'
import Role from '../../../models/roleModel'
import Cookies from 'cookies'

connectDB();

const handler = async (req, res) => {

    const { method } = req;
    const { username, password, email, roles} = req.body

    switch(method){

        //Iniciar sesión
        case 'GET':

            try {

                const getUser = await User.findOne({email: email}).populate("roles")

                if(!getUser){
                    throw new Error('El usuario no se encuentra registrado.')
                }

                const matchPassword = await User.comparePassword(password, getUser.password)

                if(!matchPassword){
                    throw new Error('La contraseña ingresada es incorrecta')
                }  
                
                const token = jwt.sign({id: getUser._id}, process.env.TOKEN_SECRET, {
                    expiresIn: 86400
                })

                const cookies = new Cookies(req, res);

                cookies.set('accessToken', token, {
                    //Cambiarlo en produccion a true
                    httpOnly: false,
                    sameSite: 'lax'
                })
                
                res.status(200).json({ 
                    success:true,
                    message: "Has iniciado sesión correctamente"
                })
                
            }
            catch(error){
                res.status(400).json({
                    success: false, 
                    message: error.message, 
                    token: null
                });
            }
        break;
        

        //Registrarse
        case 'POST':

            const user = new User({
                username,
                email,
                password: await User.encryptPassword(password),
            })

            if(roles){
                const getRoles = await Role.find({name: {$in: roles}})
                user.roles = getRoles.map(role => role._id)
            } else{
                const role = await Role.findOne({name: "user"})
                user.roles = [role._id]
            }

            try {

                const createUser = await User.create(user)

                const token = jwt.sign({id: createUser._id}, process.env.TOKEN_SECRET, {
                    expiresIn: 86400
                })

                res.status(201).json({
                    success: true, 
                    message: "Te has registrado correctamente",
                })

            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                    token: null
                });
            }
            break;
        
        default:
            res.status(400).json({success: false, token: null});
        break;
    }
}


export default handler;