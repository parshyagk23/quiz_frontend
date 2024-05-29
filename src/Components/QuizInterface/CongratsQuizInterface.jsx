import React from "react";
import Modal from "react-modal";
import styles from "./Quizinterface.module.css";
import trophy from "./../../assets/trophy.png";
const CongratsQuizInterface = ({ QuizType, QuizLen, CorrectAns }) => {
 
  const customStyles = {
    content: {
      width: window.innerWidth<=700?"100vw": "80vw",
      height: window.innerWidth<=700?"100vh": "80vh",
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
              <div className={styles.quiztrophy} >
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
            <div className={styles.poll}>
              <h1  >Thank you for participating in the Poll</h1>

            </div>
          )}
        </section>
      </Modal>
    </div>
  );
};

export default CongratsQuizInterface;
