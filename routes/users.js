var express = require('express');
var router = express.Router();
const middlewareUser = require('../middlewares/users');
const controllersUser = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/cadastro', 
  middlewareUser.cadastraUser,
  controllersUser.resCadastraUser
);

router.post('/login',
  middlewareUser.loginUser,
  controllersUser.resLoginUser
)

router.post('/login/authenticated',
  middlewareUser.verificaToken
)

router.get('/:id',
  middlewareUser.dadosUser
)

module.exports = router;
