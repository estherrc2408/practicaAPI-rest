const User = require('../models/modelUsers');
const bcrypt=require('bcryptjs');
const{jwtGenerator}=require('../helpers/jwt');

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


module.exports = {
    register,
    login,
    renew
}