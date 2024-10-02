const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const connection = require('../config/connection');
exports.validateIsUserExisist = async (username, password) => {
    try {
        let result = await userModel.getUserByUsername(username);
        if (result.length == 0) {
            return { message: false }
        }
        else {
            const hashpassword = result[0].password;
            const userType = result[0].user_type;
            const username = result[0].username;
            const user_id = result[0].id;
            try {
                let result = await bcrypt.compare(password, hashpassword)
                const accessToken = sign({ username: username, user_id: user_id, userType: userType }, 'importantsecretkey');
                return { message: true, accessToken: accessToken, userType: userType, username: username, user_id: user_id }
            }
            catch (error) {
                return { message: false }
            }
        }
    }
    catch (error) {
        throw new Error(error)
    }
}

exports.registerUser = async (username, password, category) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (category == '') {
            let result = await userModel.registerAsBuyer(username, hashedPassword);
            return result
        }
        else {
            let result = await userModel.registerAsSeller(username, hashedPassword,category);
            return result
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

exports.getAllUsernames = async()=>{
    try {
        
        let result = await userModel.getAllUsers();
        return result;
    }
    catch(error)
    {
        throw new Error(error);
    }
}