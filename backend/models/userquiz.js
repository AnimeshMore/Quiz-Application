const mongoose = require("mongoose");

const UserQuizSchema = new mongoose.Schema({
    examId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
    },
    userInfo: {
        username: {
            type: String,
        },
        examname: {
            type: String,
        }
    },
    examReview: [{

        qAnswers: {
            type: String,
        },
        qCorrect: {
            type: String,
        },
        qTitle: {
            type: String,
        }
    }],
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("UserQuiz", UserQuizSchema);