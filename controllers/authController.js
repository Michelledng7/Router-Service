const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { 
        this.users = data
    }
}
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "message": "User name or password is required" })

    const matchUser = usersDB.users.find(u => u.username === user)
    if (!matchUser) return res.status(401).json({ "message": "Unauthorized" })
    //compare password
    const matchedPwd = await bcrypt.compare(pwd, matchUser.password)
    if (matchedPwd) {
        //JWT token
        res.status(200).json({"message": `${user} successfully login`})
    } else {
        res.status(401).json({"message": "Unauthorized"})
    }
}

module.exports = {login}
