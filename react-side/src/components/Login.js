import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Book.css";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const showToastMessage1 = () => {
    toast.error("Login failed !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessage = () => {
    toast.success("Login Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const url = "http://localhost:5000/login";
  function submit(e) {
    if (data.email !== "" && data.password !== "") {
      e.preventDefault();
      axios
        .post(url, {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          function toastMessage() {
            if (res.data.sucess == "True") {
              showToastMessage();
            } else if (res.data.sucess == "False") {
              showToastMessage1();
            }
          }
          toastMessage();
          if (res.data.sucess == "True") {
            let role = res.data.role;
            if (role == "User") {
              navigate("/User");
            } else if (role == "Admin") {
              navigate("/Admin");
            } else {
              toast.error("Please select the role!", {
                position: toast.POSITION.TOP_CENTER,
              });
              e.preventDefault();
            }
          }
        });
    } else {
      toast.error("Please enter all details !", {
        position: toast.POSITION.TOP_CENTER,
      });
      e.preventDefault();
    }
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  return (
    <div className="main-container1">
      <div className="content">
        <div className="head-login">
          <h2>Login</h2>
        </div>
        <div className="form-container1">
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={data.email}
            />
            <br />
            <br />
            <input
              onChange={(e) => handle(e)}
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              value={data.password}
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </form>
        </div>
        <div className="text">
          <p>Don't have an account?</p>&nbsp;&nbsp;&nbsp;
          <Link to="/signup" className="reg">
            <b>Register</b>
          </Link>
        </div>
      </div>
      <div className="imgbox">
        <img
          src="https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-stack-of-books-library-education-png-image_4906534.png"
          className="img-fluid"
          alt="Sample image"
          height="400px"
          width="400px"
        />
        <p>Library Management System</p>
      </div>
    </div>
  );
};
export default Login;