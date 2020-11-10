const mongoose = require('mongoose');
const Schema = mongoose.Schema; //a biblioteca mongoose tem o schema para permitir tipagem dos dados e modelagem

const usersModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        cpf: {
            type: String,
            unique: true,
            required: true
        },
        perfil: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { _id: true, collection: 'users' }
);

module.exports = mongoose.model('users', usersModel); 
