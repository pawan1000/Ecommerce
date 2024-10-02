const categoriesModel = require('../models/categoriesModel');
exports.getAllCategories = async () => {
    try {
        const result = categoriesModel.getAllCategories();
        return result
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getProductsByCategory= async(categoryId)=>{
    try{
        let result = await categoriesModel.getProductsByCategory(categoryId);
        return result;
    }
    catch(error)
    {
        throw new Error(error)
    }
}

exports.getProductsByCategoryName = async(name, page)=>{
    try{
        const start = page==0 ?0: page * 4-4;
        let countResult = await categoriesModel.getProductsCountByCategoryName(name);
        const totalCount = countResult[0].total;
        let fetchedResult= await categoriesModel.getProductsByCategoryName(name,page);
        return { total: countResult, rows: fetchedResult };

    }
    catch(error)
    {
        throw new Error(error)

    }
}