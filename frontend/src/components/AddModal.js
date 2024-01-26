import React, { useState } from "react";
import axios from "axios";
import "../css/Modal.css";
import { useData } from "../context/UserData";

function AddModal({ isOpen, onClose }) {
  // State variables to store user input and validation errors
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [userData, setUserData] = useData();
  const [errors, setErrors] = useState({});

  // Function to perform client-side form validation
  const validateForm = () => {
    const newErrors = {};

    // Basic validation checks
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!mail.trim()) {
      newErrors.mail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      newErrors.mail = "Invalid email address";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }

    // Set validation errors in state
    setErrors(newErrors);

    // Form is considered valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle user addition
  const addUser = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare user object for API request
        const obj = { name, mail, city, company };
        
        // Make API request to add user
        const { data } = await axios.post(
          "http://localhost:8080/api/add-user",
          obj
        );

        // Display success message, close modal, and update user data context
        window.alert("Successfully added!!!");
        onClose();
        setUserData(data.result);
      } catch (error) {
        // Log error if user addition fails
        console.log("Error in adding user:", error);
      }
    }
  };

  return (
    <>
      <div className="userForm">
        <h1>Add Users Details</h1>
        <form>
          {/* Input for user's name */}
          <label htmlFor="">Name :</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          {/* Input for user's email */}
          <label htmlFor="">E-mail :</label>
          <input
            type="email"
            placeholder="Enter email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          {errors.mail && <span className="error">{errors.mail}</span>}

          {/* Input for user's city */}
          <label htmlFor="">City :</label>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          {errors.city && <span className="error">{errors.city}</span>}

          {/* Input for user's company name */}
          <label htmlFor="">Company Name :</label>
          <input
            type="text"
            placeholder="Enter company"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          {errors.company && <span className="error">{errors.company}</span>}

          {/* Button to submit the form */}
          <button className="add-button" onClick={addUser}>
            Add
          </button>

          {/* Button to cancel and close the modal */}
          <button className="close-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default AddModal;
