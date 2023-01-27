const Quiz= require('../models/quiz')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Create new Quiz => /api/v1/quiz/new
exports.newQuiz = catchAsyncErrors(async (req,res,next) =>{
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
        success:true,
        quiz
    })
})


//Display all Quizzes => /api/v1/quizzes
exports.getQuizzes=catchAsyncErrors(async (req,res,next)=>{

    const quiz = await Quiz.find();

    res.status(200).json({
        success:true,
        count:quiz.length,
        quiz
    })
})


// Get single quiz details => /api/v1/quizzes/:id

exports.getSingleQuiz =catchAsyncErrors(async(req,res,next)=>{

    const quiz = await Quiz.findById(req.params.id);

    if(!quiz){
        return next(new ErrorHandler('Quiz not found',404))
    }
 
    res.status(200).json({
        success:true,
        quiz
    })


})


// Get single quiz details by creator => /api/v1/user/:id

exports.getSingleQuizbyCreator =catchAsyncErrors(async(req,res,next)=>{

    const quiz = await Quiz.find({ creatorUserId: req.params.id});

    if(!quiz){
        return next(new ErrorHandler('Quiz not found',404))
    }
 
    res.status(200).json({
        success:true,
        quiz
    })


})


// Update Quiz => /api/v1/:id

exports.updateQuiz = catchAsyncErrors (async (req,res,next) => {
    let quiz = await Quiz.findById(req.params.id);

    if(!quiz){
        return next(new ErrorHandler('Quiz not found', 404));
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        quiz
    })
})



// Delete Quiz => /api/v1/:id

exports.deleteQuiz =catchAsyncErrors(async(req,res,next)=>{
    const quiz = await Quiz.findById(req.params.id);

    if(!quiz){
        return next(new ErrorHandler('Quiz not found',404))
    }

    await quiz.remove();

    res.status(200).json({
        success:true,
        message:'Quiz is deleted'
    })
})