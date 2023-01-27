const UserQuiz = require('../models/userquiz');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



// Create new Userquiz => /api/v1/userquiz
exports.newUserquiz = catchAsyncErrors(async (req,res,next) =>{
    const question = await UserQuiz.create(req.body);

    res.status(201).json({
        success:true,
        question
    })
})


//Display all Quizzes of user => /api/v1/userquiz/

exports.getUserquiz=catchAsyncErrors(async (req,res,next)=>{

    const userquiz = await UserQuiz.find();

    res.status(200).json({
        success:true,
        userquiz
    })
})



// Get single userquiz details from userid=> /api/v1/userquiz/id

exports.getSingleUserquiz =catchAsyncErrors(async(req,res,next)=>{

    const quiz = await UserQuiz.find({userId: req.params.id});

    if(!quiz){
        return next(new ErrorHandler('User Exam  not found',404))
    }
 
    res.status(200).json({
        success:true,
        quiz
    })


})



// Get single userquiz details from examID=> /api/v1/userquiz/quiz/id

exports.getSingleUserquizexamid =catchAsyncErrors(async(req,res,next)=>{

    const quiz = await UserQuiz.find({examId: req.params.id});

    if(!quiz){
        return next(new ErrorHandler('User Exam not found',404))
    }
 
    res.status(200).json({
        success:true,
        quiz
    })


})


// Add exam review to user quiz => /api/v1/userquiz/add/:id 

exports.addExamreview = catchAsyncErrors(async (req,res,next)=>{

    const option= await UserQuiz.updateOne({_id:req.params.id},{$push:{
        examReview: req.body.examReview
    }
    })

    res.status(201).json({
        success:true,
        option
    })
}) 


// Update Userquiz => /api/v1/userquiz/add/:id

exports.updateUserquiz = catchAsyncErrors(async (req,res,next)=>{

    const option=await UserQuiz.updateOne({_id:req.params.id},   
        {$set: {
            examId: req.body.examId,
            userId: req.body.userId,
            grade: req.body.grade,
            examReview: req.body.examReview
    }
    })

    res.status(201).json({
        success:true,
        option
    })
}) 


// Delete Userquiz => /api/v1/userquiz/:id

exports.deleteUserquiz =catchAsyncErrors(async(req,res,next)=>{
    const question = await UserQuiz.findById(req.params.id);

    if(!question){
        return next(new ErrorHandler('UserQuiz not found',404))
    }

    await question.remove();

    res.status(200).json({
        success:true,
        message:'Userquiz is deleted'
    })
})
