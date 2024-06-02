const connection = require('../connection');
const express = require('express');
const app = express();
const router = express.Router();
router.use(express.json());


router.get('/showCategories', (req, res) => {
    const query = 'select * from categories';
    connection.query(query, (err, result) => {
        if (err)
            res.json(err);
        else
            res.json(result);
    })

})

router.get('/id/:id',(req,res)=>{
    const query='select * from products where category_id=?'
    connection.query(query,[req.params.id],(err,result)=>{
        if(result)res.json(result)
        if(err) res.json(err)
    })
})

router.get('/:name', (req, res) => {
    const name = req.params.name;
    const page = parseInt(req.query.page) || 0;
    const start = page==0 ?0: page * 4-4;

    const countQuery = 'SELECT COUNT(*) AS total FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?)';
    connection.query(countQuery, [name], (err, countResult) => {
        if (err) {
            res.json(err);
            return;
        }

        const totalCount = countResult[0].total;

        const fetchQuery = `SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?) LIMIT ?, 4`;
        connection.query(fetchQuery, [name, start], (fetchErr, fetchResult) => {
            if (fetchErr) {
                res.json(fetchErr);
                return;
            }

            res.json({ total: totalCount, rows: fetchResult });
        });
    });
});




router.post('/addCategories', (req, res) => {
    const data = req.body;
    res.json(data.username)
})
module.exports = router;


