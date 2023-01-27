const express = require('express');
const router = express.Router();

const {newQuiz,
       getQuizzes,
       getSingleQuiz,
       deleteQuiz,
       getSingleQuizbyCreator,
       updateQuiz} = require('../controllers/quizController');


const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');      

router.route('/quizzes').get(getQuizzes);
router.route('/quizzes/:id').get(getSingleQuiz);
router.route('/quiz/new').post(newQuiz);
router.route('/user/:id').get(getSingleQuizbyCreator);
router.route('/:id').patch(updateQuiz);
router.route('/:id').delete(deleteQuiz);

module.exports = router;
