var express = require('express');
var router = express.Router();

const rotaTesteMiddleware = require('../middlewares/rotaTeste')
const rotaTesteController = require('../controllers/rotaTeste')

router.post('/', function(req, res, next){
    console.log('Foi enviado  um request com o seguinte conteudo ', req.body);
    res.status(200).send({"Message": "Você enviou dados para o servidor"});
});

router.get('/', 
    rotaTesteMiddleware.processaCalculo,
    rotaTesteController.resProcessaCalculo
);

module.exports = router;