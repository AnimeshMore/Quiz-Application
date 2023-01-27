const express = require('express');
const router = express.Router();

const {registerUser, loginUser, logout, allUsers, getUserDetails} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/allusers').get(allUsers);
router.route('/allusers/:id').get(getUserDetails);


module.exports = router;