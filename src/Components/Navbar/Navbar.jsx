import React from 'react'
import styles from './navbar.module.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout =()=>{
    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('userId')
    navigate('/')
  }
  return (
   
    <section className={styles.navBox} >
      <div className={styles.title} >
          <h1>QUIZZE</h1>
      </div>
      <div className={styles.mainelement} >
          <div>
              <button>Dashboard</button>
          </div>
          <div>
              <button>Analytics</button>
          </div>
          <div>
              <button>Create Quiz</button>
          </div>
      </div>
      <div className={styles.logout} >
            <span></span>
          <button  onClick={handleLogout} >Log out</button>
      </div>
    </section>
  
  )
}

export default Navbar
