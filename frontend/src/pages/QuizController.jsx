import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../components/quizHandler/Quiz";
import { useParams, useNavigate } from 'react-router-dom'
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import Countdown from 'react-countdown';
import CountDownTimer from "../components/CountDownTimer";

const QuizController = (CUId) => {

    const userId = CUId.CUId
   
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [examId, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])

    const getExams = async () => {
        const { data } = await axios.get('/api/v1/question/' + id.id);
        setQuestions(data);
        userCheck();
    }

    const securityData = async () => {
        axios.all([
            await axios.get('/api/v1/allusers/' + CUId.CUId),
            await axios.get('/api/v1/quizzes/' + id.id)
        ]).then(axios.spread((data, data2) => {
/* Chnged 8*/
            console.log(data)
            console.log(data2)

            if (data2.data.quiz.creatorUserId == CUId.CUId) {
                setTimerData(data2.data.quiz.time)
                console.log(data2.data.quiz.time)
                alert("You are in preview mode that means your question data will not be saved")
            } else {
                const dummyData = {
                    userId: CUId.CUId,
                    examId: id.id,
                    userInfo: {
                        username: data.data.user.firstname + " " + data.data.user.lastname,
                        examname: data2.data.quiz.examname,
                        score: 0,
                    }
                };
                axios.post("/api/v1/userquiz/", dummyData).then((response) => {
                    console.log(response)
                    console.log(response.status);
                    console.log(response.data);
                    setExam_id(response.data._id);
                });
                setTimerData(data2.data.quiz.time)
            }
            setTimeout(() => {
                navigate("/result/" + id.id)
            }, ((data2.data.quiz.time) * 60) + "000");
        }))
    }

    const userCheck = async () => {
        try {
            const { data } = await axios.get('/api/v1/userquiz/' + CUId.CUId);
            console.log(data);
            const myData = await Promise.all(data.quiz.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    navigate("/dashboard")
                    alert("you have already took this exam")
                    return
                }
            }
            securityData();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            alert("you have already took this exam")
        }
    }

    const hoursMinSecs = {hours:0, minutes: timerData, seconds: 0}
    if (isLoading) {
        return (
            <>
                <LoginNavbar />
                <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
               
            </>)
    }
    return (
        <div>
            <LoginNavbar />
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                examId={examId}
                setExam_id={setExam_id}
            />
         
        </div>
    );
}

export default QuizController;