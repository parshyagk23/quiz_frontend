import React from "react";
import Modal from "react-modal";
import styles from "./quiz.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Sharequiz = ({ QuizId, openShareLink, setopenShareLink }) => {
  const customStyles = {
    content: {
      width: "76vw",
      height: "49vh",
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
  const handleShareQuizLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/quiz/${QuizId}`
    );
    toast.success("Link copied to Clipboard", { position: "top-right" });
  };
  const handleRemove = () => {
    setopenShareLink(false);
  };
  return (
    <div>
      <Modal isOpen={openShareLink} style={customStyles}>
        <ToastContainer />
        <section className={styles.sharebox}>
          <div onClick={handleRemove} className={styles.removeShareLink}>
            <h1>X</h1>
          </div>
          <div className={styles.congrat}>
            <h1>Congrats your Quiz is Published!</h1>
          </div>
          <div>
            <h2>{`http://localhost:5173/quiz/${QuizId}`}</h2>
          </div>
          <div onClick={handleShareQuizLink}>
            <button>Share</button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default Sharequiz;
