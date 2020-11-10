function resCadastraWorker(req, res, next) {
    if(req.body.statusCadastraWorker === 'camposVazios'){
        res.status(400).send({"Message": "Preencher todos os campos (Required) para registrar seu perfil profissional", "respostaCadastro": 'camposVazios'})
    }
    else if(req.body.statusCadastraWorker === 'idCadastrado'){
        res.status(400).send({"Message": "Você ja possui cadastro", "respostaCadastro": "idCadastrado"})
    }
    else if(req.body.statusCadastraWorker === 'emailCadastrado'){
        res.status(400).send({"Message": "Email já cadastrado em sistema", "respostaCadastro": "emailCadastrado"})
    }
    else if(req.body.statusCadastraWorker === 'contactCadastrado'){
        res.status(400).send({"Message": "Telefone já cadastrado em sistema", "respostaCadastro": "contactCadastrado"})
    }
    else if(req.body.statusCadastraWorker === 'sucesso'){
        res.status(200).send({"Message": "Perfil profissional Cadastrado com sucesso", "respostaCadastro": "sucesso"})
    }
}

module.exports = {resCadastraWorker}