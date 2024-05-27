import React, { useState,useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './../../Components/Dashboard/dashboard.module.css'
import Analytics from '../../Components/Quiz Analysis/Analytics'
import Dashboard from '../../Components/Dashboard/Dashboard'

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
      <Navbar setAnalysis={setAnalysis} setDashboard={setDashboard} setopenQueAnalysis={setopenQueAnalysis} />
      {Analysis && <Analytics OpenDeleteQuiz= {OpenDeleteQuiz} setopenDeleteQuiz={setopenDeleteQuiz} loading={loading} QuizAnalysis={QuizAnalysis} Analysis={Analysis} openQueAnalysis={openQueAnalysis} setopenQueAnalysis={setopenQueAnalysis}/>}
      {OpenDashbord&&<Dashboard/>}
      
    </main>
  )
}

export default DashBoardPage
