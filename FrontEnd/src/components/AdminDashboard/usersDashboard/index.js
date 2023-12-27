import axios from "axios";
import React, { useEffect, useState } from "react";

import "./styles.scss";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3002/users/allusers")
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:3002/users/delete/${userId}`)
      .then(() => {
        // User deleted successfully, refresh the user list
        fetchUsers();
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="users-dashboard-container">
      <table>
        <thead>
          <tr>
            <th>_id</th>
            <th>Email</th>
            <th>Password</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.userType}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
