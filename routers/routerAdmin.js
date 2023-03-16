const express = require('express');
const router = express.Router();

const{getNewService,postNewService,getServicesAdmin,updateService,getUpdateService,deleteService}=require('../controllers/adminControllers');

//Front
//mostrar formulario crear nuevo servicio
router.get('/services/new',getNewService);
//mostrar servicios con los botones de editar y borrar (vista admin)
router.get('/services/view',getServicesAdmin);
//mostrar formulario de edicion
router.get('/services/edit/:id',getUpdateService);

//crear el servicio
router.post('/services/create',postNewService);
//update
router.post('/services/update/:id',updateService);
//delete
router.get('/services/delete/:id',deleteService);
//router.delete('/services/delete/:id',deleteService);

module.exports=router;