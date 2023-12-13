const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        console.log(`rolesArray ${rolesArray}`)
        console.log(`req.roles ${req.roles}`) //coming from verifyJWT generated new token
        //const match = rolesArray.find(role => req.roles.includes(role))
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        console.log(`result ${result}`)
        if (!result) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRoles