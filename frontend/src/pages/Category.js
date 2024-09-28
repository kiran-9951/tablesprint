import React, { useState, useEffect } from "react";
import './Category.css';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { backendUrl } from "../App";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // For holding the current image when editing
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search input

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setIsEditing(false);
    setShowModal(true);
    clearForm();
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setShowModal(true);
    setEditId(category.id);
    setCategoryName(category.category_name);
    setSequence(category.sequence);
    setStatus(category.status);
    setImage(null); // Reset file input
    setExistingImage(category.image); // Save the existing image for reference
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearForm();
  };

  const clearForm = () => {
    setCategoryName('');
    setSequence('');
    setStatus('Active');
    setImage(null);
    setEditId(null);
    setExistingImage(null);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/category/delete/${id}`);
      fetchCategories(); // Fetch updated list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('sequence', sequence);
    formData.append('status', status);
    
    if (image) {
      formData.append('image', image);  // Append image if it exists
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5050/api/category/update/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("Category updated successfully:", editId);
      } else {
        // Add new category
        await axios.post('http://localhost:5050/api/category/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("Category added successfully");
      }

      // Fetch updated categories after adding/editing
      await fetchCategories(); 

    } catch (error) {
      console.error("Error saving category:", error);
    }

    handleCloseModal();
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/category/all');
      setCategories(response.data);  // Ensure the updated image URL is in the fetched data
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="header-container">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/grid.png"
          alt="Category Icon"
          className="category-icon"
        />
        <h2 style={{ margin: '0 10px' }}>Category</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <FaSearch className="search-icon" />
        </div>
        <button className="add-category-button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Sequence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category_name}</td>
              <td>
                {category.image ? (
                  <img style={{ width: "50px", height: "50px" }}
                    src={backendUrl + category.image}
                    alt={category.category_name}
                    className="category-image"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{category.status}</td>
              <td>{category.sequence}</td>
              <td>
                <button className="action-button" title="Edit" onClick={() => handleEditCategory(category)}>
                  <FaEdit />
                </button>
                <button className="action-button" title="Delete" onClick={() => handleDeleteCategory(category.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="modal-input"
            />
          </div>
          <div>
            <label>Sequence:</label>
            <input
              type="number"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              className="modal-input"
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="modal-input"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label>Image Upload:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="modal-input"
            />
            {isEditing && existingImage && !image && (
              <p>Current image will be retained.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
