import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const Navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <>
      <div className="container-fluid bg-dark ">
        <div className="row ">
          <div className="col-lg-11 ">
            <div className="todo-text">Group Chat</div>
          </div>
          <div className="col-lg-1">
            <button className="btn btn-primary mt-2" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
