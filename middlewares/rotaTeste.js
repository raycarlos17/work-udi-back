function processaCalculo(req, res, next){
    let calculo = 2 + 2;
    req.body['calculo']= calculo
    next();
}

module.exports = {processaCalculo}