import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Quizinterface.module.css";
import { getCorrectAns } from "../../Apis/Quiz";
const Quizinterface = ({ QuizData }) => {
  const customStyles = {
    content: {
      width: "70vw",
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
  const optionType = ["Text", "Image URL", "Text & Image URL"];
  const [count, setCount] = useState(0);
  const [CurrentQuestion, setCurrentQuestion] = useState(1);
  const [SelectedOption,setSelectedOption] = useState()

  const setTimerCountDown = (count) => {
    if(count===0){ 
      handleIsSelectedoptionTrue(QuizData._id,CurrentQuestion-1)
      setCurrentQuestion((prev)=> prev+1)

    }
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  };
  
  const handleIsSelectedoptionTrue = async(quizId,questionindex)=>{
    setCurrentQuestion((prev)=>prev+1)
    let res;
    if(SelectedOption !== undefined){
      res= await getCorrectAns(quizId,questionindex,SelectedOption)
      setSelectedOption()
    }

  }
  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        {QuizData?.Questions?.map((data, index) => (
          <div key={index}>
            {index + 1 === CurrentQuestion && (
              <section>
                <div className={styles.queno}>
                  <h3 >
                    {CurrentQuestion}/{QuizData?.Questions.length}
                  </h3>
                  {data?.timer !== 0 ? (
                    <h3 style={{color: "#D60000"}} > 00:{setTimerCountDown(data.timer)}s</h3>
                  ):(<div></div>)}
                </div>
                <div className={styles.question}>
                  <h1>{data.Question}</h1>
                </div>
                <div className={styles.options}>
                  {data?.Options?.map((val, index) => (
                    <div
                    onClick={()=>setSelectedOption(index)}
                    key={index}
                      style={
                      SelectedOption===index
                          ? {background: "#F0F0F0",border:'5px solid #5076FF'  }
                          : {background: "#F0F0F0"}
                      }
                    >
                      {data.OptionType === optionType[0] && <p>{val.text}</p>}
                      {data?.OptionType === optionType[1] && (
                        <img
                          width="270px"
                          height="121px"
                          alt="optionImg"
                          src={val?.imageUrl}
                        />
                      )}
                      {data?.OptionType === optionType[2] && (
                        <div style={{display: "flex", gap: "10px"}}>
                          <p>{val?.text}</p>
                          <img
                            width="136px"
                            height="111px"
                            alt=""
                            src={val?.imageUrl}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.nextbtn} onClick={()=>handleIsSelectedoptionTrue(QuizData._id,index)} >
                  <button>{QuizData?.Questions?.length === CurrentQuestion ?"submit":"next"}</button>
                </div>
              </section>
            )}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default Quizinterface;
