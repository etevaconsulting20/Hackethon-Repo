import React from 'react'
import { useNavigate } from "react-router-dom";

const HomeList = () => {
    const navigate = useNavigate();

    const navigateToAdd = () => {
        navigate("/app/home/add")
    }
  return (
      <div>
          <div>
              <button onClick={navigateToAdd}> add new</button>
          </div>
          
          HomeList
      
      </div>
  )
}

export default HomeList