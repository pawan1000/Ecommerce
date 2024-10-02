const categoriesServices = require('../services/categoriesService')
exports.getAllCategories = async (req, res) => {
    try {
        const result = await categoriesServices.getAllCategories();
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'internal SERVER ERROR....' + error })
    }
}

exports.getProductsByCategoryId = async (req, res) => {
    try {
        let categoryId= req.params.id;
        let result = await categoriesServices.getProductsByCategory(categoryId);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'internal SERVER ERROR....' + error })
    }
}

exports.getProductsByCategoryName = async(req,res)=>{
    try{
        const name = req.params.name;
        const page = parseInt(req.query.page) || 0;
        let result = await categoriesServices.getProductsByCategoryName(name,page);
        res.json(result);
    }
    catch(error)
    {
        res.json({error:'Internal Server Error...'+error});
    }
}