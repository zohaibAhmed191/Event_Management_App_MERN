import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const userLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="d-flex justify-content-between p-2">
      <Toaster />
      <Link to={"/Add_Event"}>
        <button className="btn btn-warning">Add New Event</button>
      </Link>
      <button className="btn btn-light" onClick={() => userLogout()}>
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
