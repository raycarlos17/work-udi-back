function resCadastraUser(req, res, next) {
    if(req.body.statusCadastraUser === 'camposVazios'){
        res.status(400).send({"Message": "Preencher todos os campos para fazer o cadastro", "respostaCadastro": 'camposVazios'})
    }
    else if(req.body.statusCadastraUser === 'cpfInvalido'){
        res.status(400).send({"Message": "CPF Invalido", "respostaCadastro": "cpfInvalido"})
    }
    else if(req.body.statusCadastraUser === 'emailCadastrado'){
        res.status(400).send({"Message": "Email já cadastrado em sistema", "respostaCadastro": "emailCadastrado"})
    }
    else if(req.body.statusCadastraUser === 'cpfCadastrado'){
        res.status(400).send({"Message": "CPF já cadastrado em sistema", "respostaCadastro": "cpfCadastrado"})
    }
    else if(req.body.statusCadastraUser === 'sucesso'){
        res.status(200).send({"Message": "Cadastrado com sucesso", "respostaCadastro": "sucesso"})
    }
}

function resLoginUser(req, res, next){
    if(req.body.statusLogin === 'sucesso'){
        res.status(200).send({"Message": "Logado com sucesso", "respostaLogin": "sucesso",
        token: res.locals.data.token, perfil: res.locals.data.perfil, id: res.locals.data.id})
    }
    else if(req.body.statusLogin === 'invalida'){
        res.status(400).send({"Message": "Senha invalida", "respostaLogin": "invalida"})
    }
    else if(req.body.statusLogin === 'naoEncontrado'){
        res.status(400).send({"Message": "Usuario não encontrado", "respostaLogin": "naoEncontrado"})
    }
    else if(req.body.statusLogin === 'error'){
        res.status(400).send({"Message": "Erro ao fazer login", "respostaLogin": "error"})
    }
}

module.exports = { resCadastraUser, resLoginUser }