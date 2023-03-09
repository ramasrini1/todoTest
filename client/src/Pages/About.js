import { React } from 'react';

const About = () => {
  return (
    <>
    <div className="container">
      <h1 className="mt-4">About</h1>
      <hr></hr>
      <h2 className="mt-4">This is a multi user Todo App</h2> 
      <br></br>
      <h4 className="mt-2">Users can create tasks, edit and manage their task list
      </h4>
      <div className="mt-5"></div>
      <hr></hr>
      <div className="mt-2">
        <h4>FrontEnd: React</h4><br></br>
        <h4>Backend: Flask Server</h4><br></br>
        <h4>Database: Postgres</h4>
      </div>
    </div>
    </>
  )
}

export default About