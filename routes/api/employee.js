const express = require('express')
const router = express.Router()
const path = require('path')
const data = { }
data.employee = require('../../data/data.json')
const employeesController = require('../../controllers/employeesController')
const verifyRoles = require('../../middleware/verifyRoles')
const { Admin, User, Editor } = require('../../config/roles')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(Admin, Editor), employeesController.createEmployee)
    .put(verifyRoles(Admin, Editor), employeesController.updateEmployee)
    .delete(verifyRoles(Admin), employeesController.deleteEmployee)        


router.route('/:id')
    .get(employeesController.getEmployById)


module.exports = router