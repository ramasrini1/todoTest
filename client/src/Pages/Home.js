import React from 'react';
import TodoPage from './TodoPage';
import { NavLink } from 'react-router-dom'

function Home(){

  return (
    <>
      <h4 className="mt-4"></h4>
      <br></br>
      <h1 className="mt-4">Welcome to the Todo App!</h1>
      <h4 className="mt-6"><br></br></h4>
      <h4 className="mt-4">This is a multi user app with authenticaiton and authorization features</h4>
      <h4 className="mt-4">This app allows you to create a list of tasks that you want to do</h4>
      <h4>Once you have finished you can mark it as complete or delete it</h4>
      <hr className="mt-4"></hr>
      <h4 className="mt-4"> <NavLink to='/signup'>Signup</NavLink>  if you do not have an account</h4>
    </>
  )
}

export default Home;