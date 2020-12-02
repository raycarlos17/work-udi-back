var express = require('express');
var router = express.Router();
const middlewareAgendaServico = require('../middlewares/agendaServico');
const controllersAgendaServico = require('../controllers/agendaServico');

router.post('/',
  middlewareAgendaServico.agendaServico,
)

router.get('/:id', 
  middlewareAgendaServico.agendaServiceOcupada,
)

module.exports = router;