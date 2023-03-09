import {useContext, useEffect, useState} from "react";
import { useAuth } from '../Components/Auth/auth';
import Form from '../Components/Form/form';
import Card from '../Components/Card/Card';
import TodoApi from "../Api/api";
import {Link} from 'react-router-dom';

function TodoPage() {

  const [addToDo, setAddToDo] = useState('');
  const [todos,setTodos] = useState([]);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const auth = useAuth();

  async function fetchApiData(){
    const results = await TodoApi.getMyTodos(auth.token);
    if ( results.status === 400 ) { 
      alert(results.msg)
    } else {
      let items = results;
      setTodos(items);
    }
  }
  useEffect(() => {
    fetchApiData();
  }, []);

  const handleFormSubmit = () => {
    // send data to backend through api call
    const addData = async function () {
      let task = {task_name: addToDo}
      const results = await TodoApi.addTodo(auth.token, task); 
      fetchApiData();
      if ( results.status === 400){
        alert(results.msg)
      }
      
    };
    addData();
    setAddToDo('');
    setIsAddedSuccess(true)
    if ( isAddedSuccess === true){
      setIsAddedSuccess(false);
    }
  } // handleFormSubmit

  // user types gets reflected on form field, changes state of addToDo
  const handleFormChange = (inputValue) => {
    setAddToDo(inputValue);
  }

  function updateTodo(t, newState) {
    //console.log("task_name " + t.task_name + " id is " + t.id + " state " + newState)
    const data = {id:t.id, complete:newState};
    
    const updateData = async function () {
      let res = await TodoApi.updateTodo(auth.token, data, t.id ) 
      fetchApiData();
      if (res.status === 400 ){ alert( res.msg); } 
    };
    updateData();
    setIsAddedSuccess(true)
    if ( isAddedSuccess === true){
      setIsAddedSuccess(false);
    }
  }

  function deleteTodo(id) {
    console.log("item to be delted " + id)
    const deleteData = async function () {
      let res = await TodoApi.deleteTodo(auth.token, id)  
      fetchApiData();
    };
    deleteData();
    setIsAddedSuccess(true)
    if ( isAddedSuccess === true){
      setIsAddedSuccess(false);
    }
  }

  return (
    <>
      <h1 className="mt-4">Todo App</h1>
      <Form userInput={addToDo} 
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}>      
      </Form>
      <Card listOfTodos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
    </>
  )
}

export default TodoPage;

 