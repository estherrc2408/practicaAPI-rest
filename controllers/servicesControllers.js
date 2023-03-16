const Service = require('../models/modelService');//importamos el modelo de los elementos de la coleccion services

//recoger todos los servicios
const getServices = async (req, res) => {
    try {
        const services = await Service.find()//llamada a todos los servicion de la coleccion services
        //console.log(services);
        return res.status(200).json({
            ok: true,
            msg: 'obteniendo todos los servicios',
            total_services: services.length,
            data: services
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'ERROR obteniendo los services'
        })
    }
}
//recoger un solo servicio
const getService = async (req, res) => {
    //recoger el id - params usando el find by id
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        return res.status(200).json({
            ok: true,
            msg: 'obteniendo solo un servicio',
            data: service
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'ERROR obteniendo un servicio'
        })
    }
}

//crear un servicio
const postService = async (req, res) => {
    const newService = new Service(req.body);
    try {
        const service = await newService.save();
        console.log(service);
        return res.status(201).json({
            ok: true,
            msg: 'servicio creado',
            data: service
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'ERROR creando el servicio'
        })
    }
}

//actualizar un servicio
const putService = async (req, res) => {

    try {
        const id = req.params.id;
        const service = req.body.service;
        const description = req.body.description;
        //tres args: condicion({id_:id})
        const updateService = await Service.findByIdAndUpdate({ _id: id }, { $set: { service, description } }, { new: true });
        if (!updateService) {
            return res.status(404).json({
                ok: false,
                msg: 'NOT FOUND 404'
            })
        } else {
            console.log(updateService);
            return res.status(200).json({
                ok: true,
                msg: 'servicio actualizado',
                data: updateService
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'ERROR actualizando el servicio'
        })
    }
}

//eliminar un servicio
const deleteService = async(req, res) => {
    try {
        const id=req.params.id;
        const deleteService=await Service.findByIdAndDelete(id);
        if (!deleteService) {
            return res.status(404).json({
                ok: false,
                msg: 'NOT FOUND 404'
            })
        } else {
            console.log(deleteService);
            return res.status(200).json({
                ok: true,
                msg: 'servicio borrado',
                data: deleteService
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'ERROR borrando 500'
        })
    }
}

module.exports = {
    getServices,
    getService,
    postService,
    putService,
    deleteService
};