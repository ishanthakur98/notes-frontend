import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

function Login() {

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext;

  let navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  function onChange(event) {
    setLoginDetails({ ...loginDetails, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(loginDetails), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (response.status !== 200) {
      showAlert("Invalid credentials", "danger")
      return;
    }
    showAlert("login successful", "success")
    localStorage.setItem("token", json.token);
    navigate("/");
    console.log(json)
  }

  return (
    <div className="container my-5">
      <div className="contain">
        <h2>Login Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={onChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onChange={onChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
