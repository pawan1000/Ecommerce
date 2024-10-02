const express = require('express');
const connection = require('../config/connection');
const router = express.Router();
router.use(express.json());

router.get('/list/:product_id', (req, res,next) => {
    try {
        const product_id=req.params.product_id;
        const query = `select rating ,msg,username,created_date from feedback inner join users on users.id=feedback.user_id where feedback.product_id=? `;
        connection.query(query,[product_id],(err,result)=>{
            result?res.json(result):next(err);
        })
    }
    catch (err) {
        next(err);
    }
})


// Error handler middlware
router.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
})
module.exports=router