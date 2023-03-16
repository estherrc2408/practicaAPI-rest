const consult = async (path, meth, body) => {
    //meter try catch
    try {
        const urlBase = 'http://localhost:3000';
        let options = {};
        //const {service,description}=body;
        let data = { ...body };
        if (meth == 'post' || meth == 'put') {
            // const {service,description}=body;
            options = {
                method: meth,
                //body:JSON.stringify({service:service,description:description}),
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        if (meth == 'delete') {
            options = {
                method: meth,
                //buscar que mas mandar en delete
            }
        }
        if (meth == 'get') {
            options = {
                method: meth,
            }
        }

        console.log(options);
        console.log(urlBase, '/', path);
        const response = await fetch(`${urlBase}/${path}`, options);
        console.log(response.status, ' ,status, ', response.ok);
/*
en caso de que lo queramos parsear directamente en la consulta.

        response=response.json()

*/
        if (response.ok == false || response.status != 200) {
            throw response.status
        }
        return response;

    } catch (error) {
        return res.status(error).json({
            ok: false,
            msg: `ERROR ${error}`,
        });
    }
}

// const consult = await fetch('http://localhost:3000/api/v1/services',{
//     method:'post',
//     body:JSON.stringify({service,description}),
//     header:{
//         'Content-Type':'application/json'
//     }
// })

// const consult = async(url,method,body) => {

//     let options={}

//     if(method=='post' || method=='put'){
//         await fetch('http://localhost:3000'+url,
//          options={
//             method:method,
//             body:JSON.stringify({
//                 servicio:servicio,
//                  descripcion:descripcion
//              }),
//             headers:{
//                 'Content-type':'application/json'
//             }
//         })
//     }else{
//        await fetch('http://localhost:3000'+url,method)
//     }
// }
module.exports = {
    consult
}