//llamamos a express 
const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const { validateServices } = require('../middleware/servicesValidator');

//importamos funciones de CRUD
const { getServices, getService, deleteService, postService, putService } = require('../controllers/servicesControllers')

//tomar solo un servicio con un id concreto
router.get('/:id', getService);

router.get('/', getServices);

//router.post('/',postService);//poniendo.exist() no haria falta el require?

router.post('/',
    [check('service', 'Especifica el servicio').not().isEmpty(),
    check('description', 'Especifica la descripcion del servicio').not().isEmpty(), validateServices],
    postService);//poniendo.exist() no haria falta el require?

router.put('/:id',
    [check('service', 'Especifica el servicio').not().isEmpty(),
    check('description', 'Especifica la descripcion del servicio').not().isEmpty(), validateServices],
    putService);

router.delete('/:id', deleteService);

module.exports = router;