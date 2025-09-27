import React from "react";

function AddUser() {
  return (
    <div>
      <h2>Add User</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="First Name" />
        <input type="text" className="form-control mb-2" placeholder="Last Name" />
        <input type="email" className="form-control mb-2" placeholder="Email" />
        <button className="btn btn-success">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
