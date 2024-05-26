import React from "react";
import styles from "./Analysis.module.css";
const QuestionWiseAnalyasis = ({ QesAnalysis, index }) => {
  const getQuizCreationDate = (isoDate) => {
    const day = isoDate.slice(8,10)
    const year = isoDate.slice(0,4)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[isoDate.slice(6,7)-1]
    const formattedData = `${day} ${month},${year}`
    return formattedData
  };

  return (
    <main style={{ width: "80vw", margin: "0 auto" }}>
      <div className={styles.questiontitle}>
        <div>
          <h1>Quiz {index} Question Analysis</h1>
        </div>
        <div className={styles.created}>
          <p>Created on : {getQuizCreationDate(QesAnalysis?.createdAt)}</p>
          <p>Impressions : {QesAnalysis?.Impressions}</p>
        </div>
      </div>
      <section className={styles.question}>
        {QesAnalysis?.Questions.map((data, index) => (
          <section key={index}>
            <h1>
             
              Q.{index + 1} {data.Question}{" "}
            </h1>
            {QesAnalysis.QuizType === "Poll" ? (
              
              <div style={{ display: "flex", gap: "20px",  }}>
                {data?.Options?.map((opt,index)=>(
                  <div key={index}
                  style={{ display:'flex', gap:'20px',width: "200px",
                  justifyContent: "center",alignItems: "center",}} >
                  <h1>{opt?.PollCount}</h1>
                  <p>option {index+1}</p>
                </div>
                ) )}
                
              </div>
            ) : (
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <h1>{data?.AttemptedQuestion}</h1>
                  <p>people Attempted the question</p>
                </div>
                <div>
                  <h1>{data?.CorrectAns}</h1>
                  <p>people Answered Correctly</p>
                </div>
                <div>
                  <h1>{data?.WrongAns}</h1>
                  <p>people Answered Incorrectly</p>
                </div>
              </div>
            )}
          </section>
        ))}
      </section>
    </main>
  );
};

export default QuestionWiseAnalyasis;
