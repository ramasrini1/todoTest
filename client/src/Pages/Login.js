import { useAuth } from '../Components/Auth/auth';
import { useNavigate } from 'react-router-dom';
import TodoApi from "../Api/api";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

function Login(){
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors) => {};

  const registerOptions = {
    username: { required: "Username is required" },
    password: { required: "Password is required" },
};

  const navigate = useNavigate()
  const auth = useAuth();

  async function handleLogin( data, evt ) { 
    evt.preventDefault();
    let user = {
        username: data.username,
        password: data.password,
    }
    console.log("form data " + user.username)
    let result = await TodoApi.login(user);
    if ( result.status == 200 ){
      console.log("token is " + result.token)
      console.log("user is " + user.username)
      let u = {username: user.username, token: result.token}
      auth.login(u);
      navigate("/todo");
    } else {
      alert("Error logging in " + result.msg)
    }
  }
  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3 className="mt-4">Login Form</h3>
      <hr></hr>
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin, handleError)}>
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
export default Login;