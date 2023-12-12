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


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "message": "User name or password is required" })

    const matchUser = usersDB.users.find(u => u.username === user)
    if (!matchUser) return res.status(401).json({ "message": "Unauthorized user" })
    //compare password
    const matchedPwd = await bcrypt.compare(pwd, matchUser.password)
    if (matchedPwd) {
        const roles = Object.values(matchUser.roles) //get values from key value object roles 

        //create JWT token to protect other routes API
        const accessToken = jwt.sign(
            
            {
                "UserInfo": {
                    username: matchUser.username,
                    roles: roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { username: matchUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}            
        )
        //store refresh token in httpOnly cookie
         // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== matchUser.username);
        const currentUser = { ...matchUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {handleLogin}
