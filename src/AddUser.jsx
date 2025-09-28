// import React from "react";

// function AddUser() {
//   return (
//     <div>
//       <h2>Add User</h2>
//       <form>
//         <input type="text" className="form-control mb-2" placeholder="First Name" />
//         <input type="text" className="form-control mb-2" placeholder="Last Name" />
//         <input type="email" className="form-control mb-2" placeholder="Email" />
//         <button className="btn btn-success">Add User</button>
//       </form>
//     </div>
//   );
// }

// export default AddUser;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/users/", { username, email })
      .then(res => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Username</label>
        <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required/>
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <button type="submit" className="btn btn-primary">Add User</button>
    </form>
  );
}

