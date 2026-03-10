import React, { useState } from "react";
import axios from "axios";

function SimpleForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/users",
        formData
      );
      if (res.status === 201) {
        alert("Form Submitted!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SimpleForm;