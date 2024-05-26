import React from "react";
import Modal from "react-modal";
import styles from "./Quizinterface.module.css";
import trophy from "./../../assets/trophy.png";
const CongratsQuizInterface = ({ QuizType, QuizLen, CorrectAns }) => {
 
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
  return (
    <div>
      <Modal
        isOpen={true}
        style={customStyles}
        overlayClassName={styles.overlayclass}
      >
        <section className={styles.Congrats}>
          {QuizType === "Q&A" ? (
            <>
              <div>
                <h1>Congrats Quiz is completed</h1>
              </div>
              <div style={{ width: "22vw", margin: " 0 auto" }}>
                <img src={trophy} alt="trophy" />
              </div>
              <div>
                <h1>
                  Your Score is {"  "} 
                  <span>
                    {CorrectAns}/{QuizLen}
                  </span>
                </h1>
              </div>
            </>
          ) : (
            <div>
              <h1 style={{ fontSize:'74px', lineHeight:'111px' ,textAlign:'center',fontWeight:'700' }} >Thank you for participating in the Poll</h1>

            </div>
          )}
        </section>
      </Modal>
    </div>
  );
};

export default CongratsQuizInterface;
