const express=require('express');
const app=express();
const router=express.Router();
const { validateToken } = require('../middlewares/AuthMiddlewares');
const userController = require('../controllers/userController');

router.get('/auth', validateToken, userController.getUser)

router.post('/register', userController.registerUser);

router.post('/login',userController.loginUser )

router.get('/',userController.getAllUsernames)

module.exports=router;







