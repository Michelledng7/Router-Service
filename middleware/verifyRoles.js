const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        console.log(`rolesArray ${rolesArray}`)
        console.log(`req.roles ${req.roles}`)
    }
}

module.exports = verifyRoles