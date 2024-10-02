const connection = require("../config/connection");

exports.getProductsById = async (productId) => {
    try {
        const query = 'select * from products where id=?';
        let result = await connection.query(query, [productId]);
        return result[0];
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getAllProducts = async () => {
    try {
        const query = 'select * from products ';
        let result = await connection.query(query);
        return result[0];
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getProductCountMonthwise = async () => {
    try {
        const query = 'select  monthname(created_date) as `name`, count(*) as count from products group by monthname(created_date)';
        let result = await connection.query(query);
        return result[0];
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductCountCategorywise = async () => {
    try {
        const query = `select categories.name, count(categories.name) as count from products
                        inner join categories on products.category_id=categories.id
                        group by categories.name`;
        let result = await connection.query(query);
        return result[0];
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductCountGenderwise = async () => {
    try {
        const query = 'select gender as name,count(*) as count from products group by gender';
        let result = await connection.query(query);
        return result[0];
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.updateField = async (field, value, id) => {
    try {
        const query = `update products set ${field} = ? where id=? `
        let result = await connection.query(query, [value, id]);
        return result[0];

    }
    catch (error) {
        throw new Error(error)
    }
}

exports.deleteProduct = async (id) => {
    try {
        const query = 'delete from products where id=?';
        let result = await connection.query(query, [id]);
        return result[0];
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getProductsByFilter = async (filter, page, start) => {
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
    let countQuery = query;
    query += `limit ${start},4;`
    let queryResult = await connection.query(query);
    let countQueryResult = await connection.query(countQuery);
    let rows = queryResult[0];
    let total = countQueryResult[0].length;
    return { rows: rows, total: total };
}

exports.addProduct = async (product, image) => {
    try {
        const query = 'insert into products (name,category_id,price,image,seller_id,description,gender,rating) values (?,?,?,?,?,?,?,?)';
        let result = await connection.query(query, [product.name, product.category, product.price, image, product.seller_id, product.description, product.gender, product.rating]);
    }
    catch (error) {
        throw new Error(error)
    }
}