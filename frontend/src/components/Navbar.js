import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ alwaysWhite = false }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userProfile = {
    name: "Maria Klara",
    email: "klara@gmail.com",
    avatar: "/image/resident1.jfif" 
  };

  useEffect(() => {
    const handleScroll = () => {
      if (alwaysWhite) return; 
      
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        updateNavColors('dark');
      } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
        updateNavColors('light');
      }
    };

    const updateNavColors = (theme) => {
      const elements = document.querySelectorAll('.nav-link:not(.active), .navbar-brand span');
      elements.forEach(el => {
        el.style.color = theme === 'dark' ? '#1e293b' : 'white';
      });
    };

    if (alwaysWhite) {
      const navbar = document.querySelector('.navbar');
      navbar.style.backgroundColor = 'white';
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      updateNavColors('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [alwaysWhite]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (showProfileDropdown && !e.target.closest('.profile-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [showProfileDropdown]);

  // Toggle profile dropdown
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, you would call your logout function from auth context
  };

  return (
    <nav className="navbar nav-blur">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/image/resid.png" alt="Logo" />
            <span>Fovere</span>
          </Link>
        </div>
        <div className="navbar-links">
          <ul className="navbar-nav">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/rooms" className="nav-link">Rooms</Link></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
        
        {isLoggedIn ? (
          <div className="profile-container">
            <div className="profile-avatar" onClick={toggleProfileDropdown}>
              <img src={userProfile.avatar} alt="Profile" />
            </div>
            
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img src={userProfile.avatar} alt="Profile" className="dropdown-avatar" />
                  <div className="profile-info">
                    <h4>{userProfile.name}</h4>
                    <p>{userProfile.email}</p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <ul className="dropdown-menu">
                  <li><Link to="/profile" className="dropdown-item"><i className="fas fa-user"></i> My Profile</Link></li>
                  <li><Link to="/list-room" className="dropdown-item"><i className="fas fa-heart"></i> Favorite Rooms</Link></li>
                  <li><Link to="/bookings" className="dropdown-item"><i className="fas fa-calendar"></i> My Bookings</Link></li>
                  <li><Link to="/settings" className="dropdown-item"><i className="fas fa-cog"></i> Settings</Link></li>
                  <div className="dropdown-divider"></div>
                  <li><button onClick={handleLogout} className="dropdown-item logout-item"><i className="fas fa-sign-out-alt"></i> Log Out</button></li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/list-room" className="navbar-btn">List Your Rooms</Link>
        )}
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Open mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      {showMobileMenu && (
        <div className="mobile-menu">
          <div className="container">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/rooms" className="nav-link">Rooms</Link>
            <a href="#contact" className="nav-link">Contact</a>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="nav-link"><i className="fas fa-user"></i> My Profile</Link>
                <Link to="/list-room" className="nav-link"><i className="fas fa-heart"></i> Favorite Rooms</Link>
                <Link to="/bookings" className="nav-link"><i className="fas fa-calendar"></i> My Bookings</Link>
                <Link to="/settings" className="nav-link"><i className="fas fa-cog"></i> Settings</Link>
                <button onClick={handleLogout} className="nav-link logout-link"><i className="fas fa-sign-out-alt"></i> Log Out</button>
              </>
            ) : (
              <Link to="/list-room" className="nav-link">List Your Rooms</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 