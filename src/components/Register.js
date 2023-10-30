import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

function Register() {

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext;
  const navigate = useNavigate();

  const [registerDetails, setRegisterDetails] = useState({ email: "", password: "", name: "" ,confirmPassword:""});

  function onChange(event) {
    setRegisterDetails({ ...registerDetails, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    if(registerDetails.password !== registerDetails.confirmPassword){
      alert("password must be same")
      return;
    }
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(registerDetails), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    if (response.status !== 200) {
      showAlert(json.error, "danger")
      return;
    }
    showAlert("Registeration successful", "success")
    localStorage.setItem("token", json.token);
    navigate("/");
    console.log(json)
  }

  return (
    <div className="container my-5">
      <div className="contain">
        <h2>Registeration Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input minLength={5} required onChange={onChange} value={registerDetails.email} name='email' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input minLength={5} required onChange={onChange} value={registerDetails.password} name='password' type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confim Password</label>
          <input minLength={5} required onChange={onChange} value={registerDetails.confirmPassword} name='confirmPassword' type="password" className="form-control" id="confirmPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input minLength={5} required onChange={onChange} value={registerDetails.name} name='name' type="text" className="form-control" id="name" />
        </div>
        <button disabled={registerDetails.email.length < 5 || registerDetails.password.length < 5 ||registerDetails.name.length < 5 ||registerDetails.confirmPassword.length < 5 } type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Register
