import React, { useState,useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './../../Components/Dashboard/dashboard.module.css'
import Analytics from '../../Components/Quiz Analysis/Analytics'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { QuizContext } from '../../useContext/useContext'
import { getQuizByUserId } from "../../Apis/Quiz";

const DashBoardPage = () => {
  const [Analysis,setAnalysis]= useState(false)
  const [OpenDashbord,setDashboard]= useState(true)
  const [openQueAnalysis,setopenQueAnalysis]= useState(true)
  const [loading,setLoading]= useState(false)
  const [QuizAnalysis, setQuizAnalysis] = useState();
  const [OpenDeleteQuiz,setopenDeleteQuiz] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      getQuizAnalysisData();
    }, 1000);
  }, [openQueAnalysis,OpenDeleteQuiz]);

  const getQuizAnalysisData = async () => {
    setLoading(true)
    const res = await getQuizByUserId();
    if (!res) {
      return;
    }
    setQuizAnalysis(res.data);
    setLoading(false)
    return
  };

  return (
    <main  className={styles.dashboard}>
    <QuizContext.Provider value={{Analysis,setAnalysis,OpenDeleteQuiz,setopenDeleteQuiz,loading,QuizAnalysis,openQueAnalysis,setopenQueAnalysis}} >
      <Navbar setAnalysis={setAnalysis} setDashboard={setDashboard} setopenQueAnalysis={setopenQueAnalysis} />
      {Analysis && <Analytics QuizAnalysis={QuizAnalysis} />}
      {OpenDashbord&&<Dashboard/>}
      </QuizContext.Provider>
      
    </main>
  )
}

export default DashBoardPage
