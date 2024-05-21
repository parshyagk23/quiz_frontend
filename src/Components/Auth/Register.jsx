
import { useRef, useState } from "react";
import styles from "./auth.module.css";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { register } from "../../Apis/Auth";

const Register = ({setisLogin}) => {
 
  const [RegisterData, setRegisterData] = useState({
    username:'',
    email: "",
    password: "",
    confirmPassoword: "",
  });
  const [error, setError] = useState({
    username:'',
    email: "",
    password: "",
    confirmPassoword: "",
  });

  
  const handleOnchange = (e) => {
    setError({ username:'',
    email: "",
    password: "",
    confirmPassoword: "",})
  
    setRegisterData({ ...RegisterData, [e.target.id]: e.target.value });
  };

  const handleRegister =async () => {
    const validEmail = '@gmail.com'
    let isError= false
   
   if(RegisterData.username.trim().length==0){
    setError((prev)=>{
      return {...prev , username:'invalid name'}
    })
    isError=true;
   }
   
   if(RegisterData.email.trim().length==0 || !RegisterData.email.includes(validEmail)){
    setError((prev)=>{
      return {...prev , email:'invalid email'}
    })
    isError=true;
   }

   if(RegisterData.password.trim().length==0|| RegisterData.password!==RegisterData.confirmPassoword){
    setError((prev)=>{
      return {...prev , password:'weak password'}
    })
    
    setRegisterData({ ...RegisterData,password:''});
    isError=true;
   }
   if(RegisterData.confirmPassoword.trim().length==0 || RegisterData.password!==RegisterData.confirmPassoword){
    setError((prev)=>{
      return {...prev , confirmPassoword:"password does'nt match"}
    })
    setRegisterData({ ...RegisterData,confirmPassoword:''});
    isError=true;
   }
   if(isError) return
   const responce= await register(RegisterData)
   
   if(responce.errormessage==="Username Already exists"){
     toast.error('user Already exist with email',{position:'top-center'})
    setRegisterData({email:'', username:'',confirmPassoword:"",password:''})
    return
  }
  toast.success('Register successful',{position:'top-center'})
   setRegisterData({email:'', username:'',confirmPassoword:"",password:''})
   setTimeout(() => {
     setisLogin(true)
    }, 2000);
 };

  return (
    <>
    <ToastContainer/>
   
    <main className={styles.auth}>
      
      <div>
        <label htmlFor="username">Name</label>
        <input
          style={error.username==='invalid name' ? { border: "1px solid red",  } : {}}
          id="username"
          type="text"
          placeholder={error.username || 'Enter name'}
          value={RegisterData.username}
          onChange={handleOnchange}
          className={error.username==='invalid name'?styles.username:"" }
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          style={error.email==='invalid email' ? { border: "1px solid red",  } : {}}
          placeholder={error.email|| 'enter email'}
          value={RegisterData.email}
          id="email"
          type="email"
          onChange={handleOnchange}
          className={error.email==='invalid email'?styles.username:"" }
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          style={error.password=== "weak password" ? { border: "1px solid red",  } : {}}
          placeholder={error.password||'enter password'}
          value={RegisterData.password}
          id="password"
          type={error.password=== "weak password" ? "text" : "password"}
          onChange={handleOnchange}
          className={error.password=== "weak password"?styles.username:"" }
        />
      </div>
      <div>
        <label htmlFor="confirmPassoword">Confirm password </label>
        <input
          style={error.confirmPassoword==="password does'nt match" ? { border: "1px solid red",  } : {}}
          placeholder={error.confirmPassoword||'enter confirmPassoword'}
          value={RegisterData.confirmPassoword}
          id="confirmPassoword"
          type={error.confirmPassoword=== "password does'nt match" ? "text" : "password"}
          onChange={handleOnchange}
          className={error.confirmPassoword==="password does'nt match"?styles.username:"" }
        />
      </div>
      <div onClick={handleRegister} className={styles.Signbtn}>
        <button>Sign up</button>
      </div>
    </main>
    </>
  );
};

export default Register;
