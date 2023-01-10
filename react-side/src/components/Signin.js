// import Axios from "axios";
import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "./Book.css";
// import { useForm } from "react-hook-form";
const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    gender: "",
    branch: "",
    course: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  const showToastMessage = () => {
    toast.success("Sign in Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessage1 = () => {
    toast.success("Email already exists !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [errorMessage, setErrorMessage] = useState("");
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Not strong password");
    }
  };
  const url = "http://localhost:5000/signup";
  function submit(e) {
    e.preventDefault();
    if (
      data.fname !== "" &&
      data.lname !== "" &&
      data.email !== "" &&
      data.dob !== "" &&
      data.gender !== "" &&
      data.branch !== "" &&
      data.course !== "" &&
      data.password !== ""
    ) {
      axios
        .post(url, {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          dob: data.dob,
          gender: data.gender,
          branch: data.branch,
          course: data.course,
        })
        .then((res) => {
          console.log(res.data.exits);
          if (res.data.exists === "True") {
            console.log("ui if");
            showToastMessage1();
          } else {
            console.log("ui else");
            showToastMessage();
            navigate("/");
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
    <div className="main-container">
      <div className="form-container">
        <form onSubmit={(e) => submit(e)}>
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="fname"
            placeholder="First Name"
            className="form-control"
            value={data.fname}
            required
          />
          <br />
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="lname"
            placeholder="Last Name"
            className="form-control"
            value={data.lname}
            required
          />
          <br />
          <input
            onChange={(e) => {
              handle(e);
              validateEmail(e);
            }}
            type="email"
            id="email"
            placeholder="Email"
            className="form-control"
            value={data.email}
            required
          />
          <br />
          <span style={{ fontWeight: "bold", color: "red" }}>
            {emailError}
          </span>{" "}
          <input
            onChange={(e) => handle(e)}
            type="date"
            id="dob"
            min="1979-12-31"
            max="2010-12-31"
            // placeholder="dd-mm-yyyy"
            className="form-control"
            required
          />
          <br />
          <input
            onChange={(e) => handle(e)}
            type="radio"
            id="gender"
            name="gender"
            value="Male"
          />
          &nbsp;&nbsp;
          <label htmlFor="Male">Male</label>
          &nbsp;&nbsp;
          <input
            onChange={(e) => handle(e)}
            type="radio"
            id="gender"
            name="gender"
            value="Female"
          />
          &nbsp;&nbsp;
          <label htmlFor="FeMale">Female</label>
          <br></br>
          <br />
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="branch"
            placeholder="Branch"
            className="form-control"
            value={data.branch}
            required
          />
          <br />
          <input
            onChange={(e) => handle(e)}
            type="text"
            id="course"
            placeholder="Course"
            className="form-control"
            value={data.course}
            required
          />
          <br />
          <input
            onChange={(e) => {
              handle(e);
              validate(e.target.value);
            }}
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
            value={data.password}
            required
          />
          <br />
          {errorMessage === "" ? null : (
            <span style={{ fontWeight: "bold", color: "red" }}>
              {errorMessage}
            </span>
          )}{" "}
          <br />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
      <div className="img-container">
        <div className="img-box">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            className="img-fluid"
            alt="Sample image"
            height="700px"
            width="600px"
          />
        </div>
        <div className="img-down-text">
          <h2>Let's Get Started</h2>
          <p>
            {" "}
            Already Have an account?&nbsp;&nbsp;
            <Link to="/">
              {" "}
              <b>Log in</b>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signin;
{
  /* <div className="signin-form">
      <h1 id="heading">Register </h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          type="text"
          id="fname"
          placeholder="First Name"
          className="sign-input"
          value={data.fname}
          required
        />
        <br />
        <br />
        <br/>
        <input
          onChange={(e) => handle(e)}
          type="text"
          id="lname"
          placeholder="Last Name"
          className="sign-input"
          value={data.lname}
          required
        />
        <br />
        <br />
        <br/>
        <input
          onChange={(e) => {
            handle(e);
            validateEmail(e);
          }}
          type="email"
          id="email"
          placeholder="Email"
          className="sign-input"
          value={data.email}
          required
        />
        <br />
        <br />
        <span style={{ fontWeight: "bold", color: "red" }}>
          {emailError}
        </span>{" "}
        <br></br>
        <input
          onChange={(e) => handle(e)}
          type="date"
          id="dob"
          className="sign-input"
          required
        />
        <br />
        <br />
        <br/>
        <input type="radio" id="Male" value="Male"/>
        <label for="Male">Male</label><br></br>
        <input type="radio" id="Female" value="Female"/>
        <label for="Female">Female</label><br></br><br/>
        <input
          onChange={(e) => {
            handle(e);
            validate(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
          className="sign-input"
          value={data.password}
          required
        />
        <br />
        <br />
        {errorMessage === "" ? null : (
          <span style={{ fontWeight: "bold", color: "red" }}>
            {errorMessage}
          </span>
        )}{" "}
        <br/>
        <button type="submit" id="sign-btn" className="btn btn-size">
          Sign in
        </button>
      </form>
    </div> */
}