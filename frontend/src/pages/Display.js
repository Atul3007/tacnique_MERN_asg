import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Display.css";
import AddModal from "../components/AddModal";
import { useData } from "../context/UserData";

function Display() {
  // State variables
  const [userData, setUserData] = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to fetch more user data when scrolling to the bottom
  const fetchData = async () => {
    try {
      if (loading) {
        return;
      }

      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/all-users?_limit=5&_page=${page}`);
      const { data, hasMore } = response.data;

      // Update user data in the context
      setUserData((prevUserData) => [...prevUserData, ...data]);
      setPage((prev) => prev + 1);

      // Remove scroll event listener if there is no more data
      if (!hasMore) {
        window.removeEventListener("scroll", handleInfiniteScroll);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user deletion
  const handleDelete = async (key) => {
    try {
      const confirmed = window.confirm("Confirm delete?");
      if (confirmed) {
        // Make API request to delete user
        await axios.delete(`http://localhost:8080/api/delete-user/${key}`);
        
        // Update user data in the context by filtering out the deleted user
        setUserData((prevUserData) =>
          prevUserData.filter((user) => user._id !== key)
        );
      }
    } catch (error) {
      console.error("Error in deleting:", error);
    }
  };

  // Function to fetch more data when scrolling to the bottom
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchData();
    }
  };  

  // Effect to add and remove scroll event listener for infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  return (
    <div className="display-container">
      <h1 style={{marginLeft:"500px"}}>User Details Dashboard</h1>
      
      {/* Conditional rendering for buttons */}
      {modalOpen ? (
        <button
          className="close-user-button"
          onClick={() => setModalOpen(false)}
        >
          Close
        </button>
      ) : (
        <button className="add-user-button" onClick={() => setModalOpen(true)}>
          Add New User
        </button>
      )}

      {/* Render AddModal component when modalOpen is true */}
      {modalOpen && (
        <AddModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>City</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through userData to display user details */}
          {userData?.map((user, index) => {
            const [firstName, lastName] = user?.name.split(" ");
            return (
              <tr key={user?._id}>
                <td>{index + 1}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user?.email}</td>
                <td>{user?.city}</td>
                <td>{user?.company}</td>
                <td>
                  {/* Link to edit user details */}
                  <Link to={`/edit-user/${user?._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  
                  {/* Button to delete user */}
                  <button
                    className="delete-button"
                    onClick={() => {
                      handleDelete(user?._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Display;
