const User = require('../models/modelUsers');
const bcrypt=require('bcryptjs');
const{jwtGenerator}=require('../helpers/jwt');

const getUsers = async(req,res)=>{
    try{
        const users =await User.find()
        if(!users){
            return res.status(400).json({
                ok:false,
                msg:'ERROR 404, not found users',
            })
        }else{
            return res.status(200).json({
                ok:true,
                msg:'obteniendo todos los usuarios',
                data_users: users,
                total_users: users.length
            })
        }
    }catch(error){
        return res.status(500).json({
            ok:false,
            msg:'ERROR 500 obteniendo los usuarios'
        })
    }
}
// //recoger solo un usuario, por email
// const getUser = async(req,res) =>{
//     try{
//         const email=rep.body.email;
//         const user = await User.find({email:email}).exec();
//         if(!user){
//             return res.status(400).json({
//                 ok:false,
//                 msg:'ERROR 404 USER NOT FOUND'
//             })
//         }else{
//             return res.status(200).json({
//                 ok:true,
//                 msg: 'buscando usuario',
//                 data_user:user
//             })
//         }
//     }catch(error){
//         return res.status(500).json({
//             ok:false,
//             msg:'ERROR 500 obteniendo usuario'
//         })
//     }
// }

// const postUser = async(req,res) =>{
//     const newUser = new User(req.body);
//     try{
//         const user = await newUser.save();
//         console.log(user);
//         return res.status(201).json({
//             ok:true,
//             msg:'creando usuario',
//             data_newUser: user
//         })
//     }catch(error){
//         return res.status(500).json({
//             ok:false,
//             msg:'error creando el usuario'
//         })
//     }
// }

//////
//LOGIN
const login = async (req, res) => {
    try {
        const { nickname, email, pass } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'No hay usuario con ese email',
            })
        }
            const passwordOk = bcrypt.compareSync(pass,user.pass);
            if(!passwordOk){
                return res.status(400).json({
                    ok:false,
                    msg:'las contrasenas no coinciden'
                })
            }else{
                const token=await jwtGenerator(user.id,user.nickname);
                return res.status(200).json({
                    ok:true,
                    msg:'el pass y el email del user'+nickname+ ' coinciden'
                })
            }
    }catch(error){
        return res.status(500).json({
            ok:false,
            msg:'ERROR 500 internal several error'
        })
    }
}


//REGISTER
const register = async (req, res) => {
    try {
        // const { nickname, email, pass } = req.body;
        // const newUser = new User(req.body);
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok: true,
                msg: 'el email ya esta registrado'
            })
        }
            console.log(user);
            user = new User(req.body);

            let salt=bcrypt.genSaltSync(10);
            user.pass=bcrypt.hashSync(pass, salt);

            await user.save();
            const token=await jwtGenerator(user.id,user.nickname);

            return res.status(201).json({
                ok:true,
                uid:user.id,
                nickname:user.nickname,
                email:user.email,
                token
            })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'ERROR 500 internal sever error '
        })
    }
}
//////////////
//RENEW
const renew=(req,res)=>{

    const{uid,nickname}=req;
    const token=jwtGenerator(uid,nickname);

    console.log(uid,nickname);
    return res.status(200).json({
        ok:true,
        user:{
            uid,
            nickname
        },
        msg:'renew jwt',
        token
    })
}


module.exports={
    getUsers,
    //postUser,
    login,
    register,
    renew
}