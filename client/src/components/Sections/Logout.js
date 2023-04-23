import React, { useContext } from 'react'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {

    const navigate = useNavigate()
    const callLogout =  async () => {
        try {
          const res = await fetch("/logout", {
            method:"GET",
            headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            credentials:"include"
          });
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
          
          navigate('/login',{replace:true})
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        callLogout();
      });

  return (
    <>
{/* <h1>hi welcome</h1> */}
    </>
  )
}

export default Logout