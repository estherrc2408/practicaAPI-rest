const express = require('express');

const router = express.Router();
const { validateJWT } = require('../middleware/validarJWT');

const {register,login,renew}=require('../controllers/authUserControllers');

router.post('/new',register);

router.post('/',login);

router.get('/renew',validateJWT,renew);


//router.get('/renew',renewToken);

module.exports=router;
