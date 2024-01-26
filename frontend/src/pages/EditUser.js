import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/Modal.css";
import { useData } from "../context/UserData";

function EditUser() {
  // Navigation hook from React Router
  const navigate = useNavigate();

  // State variables for user details and validation errors
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [userData, setUserData] = useData();
  const [errors, setErrors] = useState({});

  // Extracting id from the route parameters
  const { id } = useParams();

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    // Simple validation example, you can customize this according to your needs
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

    setErrors(newErrors);

    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Function to fetch user data by id
  const getDataById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/by-id/${id}`);
      setName(data.data.name);
      setCity(data.data.city);
      setCompany(data.data.company);
      setMail(data.data.email);
    } catch (error) {
      console.log("error in fetching data");
    }
  };

  // Function to handle user update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const obj = { name, city, mail, company };
        const { data } = await axios.patch(
          `http://localhost:8080/api/edit-user/${id}`,
          obj
        );
        window.alert(data.msg);
        setUserData(data.result);
        navigate("/");
      } else {
        console.log("Form validation failed");
      }
    } catch (error) {
      console.log("error in updating!!!");
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getDataById(id);
  }, []);

  return (
    <div style={{ marginTop: "50px", marginLeft: "500px", width: "400px" }}>
      <form>
        <h1>Edit User Details</h1>
        {/* Input fields for user details */}
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="mail">E-mail :</label>
        <input
          type="email"
          id="mail"
          placeholder="Enter email"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        {errors.mail && <span className="error">{errors.mail}</span>}

        <label htmlFor="city">City :</label>
        <input
          type="text"
          id="city"
          placeholder="Enter city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <label htmlFor="company">Company Name :</label>
        <input
          type="text"
          id="company"
          placeholder="Enter company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        {errors.company && <span className="error">{errors.company}</span>}

        {/* Buttons for update and cancel actions */}
        <button className="add-button" onClick={handleUpdate}>
          Update
        </button>
        <Link to="/">
          <button className="close-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default EditUser;
