import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Delete from '../Components/Delete/delete';
import {Link} from 'react-router-dom';

function Show(){
  const {id} = useParams()
  const [todo, setTodo] = useState([]);
  
  async function fetchApiData(){
    let url = `http://127.0.0.1:5000/api/${id}`;

    try {
      const results = await axios.get(url);
      console.log("results is " + results.data);
      let items = results.data;
      setTodo(items);
      items.map((it, i) => {
        console.log(it.task_name + " " + i );
      });
    } catch(error) {
      console.log("Error is " + error);   
    }   
  }

  useEffect(() => { 
    fetchApiData();
  }, [id]);

  
  return (
    <>
      <div>
        <h1 className="mt-4">Task Detail Page</h1>
        {todo.length > 0 && todo.map(data => 
          <h2 key={id}>{data.task_name}</h2>)
        }
        <Delete id={id}/>
        <hr></hr>
        <h2><Link to='/'>Back to Todos</Link></h2>
      </div>
    </>
  )
}

export default Show;