import axios from "axios";
import Cookies from "js-cookie";
const QUIZURL = import.meta.env.VITE_REACT_APP_QUIZ_URL

export const PostQuiz = async (QuizName,QuizType,QuizId,Questions) => {
    try {
        const  Impressions=0,AttemptedQuestion=0,CorrectAns=0
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const reqUrl = `${QUIZURL}/create`;
       
        const responce = await axios.post(reqUrl,{    QuizName,QuizType,QuizId,Questions,
                                                    Impressions,AttemptedQuestion,
                                                    CorrectAns,
                                                });
        
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };
