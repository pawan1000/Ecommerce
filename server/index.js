const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
require('dotenv').config();


const categoriesRouter=require('./src/routes/categories');
const productRouter=require('./src/routes/products');
const cartsRouter=require('./src/routes/carts');
const usersRouter=require('./src/routes/users');
const feedbackRouter=require('./src/routes/feedback');

app.use('/categories',categoriesRouter);
app.use('/product',productRouter);
app.use('/carts',cartsRouter);
app.use('/users',usersRouter);
app.use('/feedback',feedbackRouter);
app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT,()=>{
console.log('server running on port ..',process.env.PORT);
})