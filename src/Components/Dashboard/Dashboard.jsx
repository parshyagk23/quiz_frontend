import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
const Dashboard = ({QuizAnalysis}) => {

    const [QuestionLen,setQuestionLen] = useState(0)
    const [impressions,setimpressions] = useState(0)
    const [sortedQuiz,setSortQuiz] = useState([])
  
    const getQuizCreationDate = (isoDate )=>{
    
      const day = isoDate.slice(8,10)
      const year = isoDate.slice(0,4)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[isoDate.slice(6,7)-1]
      const formattedData = `${day} ${month},${year}`
      return formattedData
    }

    const ConvertImpressionToK = (impressions)=>{
      if(impressions>=1000){
        return (impressions/1000) + "k"
      }
      return impressions
    }
    const GenerateQuizQuestionLength =()=>{
      let initialQueLen= 0;
      let initialImpressions= 0;
      const initialSortedQuiz= QuizAnalysis?.sort((a, b) => b.Impressions - a.Impressions)
      setSortQuiz(initialSortedQuiz)
      QuizAnalysis?.map((data)=>{
        initialQueLen += data?.Questions?.length
        initialImpressions += data?.Impressions
      })
      setimpressions(initialImpressions)
      setQuestionLen(initialQueLen)
    }
    useEffect(()=>{
      GenerateQuizQuestionLength()
    },[QuizAnalysis])

    console.log(QuizAnalysis)
  return (
    <main className={styles.dashboardcontainer}>
      <section className={styles.quizData}>
        <div className={styles.quiz}>
          <h1>
           {QuizAnalysis?.length || 0}<span>Quiz</span>
          </h1>
          <p>Created</p>
        </div>
        <div className={styles.questions}>
          <h1>
            {QuestionLen}<span>Questions</span>
          </h1>
          <p>Created</p>
        </div>
        <div className={styles.impressions}>
          <h1>
            {ConvertImpressionToK(impressions)}<span>ToTal</span>
          </h1>
          <p>Impressions</p>
        </div>
      </section>
        <h1 className={styles.trendingtext} >Trending Quiz</h1>
      {QuizAnalysis?.length==0 ?<h1 className={styles.trendingtext}  style={{ width:'50vw', margin:'0 auto', color:'black' }} >Quiz not created yet create quiz</h1>:
      <section className={styles.trending}>
        <section  >
        {sortedQuiz?.map((data,index)=>(
          
         <div  key={index} className={styles.quizbox}>
           <div >
             <h1>{data?.QuizName}</h1>
             <p style={{ color:'#FF5D01' }} >
               {data?.Impressions} &nbsp;
               <svg
                 width="18"
                 height="18"
                 viewBox="0 0 18 18"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
                 
               >
                 <path
                   d="M9 15.375C12.7279 15.375 15.75 12.2542 15.75 10.125C15.75 7.99575 12.7279 4.875 9 4.875C5.27213 4.875 2.25 7.998 2.25 10.125C2.25 12.252 5.27213 15.375 9 15.375Z"
                   stroke="#FF5D01"
                   strokeWidth="1.5"
                   strokeLinejoin="round"
                 />
                 <path
                   d="M9 12.375C9.59674 12.375 10.169 12.1379 10.591 11.716C11.0129 11.294 11.25 10.7217 11.25 10.125C11.25 9.52826 11.0129 8.95597 10.591 8.53401C10.169 8.11205 9.59674 7.875 9 7.875C8.40326 7.875 7.83097 8.11205 7.40901 8.53401C6.98705 8.95597 6.75 9.52826 6.75 10.125C6.75 10.7217 6.98705 11.294 7.40901 11.716C7.83097 12.1379 8.40326 12.375 9 12.375Z"
                   stroke="#FF5D01"
                   strokeWidth="1.5"
                   strokeLinejoin="round"
                 />
                 <path
                   d="M4.974 4.22475L5.94675 5.58225M13.3594 4.39125L12.3862 5.74875M9.00337 2.625V4.875"
                   stroke="#FF5D01"
                   strokeWidth="1.5"
                   strokeLinecap="round"
                 />
               </svg>
             </p>
           </div>
           <div>
             <p>Created on : {getQuizCreationDate(data?.createdAt)}</p>
           </div>
         </div>
        ))}
        </section>
      </section> } 
    </main>
  );
};

export default Dashboard;
