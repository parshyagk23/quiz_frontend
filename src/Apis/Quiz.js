import axios from "axios";
import Cookies from "js-cookie";
const QUIZURL = import.meta.env.VITE_REACT_APP_QUIZ_URL

export const PostQuiz = async (QuizName,QuizType,QuizId,Questions,timer) => {
    try {
        const  Impressions=0;
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const reqUrl = `${QUIZURL}/create`;
       
        const responce = await axios.post(reqUrl,{    QuizName,QuizType,QuizId,Questions,
                                                    Impressions,timer
                                                });
        
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };

export const getQuizByUserId = async () => {
    try {
        const token = Cookies.get('token')
        axios.defaults.headers.common["Authorization"]=token
        const reqUrl = `${QUIZURL}/userquiz`;
       
        const responce = await axios.get(reqUrl);
        
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };

export const getQuizById = async (id) => {
    try {
        const reqUrl = `${QUIZURL}/${id}`;
        const responce = await axios.get(reqUrl);
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };

export const getCorrectAns = async (quizid,questionindex,optionindex) => {
    try {
        const reqUrl = `${QUIZURL}/correctquizans/${quizid}/${questionindex}/${optionindex}`;
        const responce = await axios.get(reqUrl);
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };
export const DeleteQuizById = async (quizid) => {
    try {
        const reqUrl = `${QUIZURL}/delete/${quizid}`
        const responce = await axios.delete(reqUrl);
        return responce.data;
    } catch (error) {
        return error.response;
    }
  };
