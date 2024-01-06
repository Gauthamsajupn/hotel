import { Button } from 'react-bootstrap';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('currentuser'));
  const admin = JSON.parse(localStorage.getItem('currentadmin'));

  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem('currentuser');
    navigate('/login');
  }

  function logouts() {
    localStorage.removeItem('currentadmin');
    navigate('/signin');
  }

  const isHomeScreen = location.pathname === '/home';
  const isAdminscreen=location.pathname ==='/admin'
  const isLoginscreen=location.pathname ==='/signin'
  const isBookingscreen = location.pathname.includes('/book');
  const isProfilescreen=location.pathname ==='/profile'
  const isPanelscreen=location.pathname==='/panel'

  console.log('admin:', admin); // Add this line to check the value of admin
console.log('isAdminscreen:', isAdminscreen);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        
      <a className="navbar-brand" href={isPanelscreen ? '/panel' : (isBookingscreen || isProfilescreen || isHomeScreen) ? '/home' : '/'}>
  Emirates
</a>


        <Button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} />
          </span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-5">

            {isAdminscreen  || isLoginscreen ? (
               <>
               
               <li className="nav-item">
                 <a className="nav-link" href="/signin">Login</a>
               </li>
             </>
            ):user && (isHomeScreen || isBookingscreen || isProfilescreen )  ? (
              <>
              
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-user mr-2"></i>{user.name}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profile" >Profile</a>
                    <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                  </div>
                </div>
              </>
            ) :  admin && (isPanelscreen) ? (<>
              <>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa-solid fa-user mr-2"></i>{admin.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" onClick={logouts}>Logout</a>
                </div>
              </div>
              </>
            </>) :(
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
