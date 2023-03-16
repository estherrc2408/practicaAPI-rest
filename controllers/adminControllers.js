//mostrar el formulario para introducir un nuevo servicio
const Service = require('../models/modelService')

const { consult } = require('../helpers/fetch');

const getNewService = (req, res) => {
    res.render('./admin/newService', {
        title: 'Create new service'
    })
};
const getServicesAdmin=async(req,res)=>{

    const response=await consult('api/v1/services','get',res.body);//res o req?
    const {data,ok}=await response.json();

    res.render('./admin/viewServices',{//esto abre los servicios con botones de edicion vista admin
        title: 'titulo services vista admin',
        msg:'mensaje ge services vista admin',
        services:data
    })
    
    // try{
    //     const services=await Service.find()
        
    //     console.log(services);
    //     if(!services){
    //         throw res.status(404).json({
    //             ok:false,
    //             msg:'ERROR 404 NOT FOUND desde vista admin'
    //         })
    //     }else{
    //     return res.render('./admin/viewServices',{
    //         services
    //     })
    //     }
    // }catch(error){
    //     res.status(500).json({error});
    // }
    }



const postNewService = async (req, res) => {
    try {
        //pedimos el fetch consult(path,method,body)
        await consult('api/v1/services','post',req.body);

        res.redirect('/admin/services/new');

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'ERROR, no se ha podido crear el servicio'
        })
    }
    
}

const updateNewService = async (req,res) => {
    try{
        await consult('api/v1/services','get',res.body);

    }catch(error){
        return res.status(404).json({
            ok:false,
            msg:'ERROR,no se ha podido actualizar el servicio'
        })
    }
}

module.exports = {
    getNewService,
    postNewService,
    getServicesAdmin
};