//mostrar el formulario para introducir un nuevo servicio
const Service = require('../models/modelService')

const { consult } = require('../helpers/fetch');

const getNewService = (req, res) => {
    res.render('./admin/newService', {
        title: 'Create new service'
    })
};

const getServicesAdmin=async(req,res)=>{

    const response = await consult('api/v1/services','get',res.body);//res o req?
    const {data,ok} = await response.json();
    console.log(data);
    

    res.render('./admin/viewServices',{//esto abre los servicios con botones de edicion vista admin
        title: 'titulo services vista admin',
        msg:'mensaje ge services vista admin',
        services:data
    })
};

const getUpdateService=async(req,res)=>{
    const id=req.params.id;
    console.log(id);

    const response = await consult(`api/v1/services/${id}`,'get',req.body);
    const {data,ok} = await response.json();
    console.log(data);//obtiene el objeto del id indicado en el path

    res.render('./admin/updateService',{
        title: 'titulo de pagina de edicion de servicios',
        msg: 'mensaje de pagina edicion',
        service:data
    })
}

const postNewService = async (req, res) => {
    try {
        //pedimos el fetch consult(path,method,body)
        await consult('api/v1/services','post',req.body);

       return res.redirect('/admin/services/new');

    } catch (error) {
        return res.redirect('/admin/services/view');
        // res.status(404).json({
        //     ok: false,
        //     msg: 'ERROR, no se ha podido crear el servicio'
        // })
    }
    
}

const updateService = async (req,res) => {
    try{
        const id=req.params.id;
        await consult(`api/v1/services/${id}`,'put',req.body);
        return res.redirect('/admin/services/view');
    } catch (error) {
        return res.redirect('/admin/services/view');}
}


const deleteService = async(req,res)=>{
    try{
    const id=req.params.id;
    await consult(`api/v1/services/${id}`,'delete',req.body);
    return res.redirect('/admin/services/view')
} catch (error) {
    return res.redirect('/admin/services/view');}
}


module.exports = {
    getNewService,
    postNewService,
    getServicesAdmin,
    updateService,
    getUpdateService,
    deleteService
};