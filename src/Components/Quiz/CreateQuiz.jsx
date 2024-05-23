import React, {  useState } from "react";
import Modal from "react-modal";
import styles from "./quiz.module.css";
import { PostQuiz } from "../../Apis/Quiz";
import Sharequiz from "./Sharequiz";
const CreateQuiz = ({
  QuizName,
  QuizType,
  setOpenCreateQuiz,
  OpenCreateQuiz,
}) => {
  const customStyles = {
    content: {
      width: "60vw",
      height: "80vh",
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
  const Timer = [
    { text: "Off", value: 0 },
    { text: "5 sec", value: 5 },
    { text: "10 sec", value: 10 },
  ];

  const [CheckOptionType, setCheckOptionType] = useState("Text");
  const [Slides, setSlides] = useState([1]);
  const [CurrentSlides, setCurrentSlides] = useState(0);
  const [openShareLink,setopenShareLink]= useState(false)
  const [AddOptions, setAddOptions] = useState([1, 2]);
  const [error, setError] = useState("");
  const [QuizId, setQuizId] = useState("");

  const [Quiz, setQuiz] = useState([
    {
      Question: "",
      OptionType: CheckOptionType,
      timer: 0,
      Options: [
        {
          text: "",
          imageUrl: "",
          isCorrectAns: false,
          PollCount: 0,
        },
        {
          text: "",
          imageUrl: "",
          isCorrectAns: false,
          PollCount: 0,
        },
      ],
    },
  ]);

  const CorrectAnsStyle = {
    background: "#60B84B",
    color: "#fff",
  };

  const handleAddSlide = () => {
    if (Slides.length >= 5) return;
    const addslide = Slides.length + 1;
    const QuizVal = {
      Question: "",
      OptionType: CheckOptionType,
      timer: 0,
      Options: [
        {
          text: "",
          imageUrl: "",
          isCorrectAns: "",
          PollCount: 0,
        },
        {
          text: "",
          imageUrl: "",
          isCorrectAns: "",
          PollCount: 0,
        },
      ],
    };
    setQuiz([...Quiz, QuizVal]);
    setSlides([...Slides, addslide]);
  };

  const handleremoveSlide = (val) => {
    if (Slides.length == 1) return;
    const updateslide = Slides.filter((slide) => slide != val);
    const updateQuiz = Quiz.filter((quiz, index) => index != val - 1);
    setQuiz(updateQuiz);
    setSlides(updateslide);
    setCurrentSlides(val - 2);
  };

  const handleAddOption = () => {
    const Addoption = AddOptions.length + 1;
    const newOption = {
      text: "",
      imageUrl: "",
      isCorrectAns: false,
      PollCount: 0,
    };

    setAddOptions([...AddOptions, Addoption]);
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides].Options = [
      ...updateQuiz[CurrentSlides].Options,
      newOption,
    ];
    setQuiz(updateQuiz);
  };

  const handleDeleteOption = (val) => {
    if (AddOptions.length == 2) return;
    const updateOption = AddOptions.filter((option) => option != val + 1);
    const updateQuiz = [...Quiz];
    const updateOptionVal = updateQuiz[CurrentSlides]?.Options.filter(
      (option, index) => index != val
    );
    updateQuiz[CurrentSlides].Options = updateOptionVal;
    setQuiz(updateQuiz);
    setAddOptions(updateOption);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides] = { ...updateQuiz[CurrentSlides], [name]: value };
    setQuiz(updateQuiz);
  };

  const HandleCheck = (e) => {
    setCheckOptionType(e.target.name);
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides] = {
      ...updateQuiz[CurrentSlides],
      [e.target.id]: e.target.name,
    };
    setQuiz(updateQuiz);
  };

  const handleTimer = (val) => {
  
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides] = { ...updateQuiz[CurrentSlides], timer: val };
    setQuiz(updateQuiz); 
  };

  const HandleOptionCheck = (e, Optionindex) => {
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides]?.Options?.map((data, index) => {
      if (index === Optionindex) {
        data.isCorrectAns = true;
      } else {
        data.isCorrectAns = false;
      }
    });
    setQuiz(updateQuiz);
  };

  const HandleOptionChange = (e, Optionindex) => {
    const updateQuiz = [...Quiz];
    updateQuiz[CurrentSlides].Options[Optionindex] = {
      ...updateQuiz[CurrentSlides]?.Options[Optionindex],
      [e.target.name]: e.target.value,
    };
    setQuiz(updateQuiz);
  };

  const generateQuizId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const characterLength = characters.length;
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
  };
  
  const handleCreateQuiz = async () => {
    if (!QuizName || !QuizType) {
      setError(true);
      return;
    }
    Quiz.map( (data) => {
      const { Question, OptionType, Options, timer } = data;
      if (!Question || !OptionType || timer==undefined) {
        setError(true);
        return;
      }
      let count =0;
      Options.map((data) => {
        const { text, imageUrl, isCorrectAns, PollCount } = data;
        if(!isCorrectAns)  count++;
        if(count=== Options.length) {
          setError(true)
          return;
        }
        if (OptionType === "Q&A") {
          if (OptionType === timer[0]) {
            if (text === "" || isCorrectAns == undefined) {
              setError(true);
              return;
            }
          } else if (OptionType === timer[1]) {
            if (imageUrl === "" || isCorrectAns == undefined) {
              setError(true);
              return;
            }
          } else if (OptionType === timer[2]) {
            if (text === "" || imageUrl === "" || isCorrectAns == undefined) {
              setError(true);
              return;
            }
          }
        } else {
          if (OptionType === timer[0]) {
            if (text === "") {
              setError(true);
              return;
            }
          } else if (OptionType === timer[1]) {
            if (imageUrl === "") {
              setError(true);
              return;
            }
          } else if (OptionType === timer[2]) {
            if (text === "" || imageUrl === "") {
              setError(true);
              return;
            }
          }
        }
      });

    });
    
    const newQuizId = generateQuizId();
    setQuizId(newQuizId);
    const res =await PostQuiz(QuizName,QuizType,newQuizId,Quiz);
    if(res.message==="Quiz create successfully")
      {
        setError(false)
        setopenShareLink(true)

      }
   return
    
  };
  return (
    <>
      <Modal isOpen={OpenCreateQuiz} style={customStyles}>
        <div
          style={{
            boxShadow: "none",
            width: "200px",
            height: "30px",
            float: "right",
          }}
        >
          <p
            style={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "30px",
              textAlign: "center",
              color: "#9f9f9f",
            }}
          >
            Max 5 questions
          </p>
        </div>

        <div className={styles.slides}>
          {Slides.map((val, index) => (
            <div
              style={
                index === CurrentSlides ? { border: "1px solid black" } : {}
              }
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlides(index);
              }}
            >
              <span>{val}</span>
              {index === Slides.length - 1 && index !== 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleremoveSlide(val);
                  }}
                >
                  x
                </span>
              )}
            </div>
          ))}
          <div
            onClick={handleAddSlide}
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "none",
            }}
          >
            {Slides.length !== 5 && (
              <span
                style={{
                  fontFamily: "Poppins sans-serif",
                  fontWeight: "600",
                  fontSize: "45px",
                  lineHeight: "30px",
                }}
              >
                +
              </span>
            )}
          </div>
        </div>

        <section>
          <div className={styles.question}>
            <input
              type="text"
              placeholder="Enter Question"
              name="Question"
              onChange={(e) => {
                handleChange(e);
              }}
              value={Quiz[CurrentSlides]?.Question}
            />
          </div>

          <div className={styles.optiontype}>
            <div>
              <h4>Quiz Type</h4>
            </div>
            {optionType.map((val, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={val}
                  id="OptionType"
                  checked={val === CheckOptionType}
                  onChange={(e) => {
                    HandleCheck(e);
                  }}
                  disabled={CurrentSlides != 0}
                />
                <h4>{val}</h4>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginLeft:'46px' }} >
          <div className={styles.option}>
            {Quiz[CurrentSlides]?.Options?.map((val, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name=""
                  id=""
                  style={QuizType === "Poll" ? { display: "none" } : {}}
                  onChange={(e) => HandleOptionCheck(e, index)}
                  checked={val.isCorrectAns}
                />
                {CheckOptionType === "Text" && (
                  <input
                    style={val.isCorrectAns ? CorrectAnsStyle : {}}
                    type="text"
                    placeholder="text"
                    name="text"
                    onChange={(e) => HandleOptionChange(e, index)}
                    value={val.text}
                  />
                )}
                {CheckOptionType === "Image URL" && (
                  <input
                    style={val.isCorrectAns ? CorrectAnsStyle : {}}
                    type="imageUrl"
                    placeholder="Image URL"
                    name="imageUrl"
                    onChange={(e) => HandleOptionChange(e, index)}
                    value={val.imageUrl}
                  />
                )}
                {CheckOptionType === "Text & Image URL" && (
                  <>
                    <input
                      style={val.isCorrectAns ? CorrectAnsStyle : {}}
                      type="text"
                      placeholder="text"
                      name="text"
                      onChange={(e) => HandleOptionChange(e, index)}
                      value={val.text}
                    />
                    <input
                      style={val.isCorrectAns ? CorrectAnsStyle : {}}
                      type="text"
                      placeholder="Image URL"
                      name="imageUrl"
                      onChange={(e) => HandleOptionChange(e, index)}
                      value={val.imageUrl}
                    />
                  </>
                )}
                {index > 1 && (
                  <svg
                    style={{ marginTop: "15px", cursor: "pointer" }}
                    onClick={() => {
                      handleDeleteOption(index);
                    }}
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                      fill="#D60000"
                    />
                  </svg>
                )}
              </div>
            ))}
            {Quiz[CurrentSlides]?.Options.length != 4 && (
              <div
                style={{
                  textAlign: "center",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
                onClick={handleAddOption}
              >
                <h1>add option</h1>
              </div>
            )}
          </div>


          {QuizType==="Q&A" &&
          <div className={styles.timer}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
              lineHeight: "30px",
              marginBottom: "10px",
              color: "#9f9f9f",
            }}
          >
            Timer
          </h2>
          {Timer.map((val, index) => (
            <div
              key={index}
              style={
                val.value === Quiz[CurrentSlides]?.timer
                  ? { color: "white", background: "red", cursor: "pointer" }
                  : {}
              }
              
              onClick={() => handleTimer(val.value)}
            >
              <h2>{val.text}</h2>
            </div>
          ))}
        </div>}
          <div
            className={styles.selectBtn}
            style={{
             
              position: "absolute",
              bottom: "70px",
              left: "86px",
            }}
          >
            <div
              onClick={() => {
                setOpenCreateQuiz(false);
              }}
            >
              <button>Cancel</button>
            </div>
            <div onClick={handleCreateQuiz}>
              <button>Create Quiz</button>
            </div>
          </div>
        </section>

        {error && (
          <p
            style={{
              width: "300px",
              margin: "120px auto 0 auto",
              color: "red",
              fontFamily: "Poppins , sans-sarif",
              textAlign: "center",
            }}
          >
            Fields can't be empty
          </p>
        )}
      </Modal>
      {openShareLink&&<Sharequiz QuizId ={QuizId} openShareLink={openShareLink} setopenShareLink={setopenShareLink} />}
    </>
  );
};

export default CreateQuiz;
