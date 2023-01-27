const mongoose = require("mongoose");

const QuizQuestionsSchema = new mongoose.Schema({
    examId: {
        type: String,
    },
    questionTitle: {
        type: String,
    },
    options: [{
        option: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }],
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("quizquestions", QuizQuestionsSchema);