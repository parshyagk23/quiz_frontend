import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Quizinterface.module.css";
import { getCorrectAns } from "../../Apis/Quiz";
import CongratsQuizInterface from "./CongratsQuizInterface";
const Quizinterface = ({ QuizData }) => {
  const customStyles = {
    content: {
      width: window.innerWidth<=700?"100vw": "80vw",
      height: window.innerWidth<=700?"100vh": "0",
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
  const [CurrentQuestion, setCurrentQuestion] = useState(1);
  const [count, setCount]= useState(QuizData?.timer || 0);
  const [SelectedOption, setSelectedOption] = useState();
  const [OpenContgrats, setOpenContgrats] = useState(false);
  const [CorrectAns, setCorrectAns] = useState(0);
useEffect(() => {
    let timer;
    if (count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      if (CurrentQuestion > QuizData?.Questions?.length) {
        setOpenContgrats(true);
        return;
      }
      handleIsSelectedoptionTrue(QuizData?._id, CurrentQuestion - 1);
      setCount()
    }

    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    setCount(QuizData?.timer);
  }, [CurrentQuestion,QuizData?.timer]);

  const handleIsSelectedoptionTrue = async (quizId, questionindex) => {
   
    
    let res = await getCorrectAns(quizId, questionindex, SelectedOption);
    setSelectedOption();

    if (res?.QuizAns) {
      setCorrectAns((prev) => prev + 1);
    }
    setCurrentQuestion((prev) => prev + 1);

    if (CurrentQuestion === QuizData?.Questions?.length) {
      setOpenContgrats(true);
      return;
    }
  };

  return (
    <div>
      <Modal
        isOpen={!OpenContgrats}
        style={customStyles}
        overlayClassName={styles.overlayclass}
      >
        {QuizData?.Questions?.map((data, index) => (
          <div key={index}>
            {index + 1 === CurrentQuestion && (
              <section>
                <div className={styles.queno}>
                  <h3>
                    {CurrentQuestion}/{QuizData?.Questions.length}
                  </h3>
                  {data?.timer !== 0 ? (
                    <h3 style={{ color: "#D60000" }}>00:{count}s</h3>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className={styles.question}>
                  <h1>{data.Question}</h1>
                </div>
                <div className={styles.options}>
                  {data?.Options?.map((val, index) => (
                    <div
                      onClick={() => setSelectedOption(index)}
                      key={index}
                      style={
                        SelectedOption === index
                          ? {
                              background: "#F0F0F0",
                              border: "5px solid #5076FF",
                            }
                          : { background: "#F0F0F0" }
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
                        <div style={{ display: "flex", gap: "10px" ,justifyContent:'center'}}>
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
                <div
                  className={styles.nextbtn}
                  onClick={() =>
                    handleIsSelectedoptionTrue(QuizData._id, index)
                  }
                >
                  <button>
                    {QuizData?.Questions?.length === CurrentQuestion
                      ? "submit"
                      : "next"}
                  </button>
                </div>
              </section>
            )}
          </div>
        ))}
      </Modal>
      {OpenContgrats && (
        <CongratsQuizInterface
          QuizType={QuizData?.QuizType}
          QuizLen={QuizData.Questions.length}
          CorrectAns={CorrectAns}
        />
      )}
    </div>
  );
};

export default Quizinterface;
