const agendaServicoModel = require('../models/agendaServico');
const bcrypt = require('bcrypt');

async function agendaServico(req, res, next) {

  let resultadoBancoId = await agendaServicoModel.findOne({"id": req.body.id});
  let resultadoBancoData = await agendaServicoModel.findOne({"data": req.body.data});
  let resultadoBanco = await agendaServicoModel.findOne({"id": req.body.id, "data": req.body.data});
  
  try{
    if(resultadoBanco){
      req.body['statusRegistraServico'] = 'dataOcupada'
      res.status(400).send({"Message": `A data ${req.body.data} já está ocupada`, "respostaAgendamento": 'dataOcupada'})
      //next()
      return;
    }
    else {
      await agendaServicoModel.create(req.body);
      req.body['statusRegistraServico'] = 'sucesso'
      res.status(200).send({"Message": `Serviço na data ${req.body.data} agendada com sucesso`, "respostaAgendamento": "sucesso"})
      //next()
      return;
    }

  }
  catch(error){
    console.log(error)
}

}

async function agendaServiceOcupada(req, res, next) {

  try{
    const servicosOcupados = await agendaServicoModel.find({"id": req.params.id});
    res.status(200).send({"servicosOcupados": servicosOcupados})
  }
  catch(error){
    console.log(error)
  }
}

module.exports = { agendaServico, agendaServiceOcupada };