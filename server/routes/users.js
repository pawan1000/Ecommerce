const express=require('express');
const app=express();
const connection =require('../connection');
const router=express.Router();
const bcrypt=require('bcryptjs');
const {sign} =require('jsonwebtoken');
const { validateToken } = require('../middlewaer/AuthMiddlewares');

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})
router.post('/register', async (req, res) => {
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        if(req.body.category!='')
        {
            const query = 'INSERT INTO users (username, password, user_type,category) VALUES (?, ?,?,?)';
            const result =  connection.query(query, [req.body.username, hashedPassword,'seller',req.body.category],(err,result)=>{
                if(result)res.json('in if');
                else res.json(err);
            });
        }
        else
        {
            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            const result =  connection.query(query, [req.body.username, hashedPassword],(err,result)=>{
                if(result)res.json('result');
                else res.json(err);
            });
        }
        

      
});

router.post('/login',(req,res)=>{
    const query='select * from users where username=?';
    connection.query(query,[req.body.username],(err,result)=>{
        if(result.length==0)
        {
            res.json({message:false})
        }
        
        else
        {
            const hashpassword=result[0].password;
            const userType=result[0].user_type;
            const username=result[0].username;
            const user_id=result[0].id;

            bcrypt.compare(req.body.password,hashpassword).then(
                (result)=>{
                    if(result)
                    {
                        const accessToken=sign({username:req.body.username,user_id:user_id,userType:userType},'importantsecretkey');
                        res.json({message:true,accessToken:accessToken,userType:userType,username:username,user_id:user_id})
                    }
                    else
                    {
                        res.json({message:false});
                    }

                }
            )
        }
    })
})

router.get('/',(req,res)=>{
    const query='select username from users;';
    connection.query(query,(err,result)=>{
        if(err)
        res.json(err)
        else
        res.json(result);
    })
})
module.exports=router;







