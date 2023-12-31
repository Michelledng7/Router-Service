const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { 
        this.users = data
    }
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const createNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username or password is required.' })
    //check duplicate username
    const duplicate = usersDB.users.find(u => u.username === user)
    if (duplicate) return res.sendStatus(409)
    try {
            const hashedPwd = await bcrypt.hash(pwd, 10) 
            const newUser = {
                "username": user,
                "roles": {"User" : 1000},
                "password": hashedPwd,
            }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users))
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` });
        }
    catch (err) {
        res.sendStatus(500).json({ 'message': `Error ${err.message}`})
    }
}

module.exports = { createNewUser }