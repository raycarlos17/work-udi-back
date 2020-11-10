const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validaCpf = require('@fnando/cpf');


async function cadastraUser(req, res, next){

    const cpf = validaCpf.isValid(req.body.cpf)

    if(req.body.name === null || req.body.name === undefined || req.body.name === '' ||
        req.body.email === null || req.body.email === undefined || req.body.email === '' ||
        req.body.cpf === null || req.body.cpf === undefined || req.body.cpf === '' ||
        req.body.password === null || req.body.password === undefined || req.body.password === '' ||
        req.body.perfil === null || req.body.perfil === undefined || req.body.perfil === ''){
        req.body['statusCadastraUser'] = 'camposVazios'
        next()
        return;
    }
    else if(cpf === false){
        req.body['statusCadastraUser'] = 'cpfInvalido'
        next()
        return;
    }
    else if(cpf === true){
        
        let resultadoBancoEmail;
        let resultadoBancoCpf;

        try{
            resultadoBancoEmail = await userModel.findOne({"email": req.body.email});
            resultadoBancoCpf = await userModel.findOne({"cpf": req.body.cpf});

            if(resultadoBancoEmail){
                req.body['statusCadastraUser'] = 'emailCadastrado'
                next()
                return
            }
            
            else if(resultadoBancoCpf){
                req.body['statusCadastraUser'] = 'cpfCadastrado'
                next()
                return
            }
            else{

                const hash = await bcrypt.hash(req.body.password, 10)
                req.body.password = hash
                const formatCpf = validaCpf.strip(req.body.cpf)
                req.body.cpf = formatCpf
                userModel.create(req.body);
                req.body['statusCadastraUser'] = 'sucesso'
                next()
                return;
            }
        }
        catch(error){
            console.log(error)
        }
    }
}

async function loginUser(req, res, next){
    let resultadoBanco;
    try{
        resultadoBanco = await userModel.findOne({"email": req.body.email});

        if(resultadoBanco){
            let verificaHash = await bcrypt.compare(req.body.password, resultadoBanco.password)
            if(verificaHash === true){
                let token = jwt.sign(
                    {
                        "perfil": resultadoBanco.perfil,
                        "id": resultadoBanco._id,
                        exp: Math.floor(Date.now()/ 1000) + (60 * 60 * 60)
                    }, 'workUdiPalavraDeVerificacaoDoToken'
                )
                res.locals.data = {token: token, perfil: resultadoBanco.perfil, id: String(resultadoBanco._id)};
                req.body['statusLogin'] = 'sucesso'
                next()
                return   
            }
            else{
                req.body['statusLogin'] = 'invalida'
                next()
                return
            }
        }
        else{
            req.body['statusLogin'] = 'naoEncontrado'
            next()
            return
        }
    }
    catch(error){
        req.body['statusLogin'] = 'error'
        next()
        return
    }
}

async function dadosUser(req, res, next){

    try{
        const user = await userModel.findById(req.params.id)
        res.status(200).send(user)
    }
    catch(error){
        console.log(error)
    }

}

async function verificaToken(req, res, next){

    let decoded = false

    if(req.body.token === true){
        decoded = jwt.verify(req.body.token, 'workUdiPalavraDeVerificacaoDoToken')
    }

    if(decoded){
 
        console.log(decoded)
        res.status(200).send({"decoded": decoded, "tokenValidado": true})
        return;
    }
    else if(req.body.token === null || req.body.token === undefined){
   
        console.log(decoded)
        res.status(400).send({"decoded": decoded, "tokenValidado": false})
        return;
    }
    else{
       
        console.log(decoded)
        res.status(400).send({"decoded": decoded,"tokenValidado": false})
        return;
    }
}



module.exports = {cadastraUser, loginUser, dadosUser, verificaToken}