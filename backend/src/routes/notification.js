const express = require('express')
const {
    deleteNoti,
    createOrUpdateNoti,
    getNotiById
} = require('../controllers/notification')
const { checkAuthAndRole } = require('../middleware/auth')

const router = express.Router()

router.post('/noti', checkAuthAndRole([1]), createOrUpdateNoti)
router.post('/noti/findById', getNotiById)
router.post('/noti/delete', checkAuthAndRole([1]), deleteNoti)

module.exports = router
