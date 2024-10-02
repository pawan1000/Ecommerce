const express = require('express');
const app = express();
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddlewares');
const cartsController = require('../controllers/cartsController');


router.get('/', cartsController.getItems)

router.put('/update/quantity/:id', cartsController.updateCart)

router.delete('/delete/:id', cartsController.deleteItem)

router.put('/update/:id', cartsController.updateCartStatus )

router.post('/addToCart', validateToken, cartsController.addItemtoCart);

router.get('/insights/:id',cartsController.getInsights);


module.exports = router;