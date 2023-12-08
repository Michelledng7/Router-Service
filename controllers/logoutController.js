const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { 
        this.users = data
    }
}

const fsPromises = require('fs').promises
const path = require('path')



const handleLogout = async (req, res) => {
    const cookies = req.cookies
    console.log(cookies.jwt)
    if (!cookies?.jwt) return res.sendStatus(204) //success but no content
    const refreshToken = cookies.jwt
    //check if refreshToken is in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204)
    }

    //delete the refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUsers = { ...foundUser, refreshToken: '' }
    usersDB.setUsers([...otherUsers, currentUsers])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'data', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.sendStatus(204)
}

module.exports = {handleLogout}