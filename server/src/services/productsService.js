const productsModel = require('../models/productModel')
exports.getProductsById = async (productId) => {
    try {
        let result = await productsModel.getProductsById(productId);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getAllProducts = async () => {
    try {
        let result = await productsModel.getAllProducts();
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getProductCountMonthwise = async () => {
    try {
        let result = await productsModel.getProductCountMonthwise();
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductCountCategorywise = async () => {
    try {
        let result = await productsModel.getProductCountCategorywise();
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductCountGenderwise = async () => {
    try {
        let result = await productsModel.getProductCountGenderwise();
        return result;
    }
    catch (error) {
        console.error("Error in getProductCountGenderwise service:", error);
        throw new Error(error)
    }
}

exports.updateField = async (field, value, id) => {
    try {
        let result = await productsModel.updateField(field, value, id);
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.deleteProduct = async (id) => {
    try {
        let result = await productsModel.deleteProduct(id);
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductsByFilter = async (filter, page, start) => {
    try {
        let result = await productsModel.getProductsByFilter(filter, page, start);
        return result;
    }
    catch (error) {
        throw new Error(error)
    }

}

exports.addProduct = async (product, image) => {
    try {
        let result = await productsModel.addProduct(product, image);
        return result;
    }
    catch (error) {
        throw new Error(error)
    }

}