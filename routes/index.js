var express = require('express');
var router = express.Router();

var userController = require('../controller/usercontroller');

var loginController = require('../controller/logincontroller');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user',userController.createUser);
router.get('/user',userController.getUser);
router.delete('/user/:id',userController.deleteUser);
router.put('/user/:id',userController.updateUser);
router.get('/user/:id',userController.getUserById);

router.post('/register',loginController.addUser);
router.get('/login',loginController.login)
router.get('/restrictedpage',loginController.restrictedPage);



module.exports = router;
