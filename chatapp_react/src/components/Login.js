// import React, { useState } from "react";
// import "./Login.css";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   return (
//     <div className="container w-25 mt-4">
//       <div className="logo">
//         <img src="https://static.vecteezy.com/system/resources/previews/005/337/802/original/icon-symbol-chat-outline-illustration-free-vector.jpg" />
//       </div>
//       <h1 className="login-h1">Login to your Account</h1>
//       <form method="post">
//         <div className="form-group">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Username"
//             required
//             className="form-control form-input"
//           />
//         </div>
//         <div className="form-group">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             type="password"
//             placeholder="Password"
//             required
//             className="form-control form-input"
//           />
//         </div>
//         <div className="form-group">
//           <input
//             onChange={(e) => setRoom(e.target.value)}
//             type="text"
//             placeholder="Room"
//             required
//             className="form-control form-input"
//           />
//         </div>
//         <Link
//           onClick={(e) => (!name || !room ? e.preventDefault() : null)}
//           to={`/chat?name=${name}&room=${room}`}
//         >
//           <input type="submit" className="form-submit" value="Log In" />
//         </Link>
//       </form>
//     </div>
//   );
// };
// {
//   // (e) => {
//   //   // setName(e.target.value);
//   // };
// }
// export default Login;

import { message } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const Navigate = useNavigate();
  const [Login, setLogin] = useState([]);
  const [Loading, setLoading] = useState(false);
  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.email == "") {
        errors.email = "email cannot be blank";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      } else if (values.email.length <= 3) {
        errors.email = "Enter Valid email";
      }
      if (values.password == "") {
        errors.password = "Password cannot be blank";
      } else if (values.password.length <= 5) {
        errors.password = "Password length should be more than 5 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const login = await axios.post(
          "https://money-manager-backend-9yjg.onrender.com/login",
          values
        );
        if (login.data.token) {
          window.localStorage.setItem("token", login.data.token);
          message.success("Logged in Successfully");
          Navigate(`/chat?name=${myFormik.values.email}&room=Guvi`);
        } else {
          message.error("Email/password is incorrect");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        message.failed("Email/password is incorrect");
        console.log("Error", error);
      }
    },
  });

  // const handleName = (e) => {
  //   this.myFormik.handleChange;
  //   setName(e.target.value);
  // };
  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/337/802/original/icon-symbol-chat-outline-illustration-free-vector.jpg"
            alt="Group Chat icon"
          />
        </div>
        <div className="text-center mt-4 name">Group Chat</div>
        <form className="p-3 mt-3" onSubmit={myFormik.handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              name="email"
              id="userName"
              placeholder="email"
              onChange={myFormik.handleChange}
              value={myFormik.values.email}
            />
          </div>
          <span style={{ color: "red" }}>{myFormik.errors.email}</span>

          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="password"
              onChange={myFormik.handleChange}
              value={myFormik.values.password}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="text"
              name="room"
              id="room"
              placeholder="Guvi"
              disabled="true"
              // onChange={(e) => setRoom(Guvi)}
              value={"Group Name : Guvi"}
            />
          </div>
          <span style={{ color: "red" }}>{myFormik.errors.password}</span>

          <input
            disabled={Loading ? true : false}
            className="btn mt-3"
            type="Submit"
            value={Loading ? "Logging in..." : "Login"}
          />
        </form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or{" "}
          <Link to={"/Register"}>Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
