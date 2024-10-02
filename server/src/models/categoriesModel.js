const  connection = require("../config/connection");
exports.getAllCategories= async()=>
{
   try{
    const query = 'select * from categories';
    const result =await connection.query(query);
    return result[0];
   }
   catch(error)
   {
    throw new Error(error);
   }
}

exports.getProductsByCategory = async (categoryId)=>{
   try{
      const query='select * from products where category_id=?'
      let result =await connection.query(query,[categoryId]);
      return result[0];
   }
   catch(error)
   {
      throw new Error(error);
   }
}

exports.getProductsCountByCategoryName = async (name)=>{
   const countQuery = 'SELECT COUNT(*) AS total FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?)';
   let result = await connection.query(countQuery,name);
   return result[0];
}

exports.getProductsByCategoryName = async (name, start) =>{
   const fetchQuery = `SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?) LIMIT ?, 4`;
   let result = await connection.query(fetchQuery,[name,start]);
   return result[0];
}
