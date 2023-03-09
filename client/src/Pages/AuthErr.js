function AuthErr(){
  return (
    <div className="container">
      <h2 className="mt-4">Authorization Error</h2>
      <hr></hr>
      <h2 className="mt-4">
        Need permission to access this page !! <br></br>
        <h3 className="mt-4"> <a href="/login">Login</a> or <a href="/signup">SignUp</a></h3>
      </h2>
    </div>
  )
}

export default AuthErr