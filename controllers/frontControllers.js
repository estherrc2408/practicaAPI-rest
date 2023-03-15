//const express=require('express');

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

const getServices = (req, res) => {
    res.render('services', {//esto va a services.ejs
        title: 'este es el titulo de services',
        msg: 'mensaje de services',
        services: [
            {
                service: 'service1',
                description: 'description1'
            },
            {
                service: 'service2',
                description: 'description2'
            },
            {
                service: 'service3',
                description: 'description3'
            }
        ]
    })
};

const getContact = (req, res) => {
    res.render('contact', {
        title: 'este es el titulo del contact',
        msg: 'mensaje de contact',
    })
}

const getSignUp = (req, res) => {
    res.render('contact', {
        title: 'este es el titulo del contact',
        msg: 'mensaje de contact',
    })
}


module.exports = {
    getIndex,
    getServices,
    getContact,
    getSignUp
}