import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TodoApi from "../../Api/api";
import { useAuth } from '../../Components/Auth/auth';
import "./delete.css"

// This component is not required for now
// If more info needs to be viewed we can use this
function Delete({id}) {
  const navigate = useNavigate();
  const auth = useAuth();

  const deleteTodo = () => {
    let res = {}
    const deleteData = async function () {
      let res = await TodoApi.deleteToDo(auth.token, id)  
      console.log("res " + res.status)
    };

    deleteData();
    if ( res.status === 400 ){
      alert(res.msg)
    }
    navigate('/mytodo');
  }
  return (
  <>
    <button className="btn" onClick={deleteTodo}>Delete</button>
  </>
  )
}
export default Delete;