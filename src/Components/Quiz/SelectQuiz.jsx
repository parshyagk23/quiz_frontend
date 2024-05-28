import React, { useState } from 'react'
import Modal from 'react-modal'
import styles from './quiz.module.css'
import CreateQuiz from './CreateQuiz';
const SelectQuiz = ({setopenQuiz,openQuiz}) => {
    
    const customStyles = {
        content: {
          width: "40vw",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
          background: "#FFF",
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px",
        },
      };
      const [OpenCreateQuiz,setOpenCreateQuiz]= useState(false)
      const [Error,setError]= useState(false)
      const [Quiz, setQuiz]= useState({
        QuizName:'',
        QuizType:''
      })
      
    const handleContine =()=>{
      
      if(!Quiz.QuizName || !Quiz.QuizType){
        setError(true)
        return
      }
      
     
      setError(false)
      setOpenCreateQuiz(true)
     

    }
  return (
    <div>
      <Modal
      isOpen={openQuiz}
      style={customStyles}
      >
        
            <div className={styles.quizname}  >
                <input type="text" placeholder='Quiz name' value={Quiz.QuizName} onChange={(e)=>{setQuiz({...Quiz,QuizName:e.target.value})}} />
            </div>
            <div className={styles.quiztype} >
                <div>
                    <h4>Quiz Type</h4>
                </div>
                <div  style={Quiz.QuizType==="Q&A"?{background:'#60B84B', color:'white'}:{}}  onClick={()=>setQuiz({...Quiz,QuizType:'Q&A'})} >
                    <h4 style={Quiz.QuizType==="Q&A"?{ color:'white'}:{}} >Q & A</h4>
                </div>
                <div style={Quiz.QuizType==="Poll"?{background:'#60B84B', color:'white'}:{}} onClick={()=>setQuiz({...Quiz,QuizType:'Poll'})}>
                    <h4 style={Quiz.QuizType==="Poll"?{color:'white'}:{}} >Poll type</h4>
                </div>
            </div>
            <div className={styles.selectBtn} >
                <div onClick={()=>{setopenQuiz(false)}} >
                    <button>Cancel</button>
                </div>
                <div onClick={handleContine} >
                    <button>Continue</button>
                </div>

            </div>
            {Error && <p style={{width:'300px', margin:'10px auto', color:'red' , fontFamily:'Poppins , sans-sarif', textAlign:'center'}}  >Fields can't be empty</p>}
      </Modal>
    {OpenCreateQuiz &&   <CreateQuiz  QuizName={Quiz.QuizName} 
                                      QuizType={Quiz.QuizType}
                                      setOpenCreateQuiz={setOpenCreateQuiz}
                                      OpenCreateQuiz={OpenCreateQuiz}
                                       />}
    </div>
  )
}

export default SelectQuiz
