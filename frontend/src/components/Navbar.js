import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import navIcon from '../assets/navicon.png';
import profile from '../assets/profile.png';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleProfileClick = () => {
    navigate('/signup'); // Navigate to signup page on profile icon click
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <img src={navIcon} alt="Navigation Icon" style={styles.navIcon} />
        <h1 style={styles.title}>TableSprint</h1>
      </div>
      <img
        src={profile}
        alt="Profile Icon"
        style={styles.profileIcon}
        onClick={handleProfileClick} // Attach click handler
      />
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: '10px 20px',
    color: 'white',
    fontSize: '18px',
  },
  leftSection: {
    display: 'flex', 
    alignItems: 'center', 
  },
  navIcon: {
    width: '30px',
    height: '30px',
  },
  title: {
    marginLeft: '15px', 
  },
  profileIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default Navbar;
