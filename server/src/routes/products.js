const express = require('express');
const router = express.Router();
router.use(express.json());
const productsController = require('../controllers/productController')

router.get('/:id', productsController.getProductsById)

router.post('/addProduct',productsController.addProduct);

router.delete('/delete/:id', productsController.deleteProduct)

router.get('/', productsController.getAllProducts)

router.get('/filter/:filter_type',productsController.getProductsByFilter)

router.get('/insights/monthwise', productsController.getProductCountMonthwise)

router.get('/insights/productByCategories', productsController.getProductCountCategorywise);

router.get('/insights/productByGender', productsController.getProductCountGenderwise);

router.put('/:id',productsController.updateField)

module.exports = router;
