//seperate the method logic from the routes
const data = {}
data.employee = require('../data/data.json')

const getAllEmployees = (req, res) => {
    res.json(
        data.employee
    )
}

const createEmployee = (req, res) => {
    res.json({
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
    })//next is to save in db
}

const updateEmployee = (req, res) => {
    res.json({
        'firstname': req.body.firstname,
        'lastname': req.body.lastname
    })
}

const deleteEmployee = (req, res) => {
    res.json({
        'id': req.body.id
    })
}

const getEmployById = (req, res) => {
    res.json({
        'id': req.params.id
    })
}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployById
}