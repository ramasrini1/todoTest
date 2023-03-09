import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import { Navbars } from './Components/Navbar/Navbar';
import { NoMatch } from './Pages/NoMatch';
import  AuthErr  from './Pages/AuthErr';
import TodoPage from './Pages/TodoPage';
import Show from './Pages/Show';
import Login from './Pages/Login';
import About from './Pages/About';
import { AuthProvider } from './Components/Auth/auth';
import { RequireAuth } from './Components/Auth/RequireAuth';
import Signup from "./Pages/Signup";
import "./App.css";

function App() {

  return (
    <div className="App container">
    <AuthProvider> 
      <Navbars/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/todo' element={<RequireAuth><TodoPage/></RequireAuth>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/error' element={<AuthErr/>}/>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    </AuthProvider>
   
    </div>
    
  );
}


export default App;

