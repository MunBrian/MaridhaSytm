import React from "react";
//import validate from './validateInfo';
// import useForm from './useForm';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Form.css";

const FormSignup = ({ submitForm }) => {
  // const { handleChange, handleSubmit, values, errors } = useForm(
  //   submitForm,
  //   validate
  // );

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email || !name || !password2) {
      toast.error("Please fill all your details");
    } else if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (password.length < 6) {
      toast.error("Password needs to be 6 characters or more");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email address is invalid");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      try {
        const url = "http://localhost:5000/api/users/register";
        const res = await axios.post(url, userData);

        //check if there is response
        if (res.data) {
          //store response in local storage
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        toast.success("Registration is successfull");
        navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>
          Get started with us today! <br />
          Create your account by filling out the information below.
        </h1>
        <div className="form-inputs">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Enter your username"
            value={name}
            onChange={handleChange}
          />
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
          {/* {errors.email && <p>{errors.email}</p>} */}
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>
        <div className="form-inputs">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={password2}
            onChange={handleChange}
          />
          {/* {errors.password2 && <p>{errors.password2}</p>} */}
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <a href="/Login">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
