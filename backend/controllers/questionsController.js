const Questions = require('../models/questions');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Display all Questions => /api/v1/

exports.getQuestions=catchAsyncErrors(async (req,res,next)=>{

    const question = await Questions.find();

    res.status(200).json({
        success:true,
        question
    })
})


// Get single exam question details => /api/v1/:id

exports.getExamQuestion =catchAsyncErrors(async(req,res,next)=>{

    const question = await Questions.find({examId: req.params.id});

    if(!question){
        return next(new ErrorHandler('Quiz not found',404))
    }
 
    res.status(200).json({
        success:true,
        question
    })
})


// Create new Questions => /api/v1/
exports.newQuestion = catchAsyncErrors(async (req,res,next) =>{
    const question = await Questions.create(req.body);

    res.status(201).json({
        success:true,
        question
    })
})


// Add options to questions => /api/v1/:id 

exports.addOptions = catchAsyncErrors(async (req,res,next)=>{

    const option= await Questions.updateOne({_id:req.params.id},{$push:{
        options: req.body.options,
    }
    })

    res.status(201).json({
        success:true,
        option
    })
}) 



// Update question => /api/v1/:id 

exports.updateQuestion = catchAsyncErrors(async (req,res,next)=>{

    const option=await Questions.updateOne({_id:req.params.id},   
        {$set: {
        examId: req.body.examId,
        questionTitle: req.body.questionTitle,
        options: req.body.options,
        correctOption: req.body.correctOption,
    }
    })

    res.status(201).json({
        success:true,
        option
    })
}) 


// Delete Question => /api/v1/:id


exports.deleteQuestion =catchAsyncErrors(async(req,res,next)=>{
    const question = await Questions.findById(req.params.id);

    if(!question){
        return next(new ErrorHandler('Question not found',404))
    }

    await question.remove();

    res.status(200).json({
        success:true,
        message:'Question is deleted'
    })
})