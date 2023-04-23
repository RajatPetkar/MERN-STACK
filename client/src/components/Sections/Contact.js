import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [Data,setData] = useState({
    name :"",
    email:"",
    message:""
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
      setData({...Data, name:data.name, email:data.email, message:data.message});
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate('/',{replace:true})
    }
  };

  useEffect(() => {
    callContact();
  },[]);


const inputEvent = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setData((pre) => {
    return{
        ...pre,
        [name] : value
    }
    });
  };

const contactForm = async(e) => {
  e.preventDefault();
  console.log('clicked');
  const {name,email,message} = Data;
 const res = await fetch('/contact',{
  method:"POST",
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({
    name,email,message
  })
 })
 const data = await res.json();
 alert('Message sent');
  setData({
    message:" "
  })
  navigate('/')
}

  return (
    <>
    <div className="container-fluid px-5 my-5 mt-5 p-5">
  <div className="row justify-content-center">
    <div className="col-xl-10">
      <div className="card border-0 rounded-3 shadow-lg overflow-hidden">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-sm-6 d-none d-sm-block bg-image">
              <img src="images.jpeg" className="img-fluid w-100 h-100" alt="" />
            </div>
            <div className="col-sm-6 p-4">
              <div className="text-center">
                <div className="h3 fw-light">Contact Form</div>
                <p className="mb-4 text-muted">Split layout contact form</p>
              </div>

              <form id="contactForm" method='GET'>

              <div className="form-floating mb-3">
                
                <input name='name' value={Data.name} onChange={inputEvent} className="form-control" id="name" type="text" placeholder="Name" data-sb-validations="required" />
                <label htmlFor="name">Name</label>
                <div className="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
              </div>

          
              <div className="form-floating mb-3">
              
                <input className="form-control" value={Data.email} onChange={inputEvent} id="emailAddress" name='email' type="email" placeholder="Email Address" data-sb-validations="required,email" />
                <label htmlFor="emailAddress">Email Address</label>
                <div className="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                <div className="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
              </div>

     
              <div className="form-floating mb-3">
          
                <textarea className="form-control" value={Data.message} onChange={inputEvent} name='message' id="message" type="text" placeholder="Message"  data-sb-validations="required"></textarea>
                <label htmlFor="message">Message</label>
                <div className="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
              </div>

                <div className="d-grid">
                  <button onClick={contactForm} className="btn btn-primary btn-lg" id="submitButton" type='submit'>Submit</button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Contact