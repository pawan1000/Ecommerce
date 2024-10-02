const cartsService = require('../services/cartsService')
exports.getItems = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const cartID = req.query.cart_id;
        const result = await cartsService.getItems(userId, cartID);
        res.json(result)
    }
    catch (error) {
        console.log('error in the carts service ....' + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const quantity = req.body.quantity;
        const result = cartsService.updateCartsItem(cartId, quantity);
        res.json(result)
    }
    catch (error) {
        console.log('error in the carts service ....' + error);
        res.json({ message: 'internal server error' }).status(500)
    }
}

exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        let result = cartsService.deleteItem(id)
        res.json(result)
    }
    catch (error) {
        console.log('error in the carts service ....' + error);
        res.json({ message: 'Internal Server Error' }).status(500)
    }
}

exports.updateCartStatus = async (req, res) => {
    const id = req.params.id;
    try {
        let result = await cartsService.updateCartsStatus(id);
        res.json(result)
    }
    catch (error) {
        res.json({ error: 'Internal SErver Error ...' + error })
    }
}

exports.addItemtoCart = async (req, res) => {
    const { name, price, image, user_id, id, size } = req.body;
    try {
        let result = await cartsService.addItemtoCart(name, price, image, user_id, id, size);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error })
    }
}

exports.getInsights = async (req, res) => {
    try {
        const seller_id = req.params.id;
        let month = req.query.month;
        let result = await cartsService.getInsights(seller_id,month);
        res.json(result);
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error })
    }
}