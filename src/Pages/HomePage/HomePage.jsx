import React, { useEffect ,useState} from "react";
import Home from "../../Components/Home/Home";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(Cookies.get('token'))
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/dashboard')
    }
  },[isLoggedIn])
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#F2F2F2" }}>
      <Home />
    </main>
  );
};

export default HomePage;
