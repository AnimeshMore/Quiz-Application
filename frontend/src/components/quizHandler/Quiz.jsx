import { useEffect, useState } from "react";
import Question from "./Question";

const Quiz = ({ questions, score, setScore, setQuestions, userId, examId,setExam_Id}) => {
    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [correct, setCorrect] = useState();

    useEffect(() => {
        startFunction();
    }, [currQues, questions]);

    const startFunction = () => {
        var data;
        var dataOptions;

        console.log(questions)

        data = (questions.question[currQues].options)
        console.log(data)
        setOptions(data);

        for (let k = 0; k < data.length; k++) {
            dataOptions = (data[k].isCorrect);
            if (dataOptions == true) {
                setCorrect(data[k].option)
                console.log(data[k].option)
            }
        }


        // const { data } = questions[currQues]?.options[currQues];
        //   setOptions(data);
    }
    console.log(userId)
    console.log(score)
    console.log(questions)
    console.log(examId)
    return (
        <div className="quiz">
            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>
                            Score : {score}
                        </span>
                    </div>
                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={correct}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions} 
                        userId={userId}
                        examId={examId}
                        setExam_Id={setExam_Id}
                    />
                </>
            ) : (
                <div>Sorry we couldn't find any question</div>
            )}
        </div>
    );
};
export default Quiz;