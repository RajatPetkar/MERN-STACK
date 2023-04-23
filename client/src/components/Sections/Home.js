import React, { useEffect, useState } from "react";
import './css/Home.css'

const Home = () => {
  const [Data,setData] = useState({
    name :"",
    work:""
 })

 const callContact =  async () => {
  try {
    const res = await fetch("/contact", {
      method:"GET",
      headers:{
        // Accept: "application/json",
        "Content-Type": "application/json"
      },
      // credentials:"include"
    });
    const data = await res.json();
    console.log(data);
    setData({...Data, name:data.name, work:data.work,img:data.img});
    if(!res.status === 200){
      const error = new Error(res.error);
      throw error;
    }
  } catch (error) {
    console.log(error);
    // navigate('/',{replace:true})
  }
};

useEffect(() => {
  callContact();
},[]);

  return (
    <>
  <header id="header" >
    <div className="container">
     <div className="cc">
     <img src={Data.img}
                alt="Avatar" className="img-fluid my-5 rounded hi" style={{width: "8rem"}} />
      <h1>{Data.name}</h1>
      <h2>I'm a  <span>{Data.work}</span> from Nagpur</h2>
      </div>
      <div className="social-links">
        <a href="#" className="twitter"><i className="bi bi-twitter "></i></a>
        <a href="#" className="facebook"><i className="bi bi-facebook m-2"></i></a>
        <a href="#" className="instagram"><i className="bi bi-instagram m-2"></i></a>
        <a href="#" className="linkedin"><i className="bi bi-linkedin m-2"></i></a>
      </div>

    </div>
  </header>
    </>
  );
};

export default Home;
