import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* <NavLink to="/" className="nav-logo">LocationApp</NavLink> */}
        <div className="nav-links">
          <NavLink to="/userForm" activeclassname="active">User Registration</NavLink>
          <NavLink to="/addLocation" activeclassname="active">Add Location</NavLink>
          <NavLink to="/table" activeclassname="active">View Locations</NavLink>
          <NavLink to="/users" activeclassname="active">Users</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
