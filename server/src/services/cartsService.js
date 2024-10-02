const connection = require('../config/connection');
const cartsModel = require('../models/cartsModel')
exports.getItems = async (userId, cartId) => {
    try {
        if (cartId) {
            // fetching specifc product
            return await cartsModel.getCartByUserIdAndCartId(userId, cartId)
        }
        else {
            // fetching all products
            return await cartsModel.getCartByUserId(userId)
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.updateCartsItem = async (cartId, quantity) => {
    try {
        return cartsModel.updateItem(cartId, quantity)
    }
    catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteItem = async (id) => {
    try {
        return cartsModel.deleteItem(id)
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.updateCartsStatus = async (id) => {
    try {
        return await cartsModel.updateCartStatus(id);
    }
    catch (error) {
        throw new Error(error);

    }
}

exports.addItemtoCart = async (name, price, image, user_id, id, size) => {
    try {
        let result = await cartsModel.addItemToCart(name, price, image, user_id, id, size);
        return result;
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getInsights = async (seller_id, month) => {
    try {
        let totalPurchase = await cartsModel.getTotalPurchase(seller_id);
        let avgPrice = await cartsModel.getAvgPrice(seller_id, month);
        let toalReturn = await cartsModel.getTotalReturn(seller_id);
        let topSellingProduct = await cartsModel.getTopSellingProduct(seller_id);
        let totalProduct = await cartsModel.getTotalProduct(seller_id, month);
        let data = { ...totalPurchase, ...avgPrice, ...toalReturn, ...topSellingProduct, ...totalProduct };
        return data;
    }
    catch (error) {
        throw new Error(error)
    }

}