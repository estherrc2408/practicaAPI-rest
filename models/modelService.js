const { Schema, model } = require('mongoose');

//estructura de los elementos de la collection services
const ServiceSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
/*
Habria sido igual que importar: const mongoose = require('mongoose');
declarar const Schema = mongoose.Schema;
y despues de crear el modelo ServiceSchema, declarar el modelo:
declarar: const Service=mongoose.model('Service',ServiceSchema)

*/
module.exports = model('Service', ServiceSchema);