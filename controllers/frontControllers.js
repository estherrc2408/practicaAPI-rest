//const express=require('express');
const {consult} = require('../helpers/fetch');


const getIndex = (req, res) => {

    const mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012 },
        { name: 'Tux', organization: "Linux", birth_year: 1996 },
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013 }
    ];
    const cont = { title: 'este es el titulo del index', msg: 'mensaje del index' }

    res.render('index', {
        mascots,
        cont
    });//render tendra como 
}

const getServices = async(req, res) => {
    const response=await consult('api/v1/services','get',res.body);
    const {data, ok} = await response.json()

    res.render('services', {//esto va a services.ejs
        title: 'este es el titulo de services',
        msg: 'mensaje de services',
        services:data
    })
};

const getContact = (req, res) => {
    res.render('contact', {
        title: 'este es el titulo del contact',
        msg: 'mensaje de contact',
    })
}

const getLogIn = (req, res) => {
    res.render('logIn', {
        title: 'este es el titulo del logIn',
        msg: 'mensaje de log in',
    })
}


module.exports = {
    getIndex,
    getServices,
    getContact,
    getLogIn
}