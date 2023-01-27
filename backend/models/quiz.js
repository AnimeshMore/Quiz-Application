const mongoose=require('mongoose')


const quizSchema = new mongoose.Schema({
  creatorUserId: {
    type: String,
    required: true,
  },
  examname: {
    type: String,
    lowercase: true,
  },
  passGrade: {
    type: Number,
    default: 2,
  },
  time: {
    type: Number,
    default: 20,
  },
},
  {
    timestamps: true,
  }
);



module.exports=mongoose.model('Quiz',quizSchema);