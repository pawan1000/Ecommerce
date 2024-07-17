const connection = require('../connection');
const express = require('express');
const app = express();
const router = express.Router();
const { validateToken } = require('../middlewaer/AuthMiddlewares');


router.get('/', (req, res) => {
    try {
        const userId = req.query.user_id;
        const cartID = req.query.cart_id;
        let query = 'select * from carts where user_id =? and status="cart"';
        if (cartID) {
            query += 'and id=?';
            connection.query(query, [userId, cartID], (err, result) => {
                res.json(result);
            })
        }
        else
        {
            connection.query(query, [userId], (err, result) => {
                res.json(result);
            })
        }
        
    }
    catch(e)
    {
        console.log(e);
    }
})

router.put('/update/quantity/:id', (req, res) => {
    const cartId = req.params.id;
    try {
        const quantity = req.body.quantity;
        const query = 'update carts set quantity=? where id=?';
        connection.query(query, [quantity, cartId], (err, result) => {
            if (err)
                res.json(err)
            else
                res.json(result)
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = 'delete from carts where id=?';
    connection.query(query, [id], (err, result) => {
        if (result) {
            res.json({ data: result, delete_id: id });
        }
        else {
            res.json(err);
        }
    })
})



router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    productIds=JSON.parse(id);
    const placeholders = productIds.map(() => '?').join(','); 
    const query = `update carts set status="purchased" where id in (${placeholders})`;
    connection.query(query, productIds, (err, result) => {
        if (result) {
            res.json({ data: result, delete_id: id });
        }
        else {
            res.json(err);
        }
    })
})

router.post('/addToCart', validateToken, (req, res) => {
    const query = 'INSERT INTO carts (name, price, image, product_id,user_id,size) VALUES (?, ?, ?, ?,?,?)';
    connection.query(query, [req.body.name, req.body.price, req.body.image, req.body.id, req.body.user_id, req.body.size], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/categories', (req, res) => {
    const query = 'select  distinct category_id, categories.name ' +
        'from carts inner join products on carts.product_id=products.id ' +
        'inner join categories on products.category_id=categories.id';
    connection.query(query, (err, result) => {
        if (result)
            res.json(result);
        else
            res.json(err);
    })
})

router.get('/insights/:id', async (req, res) => {
    try {
        const seller_id = req.params.id;
        let month = req.query.month;
        const data = {};

        const query1 = 'select count(*) as total_purchase from carts inner join products on carts.product_id = products.id where carts.status = "purchased" and products.seller_id = ? ';
        const totalPurchaseResult = await executeQuery(query1, [seller_id]);
        data.total_purchase = totalPurchaseResult[0].total_purchase;

        const query2 = 'select avg(price) as avg_price from products where seller_id=? and month(created_date)=?';
        const avgPriceResult = await executeQuery(query2, [seller_id, month]);
        data.avg_price = avgPriceResult[0].avg_price || 0;

        const query3 = 'select count(*) as total_return from carts inner join products on carts.product_id = products.id where carts.status = "returned" and products.seller_id = ?';
        const totalReturnResult = await executeQuery(query3, [seller_id]);
        data.total_return = totalReturnResult[0].total_return;

        const query4 = 'SELECT carts.product_id, COUNT(*) AS count ,products.name as product_name FROM carts INNER JOIN products ON carts.product_id = products.id WHERE carts.status = "purchased" AND products.seller_id = ? GROUP BY carts.product_id';
        const topSellingProductResult = await executeQuery(query4, [seller_id]);
        if (topSellingProductResult.length > 0) {
            data.top_selling_product = topSellingProductResult[0].product_name;
        } else {
            data.top_selling_product = 'No sales yet';
        }

        const query5 = 'select *  from products where seller_id=? and month(created_date)=? ';
        const totalProducts = await executeQuery(query5, [seller_id, month]);
        data.total_products = totalProducts.length ? totalProducts : [];

        res.json(data);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
});

function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

router.get('/fool', (req, res) => {

    const query = 'select count(*) as count, month(created_date) as `Month` from products group by month(created_date)';
    connection.query(query, (err, result) => {
        if (err)
            res.json(err)
        else {
            console.log('hello');
            console.log(result);
            res.json(result)

        }
    })
})


module.exports = router;