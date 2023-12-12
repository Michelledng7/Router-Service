const express = require('express')
const router = express.Router()
const path = require('path')
const data = { }
data.employee = require('../../data/data.json')
const employeesController = require('../../controllers/employeesController')
const verifyRoles = require('../../middleware/verifyRoles')
const { Admin } = require('../../config/roles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(Admin), employeesController.createEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)        


router.route('/:id')
    .get(employeesController.getEmployById)


module.exports = router