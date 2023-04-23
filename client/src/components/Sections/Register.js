import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const navigate = useNavigate ();
    const [Data,setData] = useState({
        name : " ",
        work:" ",
        email: "",
        phone : "",
        password: "",
        cpassword: "",
        img : ""
    })


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
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setData({ ...Data, img : base64 })
      }

      const PostData=async(e)=>{
            e.preventDefault();
            const {name,email,work,phone,password,cpassword,img} = Data;
            const res = await fetch('/register',{
              // mode: 'no-cors',
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({
                name,email,work,phone,password,cpassword,img
              })
            })
              const data = await res.json();
              if(!email || ! password || !name || !data){
                window.alert("kindly fill the data");
                console.log('error');
              }else{
                console.log('success');
                window.alert("Registered successfully");
                
                setData({
                  name : " ",
                  work:" ",
                  email: "",
                  phone : "",
                  password: "",
                  cpassword: "",
                  img : ""
                })
                navigate('/login', {replace: true});
              }
          }
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
        
          <div className="row justify-content-center align-items-center h-100">
          
            <div className="col-12 col-lg-12 col-xl-12">
            
              <div
                className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form method="POST">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            onChange={inputEvent}
                            value={Data.name}
                            id="firstName"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="work">
                            Work
                          </label>
                          <input
                            name="work"
                            type="text"
                            onChange={inputEvent}
                            value={Data.work}
                            id="work"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center"></div>
                      <div className="col-md-6 mb-4"></div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            onChange={inputEvent}
                            value={Data.email}
                            id="emailAddress"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <input
                            name="phone"
                            onChange={inputEvent}
                            value={Data.phone}
                            type="tel"
                            id="phoneNumber"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            name="password"
                            onChange={inputEvent}
                            type="password"
                            value={Data.password}
                            id="password"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="cpassword">
                            Confirm Password
                          </label>
                          <input
                            name="cpassword"
                            type="password"
                            onChange={inputEvent}
                            value={Data.cpassword}
                            id="cpassword"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-outline">
                        <input 
                           type="file"
                           lable="img"
                           name="img"
                           id='img'
                           accept='.jpeg, .png, .jpg'
                           onChange={(e) => handleFileUpload(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                        onClick={PostData}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}