const mongoose = require('mongoose');
const connection = async()=>{
    const user='admin';
    const pass='admin';
    const dbname='proyecto01';
    const URI=`mongodb+srv://${user}:${pass}@cluster0.klmf3eh.mongodb.net/${dbname}?retryWrites=true&w=majority`

    console.log('viendo si conecta')
    try{
        //const response = await mongoose.connect(process.env.URI_CONNECT);
        const response = await mongoose.connect(URI);
        console.log('conectado con la BBDD')
        return response;
    }catch(error){
        console.log('no conecta');
        return{
            ok:false,
            msg:'error al conectar la bbdd',
        }
    }
}
module.exports={connection};