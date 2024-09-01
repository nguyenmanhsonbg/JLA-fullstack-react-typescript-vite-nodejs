const express = require('express')
const {
    deleteNoti,
    createNoti,
    updateNoti,
    getNoti
} = require('../controllers/notification')
const { checkAuthAndRole } = require('../middleware/auth')

const router = express.Router()
router.post('/createNoti', checkAuthAndRole([1]), createNoti),
router.put('/updateNoti', checkAuthAndRole([1]), updateNoti),
router.post('/getNoti', getNoti)
router.post("/deleteNoti", checkAuthAndRole([1]), deleteNoti);

module.exports = router
