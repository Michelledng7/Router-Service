const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { 
        this.users = data
    }
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const path = require('path')
const fsPromises = require('fs').promises //before mongodb use files to store data


const login = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "message": "User name or password is required" })

    const matchUser = usersDB.users.find(u => u.username === user)
    if (!matchUser) return res.status(401).json({ "message": "Unauthorized user" })
    //compare password
    const matchedPwd = await bcrypt.compare(pwd, matchUser.password)
    if (matchedPwd) {
        //create JWT token to protect other routes API
        const accessToken = jwt.sign(
            { username: matchUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refressToken = jwt.sign(
            { username: matchUser.username },
            process.env.REFRESS_TOKEN_SECRET,
            { expiresIn: '1d'}            
        )
        res.status(200).json({"message": `${user} successfully login`})
        res.status(200).json({accessToken})
    } else {
        res.status(401).json({"message": "Unauthorized with password"})
    }
}

module.exports = {login}
