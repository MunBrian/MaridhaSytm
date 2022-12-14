import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Form.css";

function FormLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    //if (!email || !password) {
    //toast.error("Please fill in all your fields");
    //}

    try {
      const userData = {
        email,
        password,
      };
      const url = "http://localhost:5000/api/users/login";
      const res = await axios.post(url, userData);

      //check if there is response
      if (res.data) {
        //store response in local storage
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      toast.success("Login is successfull");
      navigate("/booking");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="form-content-right">
      <div className="col-md-5">
        <div className="bs">
          <form onSubmit={onSubmit} className="form">
            <h1>Log Into Your Account</h1>
            <input
              type="email"
              className="form-input"
              placeholder="Enter Your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="form-input"
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={handleChange}
            />

            <button className="form-input-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
