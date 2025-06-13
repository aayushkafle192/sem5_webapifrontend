import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/cssFolder/Home.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginbutton = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="med_logo"></div>
        <div className={`items md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row`}>
          <ul id="nav-menu" className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 custom-font">
            <li><Link to="/home" className="text-gray-700 hover:text-orange-500 custom-font">Home</Link></li>
            <li><Link to="/aboutus" className="text-gray-700 hover:text-orange-500 custom-font">About</Link></li>
            <li><Link to="/services" className="text-gray-700 hover:text-orange-500 custom-font">Services</Link></li>
            <li><Link to="/product" className="text-gray-700 hover:text-orange-500 custom-font">Products</Link></li>
            <li><Link to="/contactus" className="text-gray-700 hover:text-orange-500 custom-font">Contact us</Link></li>
          </ul>
        </div>
        <div className="book_button hidden md:block">
          <button className="custom-button custom-font" onClick={handleLoginbutton}>Login</button>
        </div>
        <div className="hamburger md:hidden" onClick={handleHamburgerClick}>
          <i className="fa fa-bars text-2xl"></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
