import React from "react";
import { FaEye, FaTrash, FaSearch } from "react-icons/fa";
import "./Product.css";

const Product = () => {
  return (
    <div>
      <div className="header-container">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/grid.png"
          alt="Category Icon"
          className="category-icon"
        />
        <b className="header-title">Category</b>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>
        <button className="add-category-button">Add Category</button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Subcategory Name</th>
            <th>Category Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="action-button" title="View">
                <FaEye />
              </button>
              <button className="action-button" title="Delete">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Product;
