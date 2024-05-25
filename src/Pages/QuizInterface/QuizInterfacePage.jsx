import React, { useEffect, useState } from 'react'
import Quizinterface from '../../Components/QuizInterface/Quizinterface'
import { useParams } from 'react-router-dom'
import { getQuizById } from '../../Apis/Quiz'
const QuizInterfacePage = () => {
    const { id } =  useParams()
    const [QuizData ,setQuizData]= useState()

    const getQuizByQuizId = async ()=>{
        const responce = await getQuizById(id);
        if(!responce) return
        setQuizData(responce.data)
    }
    useEffect(()=>{
        setTimeout(() => {
            getQuizByQuizId()
        }, 1000);
    },[])
  return (
    <main style={{ background: "#041325", width:'100vw',height:'100vh'    }}>
      <Quizinterface QuizData={QuizData} />
    </main>
  )
}

export default QuizInterfacePage
