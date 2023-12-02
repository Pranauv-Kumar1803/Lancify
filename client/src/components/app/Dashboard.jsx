import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const {currentUser} = useSelector(state=>state.user);

  useEffect(()=>{

  }, [currentUser])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard