const express = require('express');//importar libreria express
require('dotenv').config();
const cors = require('cors');
const {connection} = require('./helpers/dbConnect');

//configurar servidor
const app = express ();//retorna una clase
const port = process.env.PORT || 3000; //config un puerto del dev, si no está, elige el 3000


//archivos estaticos
//app.use(express.static('views',__dirname+'/public'));

//middlewares
//ejs templates
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`);
//parse application traduce para postman lo que le mandemos de crear y update
app.use(express.urlencoded({extended:false}));

//para parsear el body de la bbdd
app.use(express.json());

//conexion a la base de datos
connection();

//cors, llama a cors antes de llamar a las rutas
app.use(cors());


//rutas
//de front
app.use('/',require('./routers/routerFront'));
app.use('/admin',require('./routers/routerAdmin'));

//de la API
app.use('/api/v1/services',require('./routers/routerServices'));

app.use('/account',require('./routers/routerUsers'));
//app.use('/account',require('./routers/routerAuthUsers'));


/*404, cuando al intentar hallar los datos la respuesta tenga como status 404, el archivo renderizara
la carpeta 404.ejs y el objeto {error:'404',msg:'Not Found'}*/
app.use((req,res,next)=>{
    res.status(404).render('404',{ 
        error:'404',
        msg:'Not Found'
    })
});


app.listen(port,()=>{
    console.log('servidor por el puerto: ',port);
})