import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserForm.css';

const BASE_URL = "https://backend-project-m6p9.onrender.com/api";

const UserForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    phone_no: "",
    isd_no: "",
    pan_number: "",
    gst_number: "",
    country_id: "",
    state_id: "",
    city_id: "",
  });

  if (formData.pan_number.length > 10) {
    window.alert("PAN number must be 10 character.");
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/locations/countries`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Failed to load countries:", err));
  }, []);

  useEffect(() => {
    if (formData.country_id) {
      axios
        .get(`${BASE_URL}/locations/states/${formData.country_id}`)
        .then((res) => setStates(res.data))
        .catch((err) => console.error("Failed to load states:", err));
    }
  }, [formData.country_id]);

  useEffect(() => {
    if (formData.state_id) {
      axios
        .get(`${BASE_URL}/locations/cities/${formData.state_id}`)
        .then((res) => setCities(res.data))
        .catch((err) => console.error("Failed to load cities:", err));
    }
  }, [formData.state_id]);

  // validation of PAN and GST
  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase();

    // PAN no. validation
    if (name === "pan_number") {
      const panRegex = /^[A-Z]{3}[PCHFAZTBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
      const lastNameInitial = formData.l_name.trim().charAt(0).toUpperCase();

      if (upperValue.length > 10) {
        alert("PAN number must be exactly 10 characters.");
        setFormData((prev) => ({ ...prev, [name]: upperValue.slice(0, 10) }));
        return;
      }

      if (upperValue.length === 10) {
        if (!panRegex.test(upperValue)) {
          alert("Invalid PAN format. Example: AAAPA1234A");
          return;
        }

        if (upperValue[4] !== lastNameInitial) {
          alert(
            `The 5th character of the PAN must match the first letter of the last name: "${lastNameInitial}"`
          );
          return;
        }
      }

      setFormData((prev) => ({ ...prev, [name]: upperValue }));
      return;
    }

    //GST Validation
    if (name === "gst_number") {
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}[1-9A-Z]{1}$/;
      const pan = formData.pan_number.toUpperCase();

      const stateCode = parseInt(upperValue.substring(0, 2), 10);
      if (stateCode < 1 || stateCode > 35) {
        alert("Invalid state code in GST number (must be between 01 and 35).");
        return;
      }

      if (upperValue.length > 15) {
        alert("GST number must be exactly 15 characters.");
        return;
      }

      if (upperValue.length > 15) {
        // Check GST format
        if (!gstRegex.test(upperValue)) {
          alert("Invalid GST format. Example: 27AAAPA1234A1Z5");
          return;
        }

        // Check if PAN matches
        const panInGst = upperValue.substring(2, 12);
        if (panInGst !== pan) {
          alert(
            "GST number must contain the entered PAN number from 3rd to 12th character."
          );
          return;
        }

        // Check 14th character is 'Z'
        if (upperValue.charAt(13) !== "Z") {
          alert("The 14th character of GST number must be 'Z'.");
          return;
        }
      }

      setFormData((prev) => ({ ...prev, [name]: upperValue }));
      return;
    }

    // Normal change for other fields
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // PAN validation
      const valUpper = formData.pan_number.toUpperCase();
      const panRegex = /^[A-Z]{3}[PCHFAZTBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
      const lastNameInitial = formData.l_name.trim().charAt(0).toUpperCase();

      if (valUpper.length > 10) {
        alert("PAN number must be exactly 10 characters.");
        return;
      }

      if (valUpper.length === 10) {
        if (!panRegex.test(valUpper)) {
          alert("Invalid PAN format. Example: AAAPA1234A");
          return;
        }

        if (valUpper[4] !== lastNameInitial) {
          alert(
            `The 5th character of the PAN must match the first letter of the last name: "${lastNameInitial}"`
          );
          return;
        }
      }

      if (valUpper.length < 10) {
        alert("PAN number must be exactly 10 characters.");
        return;
      }

      // GST validation

      const gst_upper = formData.gst_number.toUpperCase();
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}[1-9A-Z]{1}$/;
      const pan = formData.pan_number.toUpperCase();

      if (gst_upper.length > 15) {
        alert("GST number must be exactly 15 characters.");
        return;
      }

      if (gst_upper.length < 15) {
        alert("GST number must be exactly 15 characters.");
      } else {
        const stateCode = parseInt(gst_upper.substring(0, 2), 10);
        if (stateCode < 1 || stateCode > 35) {
          alert(
            "Invalid state code in GST number (must be between 01 and 35)."
          );
          return;
        }

        // Check if PAN matches
        const panInGst = gst_upper.substring(2, 12);
        if (panInGst !== pan) {
          alert(
            "GST number must contain the entered PAN number from 3rd to 12th character."
          );
          return;
        }

        // Check 14th character is 'Z'
        if (gst_upper.charAt(13) !== "Z") {
          alert("The 14th character of GST number must be 'Z'.");
          return;
        }
      }

      const response = await axios.post(`${BASE_URL}/users`, formData);
      // alert("User created successfully! ID: " + response.data.user_id);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <input
        type="text"
        name="f_name"
        placeholder="First Name"
        value={formData.f_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="l_name"
        placeholder="Last Name"
        value={formData.l_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_no"
        placeholder="Phone No"
        value={formData.phone_no}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="isd_no"
        placeholder="ISD Code"
        value={formData.isd_no}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pan_number"
        placeholder="PAN Number"
        value={formData.pan_number}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gst_number"
        placeholder="GST Number"
        value={formData.gst_number}
        onChange={handleChange}
        required
      />

      <select
        name="country_id"
        value={formData.country_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.country_id} value={c.country_id}>
            {c.country_name}
          </option>
        ))}
      </select>

      <select
        name="state_id"
        value={formData.state_id}
        onChange={handleChange}
        required
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.state_id} value={s.state_id}>
            {s.state_name}
          </option>
        ))}
      </select>

      <select
        name="city_id"
        value={formData.city_id}
        onChange={handleChange}
        required
      >
        <option value="">Select City</option>
        {cities.map((ci) => (
          <option key={ci.city_id} value={ci.city_id}>
            {ci.city_name}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
