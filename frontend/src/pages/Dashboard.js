import React from 'react';
import icon from "../assets/icon.png"; 

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <img src={icon} alt="Logo" style={styles.image} />
      <h1 style={styles.text}>Welcome to TableSprint Admin</h1>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute", 
    top: "50%", 
    left: "55%", 
    transform: "translate(-50%, -50%)", 
    textAlign: "center", 
  },
  image: {
    width: "150px", 
    marginBottom: "20px", 
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333", 
  },
};

export default Dashboard;
