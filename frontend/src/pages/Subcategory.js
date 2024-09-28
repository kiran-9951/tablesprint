import React, { useState, useEffect } from "react";
import "./Subcategory.css"; // Ensure this contains the correct modal styles
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App";

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [formData, setFormData] = useState({
    id: null,
    subcategory_name: "",
    category_name: "",
    image: null,
    sequence: 0,
    status: "active",
  });

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5050/api/sub/all");
      setSubcategories(response.data.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      alert("Failed to load subcategories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/category/all");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      alert("Failed to load categories. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const addSubcategory = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5050/api/sub/add", formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchSubcategories();
      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error adding subcategory:", err);
      alert("Failed to add subcategory. Please try again.");
    }
  };

  const editSubcategory = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.put(`http://localhost:5050/api/sub/update/${formData.id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchSubcategories();
      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error updating subcategory:", err);
      alert("Failed to update subcategory. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      subcategory_name: "",
      category: "",
      image: null,
      sequence: 0,
      status: "active",
    });
  };

  const handleDeleteSubcategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`http://localhost:5050/api/sub/delete/${id}`);
        fetchSubcategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory. Please try again.");
      }
    }
  };

  const openModal = (subcategory) => {
    if (subcategory) {
      setFormData({
        id: subcategory.id,
        subcategory_name: subcategory.subcategory_name,
        category: subcategory.category_name,
        image: null,
        sequence: subcategory.sequence,
        status: subcategory.status,
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      editSubcategory();
    } else {
      addSubcategory();
    }
  };

  return (
    <div>
      <div className="header-container">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/grid.png"
          alt="Subcategory Icon"
          className="subcategory-icon"
        />
        <h2 style={{ margin: "0 10px" }}>Subcategory</h2>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>
        <div>
          <button onClick={() => openModal()}>Add</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p> // Loading indicator
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Subcategory Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Sequence</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td>{subcategory.id}</td>
                  <td>{subcategory.subcategory_name}</td>
                  <td>{subcategory.category_name}</td>
                  <td>
                    {subcategory.image ? (
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={backendUrl + subcategory.image}
                        alt={subcategory.subcategory_name}
                        className="subcategory-image"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{subcategory.sequence}</td>
                  <td>{subcategory.status}</td>
                  <td>
                    <button
                      className="action-button"
                      title="Edit"
                      onClick={() => openModal(subcategory)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-button"
                      title="Delete"
                      onClick={() => handleDeleteSubcategory(subcategory.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No subcategories available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{formData.id ? "Edit Subcategory" : "Add Subcategory"}</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Subcategory Name:</label>
                <input
                  type="text"
                  name="subcategory_name"
                  value={formData.subcategory_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Category:</label>
                <select name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div>
                <label>Sequence:</label>
                <input
                  type="number"
                  name="sequence"
                  value={formData.sequence}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit">{formData.id ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subcategory;
