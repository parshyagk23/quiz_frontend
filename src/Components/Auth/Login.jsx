import React, { useState } from "react";
import styles from "./auth.module.css";
import { login } from "./../../Apis/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const navigate = useNavigate()
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleOnchange = (e) => {
    setError(false);
    setLoginData({ ...LoginData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    const validEmail = "@gmail.com";
    let isError = false;
    if (
      LoginData.email.trim().length == 0 ||
      !LoginData.email.includes(validEmail)
    ) {
      setError((prev) => {
        return { ...prev, email: "invalid email" };
      });
      isError = true;
    }

    if (LoginData.password.trim().length == 0) {
      setError((prev) => {
        return { ...prev, password: "weak password" };
      });

      setLoginData({ ...LoginData, password: "" });
      isError = true;
    }
    if (isError) return;

    const responce = await login(LoginData);
    if (responce.errormessage === "Invalid Credentials!!") {
      toast.error(responce.errormessage, { position: "top-center" });
      setLoginData({ email: "", password: "" });
      return;
    }

    setLoginData({ email: "", password: "" });
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000);
    toast.success("Login successful", { position: "top-center" });
  };

  return (
    <>
      <ToastContainer />
      <main className={styles.auth}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            style={
              error.email === "invalid email" ? { border: "1px solid red" } : {}
            }
            placeholder={error.email || "enter email"}
            value={LoginData.email}
            id="email"
            type="email"
            onChange={handleOnchange}
            className={error.email === "invalid email" ? styles.username : ""}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            style={
              error.password === "weak password"
                ? { border: "1px solid red" }
                : {}
            }
            placeholder={error.password || "enter password"}
            value={LoginData.password}
            id="password"
            type={error.password === "weak password" ? "text" : "password"}
            onChange={handleOnchange}
            className={
              error.password === "weak password" ? styles.username : ""
            }
          />
        </div>
        <div onClick={handleLogin} className={styles.loginbtn}>
          <button>Log in</button>
        </div>
      </main>
    </>
  );
};

export default Login;
