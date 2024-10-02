const usersService = require('../services/usersService')
exports.getUser = async (req, res) => {
    res.json(req.user)
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        let result = await usersService.validateIsUserExisist(username, password);
        res.json(result)
    }
    catch (error) {
        res.json({ error: 'Internal Server Error...' + error })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { username, password, category } = req.body;
        let result = await  usersService.registerUser(username, password, category)
        res.json(result)
    }
    catch (error) {
        res.json({ error: 'Internal Server Error ..' + error })
    }
}

exports.getAllUsernames = async(req,res)=>{
    try{
        let result=await usersService.getAllUsernames();
        res.json(result);
    }
    catch(error)
    {
        res.json({error : 'Internal Server Error .. '+error})
    }
}