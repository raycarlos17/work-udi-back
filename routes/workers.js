var express = require('express');
var router = express.Router();
const middlewareWorker = require('../middlewares/workers')
const controllersWorker = require('../controllers/workers')

router.post('/cadastro', 
    middlewareWorker.cadastraWorker,
    controllersWorker.resCadastraWorker
);

router.get('/',
    middlewareWorker.dadosWorkers,
    )

router.get('/:id', 
    middlewareWorker.dadosWorker
)

module.exports = router;