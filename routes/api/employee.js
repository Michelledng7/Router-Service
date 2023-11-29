const express = require('express')
const router = express.Router()
const path = require('path')
const data = { }
data.employee = require('../../data/data.json')
const employeesController = require('../../controllers/employeesController')

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)        


router.route('/:id')
    .get(employeesController.getEmployById)


module.exports = router