import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import navIcon from "../assets/navicon.png";
import profile from "../assets/profile.png";

const Navbar = ({ setIsAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Log out the user
    setIsAuthenticated(false);
    setShowModal(false); // Close the modal after logout
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          <img src={navIcon} alt="Navigation Icon" style={styles.navIcon} />
          <h1 style={styles.title}>TableSprint</h1>
        </div>
        <img
          src={profile}
          alt="Profile Icon"
          style={styles.profileIcon}
          onClick={() => setShowModal(true)} // Show modal on click
        />
      </nav>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div style={styles.modalContainer}>
          <div style={styles.modal}>
            <p>Are you sure you want to logout?</p>
            <button style={styles.confirmButton} onClick={handleLogout}>
              Confirm
            </button>
            <button style={styles.cancelButton} onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "purple",
    padding: "10px 20px",
    color: "white",
    fontSize: "18px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  navIcon: {
    width: "30px",
    height: "30px",
  },
  title: {
    marginLeft: "15px",
  },
  profileIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  modalContainer: {
    position: "fixed",
    top: "80px",
    right: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minWidth: "200px",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
