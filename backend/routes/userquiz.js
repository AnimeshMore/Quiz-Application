const express = require('express');
const router = express.Router();


const {getUserquiz, getSingleUserquiz, newUserquiz, getSingleUserquizexamid, addExamreview, updateUserquiz, deleteUserquiz} = require('../controllers/userquizController');


router.route('/userquiz').get(getUserquiz);
router.route('/userquiz/:id').get(getSingleUserquiz);
router.route('/userquiz').post(newUserquiz);
router.route('/userquiz/quiz/:id').get(getSingleUserquizexamid);


router.route('/userquiz/add/:id').put(addExamreview);
router.route('/userquiz/add/:id').patch(updateUserquiz);
router.route('/userquiz/:id').delete(deleteUserquiz);

module.exports = router;