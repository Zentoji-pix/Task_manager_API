const express = require('express')
const router = express.Router()

const controller = require('../controller/task')
const authWare = require('../middleware/auth')
// const validator = require('')

router.post('/', authWare, controller.create)
router.get('/', authWare, controller.getAll)
router.get('/:id', authWare, controller.getId)
router.patch('/:id', authWare, controller.update)
router.delete('/:id', authWare, controller.del)

module.exports = router