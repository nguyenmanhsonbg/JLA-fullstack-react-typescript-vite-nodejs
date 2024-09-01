const express = require('express');
const examHistoryController = require('../controllers/examHistory');
const { checkAuthAndRole } = require('../middleware/auth');
const router = express.Router();

router.post('/examHistories', checkAuthAndRole([1, 2, 3, 4]), examHistoryController.createExamHistory);
router.post('/progressExam', checkAuthAndRole([1, 2, 3, 4]),examHistoryController.progressExam);
router.get('/examHistories', checkAuthAndRole([1, 2, 3, 4]), examHistoryController.getAllExamHistories);
router.get('/get-exam-history-by-id/:examHistoryId', checkAuthAndRole([1, 2, 3, 4]), examHistoryController.getExamHistoryById);
router.post('/examHistoriesByExamIdAndAccountId',  checkAuthAndRole([1, 2, 3, 4]), examHistoryController.getAllExamHistoriesByExamIdAndAccountId);
router.put('/examHistories/:examHistoryId', checkAuthAndRole([1, 2, 3]), examHistoryController.updateExamHistory);
router.delete('/examHistories/:examHistoryId', checkAuthAndRole([1, 2, 3]), examHistoryController.deleteExamHistory);

module.exports = router;
