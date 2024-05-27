import React from "react";
import Modal from "react-modal";
import styles from "./Analysis.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteQuizById } from "../../Apis/Quiz";
const DeleteQuiz = ({QuizId, setopenDeleteQuiz, OpenDeleteQuiz }) => {
  const customStyles = {
    content: {
      width: "50vw",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      background: "#FFF",
      boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px",
      zIndex: "1",
    },
  };

  const handleDeleteQuiz = async()=>{
    const res = await DeleteQuizById(QuizId)
    if(res?.message==='Quiz Deleted Successfully'){
        toast.success(res?.message ,{position:'top-right'})
        
    }
   setTimeout(() => {
    setopenDeleteQuiz(false)
   }, 2000);


  }
  return (
    <div>
      <Modal isOpen={OpenDeleteQuiz} style={customStyles}>
        <ToastContainer/>
        <section className={styles.delete}>
          <div>
            <h1>Are you confirm you want to delete ?</h1>
          </div>
          <div className={styles.deletebtn}>
            <div onClick={handleDeleteQuiz} >
              <button>Confirm Delete</button>
            </div>
            <div onClick={()=>setopenDeleteQuiz(false)} >
              <button>cencel</button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default DeleteQuiz;
