import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

   const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const inputEvent=(e)=>{
        setEmail(e.target.value);
    }
    const input=(e)=>{
        setPassword(e.target.value);
    }
    const loginEvent= async(e)=>{
      e.preventDefault();
      const res = await fetch('/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json();
      if(!data || !email || !password || res.status===400){
        window.alert('Invalid credientials');
      }else{

        window.alert('Login successful');
        navigate('/',{replace:true});
      }
    }
  return (
    <>
      <section className="h-100 mt-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form method="POST">
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={inputEvent}
                    value={email}
                    id="form1Example13"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <input
                    name="password"
                    value={password}
                    onChange={input}
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                  />
                  
                </div>

                <button
                  type="submit"
                  onClick={loginEvent}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
