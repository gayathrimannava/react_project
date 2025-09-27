import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const API_ROOT = "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetch(`${API_ROOT}/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Registered Users</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Superuser</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_superuser ? "Yes" : "No"}</td>
              <td>{new Date(user.date_joined).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
