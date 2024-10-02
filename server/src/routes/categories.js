const connection = require('../config/connection');
const express = require('express');
const app = express();
const router = express.Router();
router.use(express.json());
const categoriesController = require('../controllers/categoriesController')


router.get('/showCategories',categoriesController.getAllCategories)

router.get('/id/:id',categoriesController.getProductsByCategoryId)

router.get('/:name',categoriesController.getProductsByCategoryName);

router.post('/addCategories', (req, res) => {
    const data = req.body;
    res.json(data.username)
})
module.exports = router;


