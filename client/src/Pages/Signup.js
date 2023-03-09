import React, { useState } from "react";
import TodoApi from "../Api/api";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Signup(){
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleError = (errors) => {};

  const registerOptions = {
      username: { required: "Username is required" },
      password: { required: "Password is required" },
  };

  async function handleSignup( data, evt) { 
    evt.preventDefault();
    let formData = {
        username: data.username,
        password: data.password,
      }
      console.log("form data singup " + formData.username)
      let result = await TodoApi.signup(formData.username, formData.password);
      console.log("rs " + result['msg'])
      
      if (result['status'] == 200) {
        navigate('/login');
      } else {
        alert( "Error " + result['msg']);
      }
  }
  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="mt-4">Signup Form</h3>
      <hr></hr>
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleSignup, handleError)}>
            <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control" 
                    type="text" {...register('username', registerOptions.username) }/>     
                  <small className="text-danger">
                        {errors?.username && errors.username.message}
                  </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" className="form-control" 
                  type="password" {...register('password', registerOptions.password) }/>
                <small className="text-danger">
                    {errors?.password && errors.password.message}
                </small>
            </div>
            <button style={{ background: 'blue',  fontSize: 16 }} className="mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default Signup;