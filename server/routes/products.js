const express = require('express');
const app = express();
const connection = require('../connection');
const router = express.Router();
router.use(express.json());
const multer = require('multer');



const time = Date.now();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix=Date.now();
    cb(null, time + file.originalname)
  }
})
const upload = multer({ storage: storage });

router.get('/:id', (req, res) => {
  const query = 'select * from products where id=?';
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.json(err)
    }
    else {
      res.json(result);
    }
  })

})

router.post('/addProduct', upload.single("image"), (req, res) => {
  const product = req.body;
  const image = time + req.file.originalname;
  console.log(product);

  const query = 'insert into products (name,category_id,price,image,seller_id,description,gender,rating) values (?,?,?,?,?,?,?,?)';
  connection.query(query, [product.name, product.category, product.price, image, product.seller_id, product.description, product.gender, product.rating], (err, result) => {
    res.json(result)
  })
})

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  const query = 'delete from products where id=?';
  connection.query(query, [id], (err, result) => {
    if (result) res.json(result)
    if (err) res.json(err)

  })

})

router.get('/', (req, res) => {
  const query = 'select * from products';
  connection.query(query, (err, result) => {
    res.json(result);
  })
})

// API end points for nav-menu options men womens sumemr collection
// ---------------------------------------------------START------------------------------------------------

router.get('/filter/:filter_type', (req, res) => {
  const filter = req.params.filter_type;
  const page = parseInt(req.query.page) || 0;
  const start = page==0 ? 0: page * 4-4;
  let query = 'select * from products where ';
  if (filter == 'summer-collection') {
    query += ' summer_collection="yes"';
  }
  else if (filter == 'flat-40-off') {
    query += ' discount_40="yes"';
  }
  else if (filter == 'men') {
    query += 'gender="male"';
  }
  else if (filter == 'women') {
    query += 'gender="female"';
  }
  let countQuery=query;

  query += `limit ${start},4;`
  connection.query(query, (err, rowsResult) => {
    if (err) res.json(err)
    const rows=rowsResult;

    connection.query(countQuery, (err, countResult) => {
      if (err) res.json(err)
      const total=countResult.length;

      res.json({rows:rows,total:total})
      })

    })

})

router.get('/insights/monthwise',(req,res)=>{
  
  const query='select  monthname(created_date) as `name`, count(*) as count from products group by monthname(created_date)';
  connection.query(query,(err,result)=>{
    if(err)
      res.json(err)
    else
    {
      res.json(result) 
    }
  })
})

router.get('/insights/productByCategories',(req,res)=>{
  const query=`select categories.name, count(categories.name) as count from products
               inner join categories on products.category_id=categories.id
               group by categories.name`;
  connection.query(query,(err,result)=>{
    res.json(result);
  })
})






// ---------------------------------------------END---------------------------

router.put('/:id', (req, res) => {

  const query = `update products set ${req.body.field} = ? where id=? `
  connection.query(query, [req.body.value, req.params.id], (err, result) => {
    if (err) res.json(err);
    res.json(result);
  })
})


module.exports = router;
