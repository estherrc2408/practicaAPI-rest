const express = require('express');
const router = express.Router();

const{getNewService,postNewService,getServicesAdmin}=require('../controllers/adminControllers');

//Front
//mostrar formulario crear nuevo servicio
router.get('/services/new',getNewService);
//mostrar servicios con los botones de editar y borrar (vista admin)
router.get('/services/view',getServicesAdmin);

//crear el servicio
router.post('/services/create',postNewService);

module.exports=router;