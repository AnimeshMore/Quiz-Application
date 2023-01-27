const express = require('express');
const router = express.Router();

const {getQuestions, getExamQuestion, newQuestion, addOptions, updateQuestion, deleteQuestion } = require('../controllers/questionsController');


router.route('/question').get(getQuestions);
router.route('/question/:id').get(getExamQuestion);
router.route('/question').post(newQuestion);


router.route('/question/:id').put(addOptions);
router.route('/question/:id').patch(updateQuestion);
router.route('/question/:id').delete(deleteQuestion);





module.exports = router;