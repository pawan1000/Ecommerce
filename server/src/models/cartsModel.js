const e = require('express');
const connection = require('../config/connection');

exports.getCartByUserIdAndCartId = async (userId, cartId) => {
    try {
        let query = 'SELECT * FROM carts WHERE user_id = ? AND id = ? AND status = "cart"';
        const [result] = await connection.query(query, [userId, cartId]); // Destructure result
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getCartByUserId = async (userId) => {
    try {
        let query = 'SELECT * FROM carts WHERE user_id = ? AND status = "cart"';
        const [result] = await connection.query(query, [userId]); // Destructure result
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateItem = async (cartId, quantity) => {
    const query = 'UPDATE carts SET quantity = ? WHERE id = ?';
    try {
        const [result] = await connection.query(query, [quantity, cartId]); // Destructure result
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.deleteItem = async (id) => {
    try {
        const query = 'DELETE FROM carts WHERE id = ?';
        const [result] = await connection.query(query, [id]); // Destructure result
        return { data: result, delete_id: id };
    } catch (error) {
        throw new Error(error)
    }
};

exports.updateCartStatus = async (id) => {
    try {
        let productIds = JSON.parse(id); // Ensure id is parsed to an array
        const placeholders = productIds.map(() => '?').join(','); // Create placeholders
        return placeholders
        const query = `UPDATE carts SET status="purchased" WHERE id IN (${placeholders})`;
        // Pass productIds as values for the placeholders
        const result = await connection.query(query, productIds);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

exports.addItemToCart = async (name, price, image, user_id, id, size) => {
    try {
        const query = 'INSERT INTO carts (name, price, image, product_id,user_id,size) VALUES (?, ?, ?, ?,?,?)';
        let result = await connection.query(query, [name, price, image, id, user_id, size]);
        return result
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getTotalPurchase = async (seller_id) => {
    const query1 = 'select count(*) as total_purchase from carts inner join products on carts.product_id = products.id where carts.status = "purchased" and products.seller_id = ? ';
    const totalPurchaseResult = await connection.query(query1, [seller_id]);
    const total_purchase = totalPurchaseResult[0][0].total_purchase;
    return { 'total_purchase': total_purchase };
}

exports.getAvgPrice = async (seller_id, month) => {
    const query2 = 'select avg(price) as avg_price from products where seller_id=? and month(created_date)=?';
    const avgPriceResult = await connection.query(query2, [seller_id, month]);
    const avg_price = avgPriceResult[0][0].avg_price || 0;
    return { 'avg_price': avg_price };
}

exports.getTotalReturn = async (seller_id) => {
    const query3 = 'select count(*) as total_return from carts inner join products on carts.product_id = products.id where carts.status = "returned" and products.seller_id = ?';
    const totalReturnResult = await connection.query(query3, [seller_id]);
    const total_return = totalReturnResult[0][0].total_return;
    return { 'total_return': total_return };
}

exports.getTopSellingProduct = async (seller_id) => {
    const query4 = 'SELECT carts.product_id, COUNT(*) AS count ,products.name as product_name FROM carts INNER JOIN products ON carts.product_id = products.id WHERE carts.status = "purchased" AND products.seller_id = ? GROUP BY carts.product_id';
    const topSellingProductResult = await connection.query(query4, [seller_id]);
    const top_selling_product = topSellingProductResult.length > 0 ? topSellingProductResult[0][0].product_name : 'No sales yet';
    return { 'top_selling_product': top_selling_product };
}

exports.getTotalProduct = async (seller_id, month) => {
    const query5 = 'select *  from products where seller_id=? and month(created_date)=? ';
    const totalProducts = await connection.query(query5, [seller_id, month]);
    const total_products = totalProducts[0].length ? totalProducts[0] : [];
    return { 'total_products': total_products };
}

