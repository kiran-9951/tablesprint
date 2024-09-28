import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.menuItem}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/home.png"
          alt="Dashboard Icon"
          style={styles.icon}
        />
        <Link to="/dashboard" style={styles.link}>
          <span style={styles.text}>Dashboard</span>
        </Link>
        <Link to="/dashboard" style={styles.link}>
          <span style={styles.arrow}>▶</span>
        </Link>
      </div>

      <div style={styles.menuItem}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/grid.png"
          alt="Category Icon"
          style={styles.icon}
        />
        <Link to="/category" style={styles.link}>
          <span style={styles.text}>Category</span>
        </Link>
        <Link to="/category" style={styles.link}>
          <span style={styles.arrow}>▶</span>
        </Link>
      </div>

      <div style={styles.menuItem}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/list.png"
          alt="Subcategory Icon"
          style={styles.icon}
        />
        <Link to="/subcategory" style={styles.link}>
          <span style={styles.text}>Subcategory</span>
        </Link>
        <Link to="/subcategory" style={styles.link}>
          <span style={styles.arrow}>▶</span>
        </Link>
      </div>

      <div style={{ ...styles.menuItem, ...styles.activeMenuItem }}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/box.png"
          alt="Products Icon"
          style={styles.icon}
        />
        <Link to="/products" style={styles.link}>
          <span style={styles.text}>Products</span>
        </Link>
        <Link to="/products" style={styles.link}>
          <span style={styles.arrow}>▶</span>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "5px",
    cursor: "pointer",
    color: "#333",
    borderRadius: "5px",
  },
  activeMenuItem: {
    color: "#000",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  link: {
    textDecoration: "none",
  },
  text: {
    flexGrow: 1,
    marginLeft: "10px",
  },
  arrow: {
    fontSize: "12px",
    // color: "#333",
  },
};

export default Sidebar;
