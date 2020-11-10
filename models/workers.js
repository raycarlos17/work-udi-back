const mongoose = require('mongoose');
const Schema = mongoose.Schema; //a biblioteca mongoose tem o schema para permitir tipagem dos dados e modelagem

const workersModel = new Schema(
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
        occupation: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            unique: true,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        id: {
            type: String,
            unique: true,
            required: true,
            collection: 'workers'
        }
    }
);

module.exports = mongoose.model('workers', workersModel); 