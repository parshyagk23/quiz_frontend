import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './../../Components/Dashboard/dashboard.module.css'
import Analytics from '../../Components/Quiz Analysis/Analytics'
import Dashboard from '../../Components/Dashboard/Dashboard'

const DashBoardPage = () => {
  const [Analysis,setAnalysis]= useState(false)
  const [OpenDashbord,setDashboard]= useState(false)
  const [openQueAnalysis,setopenQueAnalysis]= useState(true)
  return (
    <main  className={styles.dashboard}>
      <Navbar setAnalysis={setAnalysis} setDashboard={setDashboard} setopenQueAnalysis={setopenQueAnalysis} />
      {Analysis && <Analytics  Analysis={Analysis} openQueAnalysis={openQueAnalysis} setopenQueAnalysis={setopenQueAnalysis}/>}
      {OpenDashbord&&<Dashboard/>}
      
    </main>
  )
}

export default DashBoardPage
