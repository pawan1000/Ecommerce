const connection = require('../config/connection')
exports.getUserByUsername = async (username) => {
    try {
        const query = 'select * from users where username=?';
        let result = await connection.query(query, [username]);
        return result[0];
    }
    catch (error) {
        throw new Error(error);

    }
}

exports.registerAsBuyer = async (username, password) => {
    try {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        let result = await connection.query(query, [username, password]);
        return { userCreated: true }
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.registerAsSeller = async (username, password, category) => {
    try {
        const query = 'INSERT INTO users (username, password, user_type,category) VALUES (?, ?,?,?)';
        let result = await connection.query(query, [username, password, 'seller', category]);
        return { userCreated: true }
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.getAllUsers = async ()=>{
    try {
        const query ='select username from users';
        let result = await  connection.query(query);
        return result;
    }
    catch(error)
    {
        throw new Error(error);
    }
}