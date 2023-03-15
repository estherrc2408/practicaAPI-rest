const jwt = require('jsonwebtoken');

const jwtGenerator = (uid, name) => {

    return new Promise((resolve, reject) => {
        let payload = { uid, name };
        //metodo sign, requiere metodo, firma(.env), expiracion y una funcion de 2 args, 1 error y el token
        //payload es un objeto  con los datos visibles, nada de contrasenas
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KET,
            { expiresIn: '3h' },
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('error al generar el token')
                }
                resolve(token)
            }
        )
    })
}

//usaremos el token en el login y en el renew token
module.exports={
    jwtGenerator
};