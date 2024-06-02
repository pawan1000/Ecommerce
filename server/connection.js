const express=require('express');
const app=express();
const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Pawan@123',
    database:'ecommerce'
})

connection.connect((err)=>{
    if(err)
    {console.log('error connecting database '+err.stack)
    return;}
    console.log('connected succesfully with id '+connection.threadId);
})

module.exports=connection;
