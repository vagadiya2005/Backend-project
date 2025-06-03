// UserTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userTable.css";
import "./message.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    f_name: "",
    l_name: "",
    phone_no: "",
    isd_code: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pan_no: "",
    gst_no: "",
  });
  const [message, setMessage] = useState("");

  // update once
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  // fetch users for display in the table
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://backend-project-m6p9.onrender.com/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // for location drop down menu where change the details of users
  const fetchLocations = async () => {
    try {
      const res = await axios.get(
        "https://backend-project-m6p9.onrender.com/api/locations/hirarchy"
      );
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.user_id);
    setFormData({
      user_id: user.user_id,
      f_name: user.f_name,
      l_name: user.l_name,
      country_id: user.country_id,
      state_id: user.state_id,
      city_id: user.city_id,
      phone_no: user.phone_no,
      isd_code: user.isd_code,
      pan_no: user.pan_no,
      gst_no: user.gst_no,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://backend-project-m6p9.onrender.com/api/update/user/${editingUser}`,
        formData
      );
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`https://backend-project-m6p9.onrender.com/api/delete/user/${id}`);
      setMessage("User Deleted successfully!");
      fetchUsers();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete user:", err);
      setMessage("Failed to delete user");
    }
  };

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      {message && <div className="alert alert-success">{message}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone No.</th>
            <th>ISD Code</th>
            <th>PAN No.</th>
            <th>GST No.</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.f_name}</td>
              <td>{user.l_name}</td>
              <td>{user.phone_no}</td>
              <td>{user.isd_code}</td>
              <td>{user.pan_no}</td>
              <td>{user.gst_no}</td>
              <td>{user.country_name}</td>
              <td>{user.state_name}</td>
              <td>{user.city_name}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-user-form">
          <h3></h3>
          <input
            type="text"
            placeholder="First Name"
            value={formData.f_name}
            onChange={(e) =>
              setFormData({ ...formData, f_name: e.target.value })
            }
          />

            <input
            type="text"
            placeholder="Last Name"
            value={formData.l_name}
            onChange={(e) =>
              setFormData({ ...formData, l_ngeame: e.tart.value })
            }
          />


            <input
            type="number"
            placeholder="ISD code"
            value={formData.isd_code}
            onChange={(e) =>
              setFormData({ ...formData, isd_code: e.target.value })  
            }
          />

          <input
            type="tel"
            placeholder="Phone no"
            value={formData.phone_no}
            onChange={(e) =>
              setFormData({ ...formData, phone_no: e.target.value })  
            }
          />

          <select
            value={formData.country_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                country_id: e.target.value,
                state_id: "",
                city_id: "",
              })
            }
          >
            <option value="">Select Country</option>
            {locations.map((country) => (
              <option key={country.country_id} value={country.country_id}>
                {country.country_name}
              </option>
            ))}
          </select>

          <select
            value={formData.state_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                state_id: e.target.value,
                city_id: "",
              })
            }
          >
            <option value="">Select State</option>
            {locations
              .find((c) => c.country_id === parseInt(formData.country_id))
              ?.states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
          </select>

          <select
            value={formData.city_id}
            onChange={(e) =>
              setFormData({ ...formData, city_id: e.target.value })
            }
          >
            <option value="">Select City</option>
            {locations
              .find((c) => c.country_id === parseInt(formData.country_id))
              ?.states.find((s) => s.state_id === parseInt(formData.state_id))
              ?.cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.city_name}
                </option>
              ))}
          </select>

          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
