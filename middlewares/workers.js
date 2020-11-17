const workersModel = require('../models/workers');

async function cadastraWorker(req, res, next) {

    console.log(req.body)

    let resultadoBancoEmail = await workersModel.findOne({"email": req.body.email});
    let resultadoBancoContact = await workersModel.findOne({"contact": req.body.contact});;
    let resultadoBancoId = await workersModel.findOne({"_id": req.body.id});

    try{
        if(req.body.name === null || req.body.name === undefined || req.body.name === '' ||
        req.body.email === null || req.body.email === undefined || req.body.email === '' ||
        req.body.occupation === null || req.body.occupation === undefined || req.body.occupation === '' ){
            req.body['statusCadastraWorker'] = 'camposVazios'
            next()
            return;
        }
        else if(resultadoBancoId){
            req.body['statusCadastraWorker'] = 'idCadastrado'
            next()
            return
        }
        else if(resultadoBancoEmail){
            req.body['statusCadastraWorker'] = 'emailCadastrado'
            next()
            return
        }
        else if(resultadoBancoContact){
            req.body['statusCadastraWorker'] = 'contactCadastrado'
            next()
            return
        }
        else{
            workersModel.create(req.body)
            req.body['statusCadastraWorker'] = 'sucesso'
            next()
            return;
        }
    }
    catch(error){
        console.log(error)
    }
}

async function dadosWorkers(req, res, next){

    try{
        const workers = await workersModel.find()
        res.status(200).send({"workers": workers})
    }
    catch(error){
        console.log(error)
    }
   
}

async function dadosWorker(req, res, next){

    try{
        const worker = await workersModel.findOne({"_id": req.params.id})
        console.log(worker)
        res.status(200).send(worker)
    }
    catch(error){
        console.log(error)
    }

}


module.exports = {cadastraWorker, dadosWorkers, dadosWorker}