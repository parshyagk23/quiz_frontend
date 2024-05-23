import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './../../Components/Dashboard/dashboard.module.css'
import Sharequiz from '../../Components/Quiz/Sharequiz'
const DashBoardPage = () => {
  return (
    <main  className={styles.dashboard}>
      <Navbar/>
      <Sharequiz/>
    </main>
  )
}

export default DashBoardPage
