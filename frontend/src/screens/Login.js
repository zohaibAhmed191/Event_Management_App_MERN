import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { onLogin, onRegister } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await onLogin(data);
      setIsLoading(false);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error[0].message);
    }
  };
  const registerUser = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email1);
    formData.append("password", data.password1);
    formData.append("phone", data.phone);
    try {
      setIsLoading(true);
      const response = await onRegister(formData);
      setIsLoading(false);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error[0].message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {isLoading ? (
        <Loader />
      ) : (
        <div class="container">
          <h1 className="text-center">Welcome to Event Management App</h1>
          <div className="d-flex justify-content-evenly flex-wrap">
            <form onSubmit={handleSubmit(login)}>
              <div className="login-card my-5">
                <h2 className="text-center">Login Form</h2>
                <div className="my-3">
                  <p className="text-primary m-0">Email*</p>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-danger">Email Required</p>
                  )}
                </div>
                <div className="my-3">
                  <p className="text-primary m-0">Password*</p>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-danger">password Required</p>
                  )}
                </div>

                <input type="submit" className="submit-btn mt-2" />
              </div>
            </form>

            <form onSubmit={handleSubmit(registerUser)}>
              <div className="register-card my-5">
                <h2 className="text-center">Register Form</h2>
                <div className="my-1">
                  <p className="text-primary m-0">Name</p>
                  <input type="text" placeholder="Name" {...register("name")} />
                </div>
                <div className="my-1">
                  <p className="text-primary m-0">Email*</p>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email1", { required: true })}
                  />
                  {errors.email1 && (
                    <p className="text-danger">Email Required</p>
                  )}
                </div>
                <div className="my-1">
                  <p className="text-primary m-0">Password*</p>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password1", { required: true })}
                  />
                  {errors.password1 && (
                    <p className="text-danger">password Required</p>
                  )}
                </div>
                <div className="my-1">
                  <p className="text-primary m-0">Phone</p>
                  <input
                    type="Number"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                </div>
                <input type="submit" className="submit-btn mt-2" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
