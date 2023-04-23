import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [Data,setData] = useState(' ');
  const callAbout = async () => {
    try {
      const res = await fetch("/about", {
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
      console.log(data);
      setData(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate('/login',{replace:true})
    }
  };

  useEffect(() => {
    callAbout();
  },[]);



  return (
    <>
     <section className="h-100 mt-5">
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-12 mb-4 mb-lg-0">
        <div className="card mb-5 " style={{borderRadius: "0.5rem"}}>
          <div className="row g-0">
            <div className="col-md-4 bg-info bg-gradient text-center text-white p-2"
              style={{borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem"}}>
              <img src={Data.img}
                alt="Avatar" className="img-fluid my-5 rounded " style={{width: "8rem"}} />
              <h5>{Data.name}</h5>
              <h6>{Data.work}</h6>
              <i className="far fa-edit mb-5"></i>
            </div>
            <div className="col-md-8">
              <div className="card-body p-4">
                <h6>About</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Email</h6>
                    <p className="text-muted">{Data.email}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Phone</h6>
                    <p className="text-muted">{Data.phone}</p>
                  </div>
                </div>
                <h6>Information</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>ID</h6>
                    <p className="text-muted">{Data._id}</p>
                  </div>
                </div>
                <h6>Social Media</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    {/* <h6></h6>
                    <p className="text-muted">{Data._id}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
    </>
  );
};

export default About;
