const jwt=require('jsonwebtoken');

const validateJWT=(req,res,next)=>{
    //el token se encuentra en el header o en el params, aqui lo mandaremos en el header
    const token = req.header('x-token')
    console.log(token);
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }
    try{//trycatch para comprobar si el token es correcto, metodo verify del objeto token. 2 args, el token y la firma
        //Dos args, el token y su firma
        const payload=jwt.verify(token,process.env.JWT_SECRET_KEY);
        //esto altera el requerimiento
        req.uid=payload.uid//el payload tiene el id y el nickname
        req.nickname=payload.nickname
    
    
    }catch(error){
        return res.status(500).json({
            ok:true,
            msg:'token no valido'
        })
    }

    next()//pasara a llamar al renew
}

module.exports={
    validateJWT
}