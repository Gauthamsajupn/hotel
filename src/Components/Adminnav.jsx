import { Button } from 'react-bootstrap';
import React from 'react';


const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Marriott</a>
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto"> 
            <li className="nav-item active">
              <a className="nav-link" href="/admin">Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="signin">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
