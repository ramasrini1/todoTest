import { NavLink } from 'react-router-dom'
import { useAuth } from '../Auth/auth';
import logo from '../assets/logo.png';
import "./Navbar.css";

export const Navbars = () => {
  const auth = useAuth();
  console.log("auth.user is " + auth.user)
  
  return (
    <nav className="navigation mt-4">
      <a href="/" className="brand-name">
        TODO_APP
      </a>  
      <div
        className="navigation-menu">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
          <li>
            <NavLink to='/todo'>MyTodos</NavLink>
          </li>
          { auth.user && (<li><NavLink to='/login' onClick={auth.logout}>
            Logout {auth.user}
            </NavLink></li>
          )}
          {!auth.user && (
            <li><NavLink to='/signup'>
              Signup
            </NavLink>
            </li>
          )}
          {!auth.user && (
            <li><NavLink to='/login'>
              Login
            </NavLink>
            </li>
          )}
          
        </ul>
      </div>
    </nav>
  );
  
}
