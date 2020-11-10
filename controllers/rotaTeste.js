function resProcessaCalculo(req, res, next) {
    res.status(200).send({"respostaCalculo": req.body.calculo})
}

module.exports = { resProcessaCalculo }