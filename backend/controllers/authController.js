const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async(req,res,next) => {

    const {firstname,lastname, email , password} = req.body;
    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    })

    sendToken(user,200,res)
})



//Login user => /api/v1/login

exports.loginUser = catchAsyncErrors( async (req,res,next) => {
    const {email,password} = req.body;
  
    //Checks if email and password 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }
  
    //Finding user in database
    const user = await User.findOne({ email }).select('+password')
  
    if(!user){
        return next(new ErrorHandler('Invalid Email or password', 401))
    }
  
    //Checks password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
  
    if(!isPasswordMatched){
      return next(new ErrorHandler('Invalid Email or password', 401));
    }


    sendToken(user,200,res)
  })


//Logout user  => /api/v1/logout

exports.logout = catchAsyncErrors( async (req,res,next) => {
    res.cookie('token', null ,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : 'Logged out'
    })
})


//Get all users => /api/v1/allusers

exports.allUsers = catchAsyncErrors( async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })
})

//Get user details => /api/v1/allusers/:id

exports.getUserDetails = catchAsyncErrors( async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success : true,
        user
    })
})
