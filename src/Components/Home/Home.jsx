import React, { useState } from "react";
import styles from "./../Auth/auth.module.css";
import Modal from "react-modal";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
Modal.setAppElement("#root");
const Home = () => {
  const customStyles = {
    content: {
      width: "66vw",
      height: "70vh",
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
  const [islogin, setisLogin] = useState(false);
  const handleOpenSignup = () => {
    setisLogin(false);
  };
  const handleOpenlogin = () => {
    setisLogin(true);
  };

  return (
    <section>
      <Modal isOpen={true} style={customStyles}>
        <div className={styles.authBox}>
          <h1 className={styles.title}>Quizee</h1>
          <section className={styles.authbtn}>
            <div
              onClick={handleOpenSignup}
              style={
                !islogin
                  ? { boxShadow: " rgba(0, 25, 255, 0.25 ) 0px 5px 15px" }
                  : {}
              }
              className={styles.signup}
            >
              <button>Sign up</button>
            </div>
            <div
              onClick={handleOpenlogin}
              style={
                islogin
                  ? { boxShadow: " rgba(0, 25, 255, 0.25 ) 0px 5px 25px" }
                  : {}
              }
              className={styles.login}
            >
              <button>Log in</button>
            </div>
          </section>
        </div>
        <section>
          {islogin ? <Login /> : <Register setisLogin={setisLogin} />}
        </section>
      </Modal>
    </section>
  );
};

export default Home;
