//llamamos a express
const express=require('express');

const router=express.Router();

//importamos las funciones que pintaran la web
const {getIndex,getServices,getContact,getLogIn}=require('../controllers/frontControllers')

router.get('/',getIndex);

router.get('/services',getServices);//'' lo que va a ir dentro de la url

router.get('/contact',getContact);

router.get('/logIn',getLogIn);



//el archivo 404 de views se invoca directamente en app.js
module.exports=router;