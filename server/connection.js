const express=require('express');
const app=express();
const mysql=require('mysql2');
require('dotenv').config();
const connection=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
})

connection.connect((err)=>{
    if(err)
    {console.log('error connecting database '+err.stack)
    return;}
    console.log('connected succesfully with id '+connection.threadId);
})

module.exports=connection;
