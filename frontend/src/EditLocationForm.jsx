import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditLocationForm.css';

const EditLocationForm = ({ isOpen, onClose, locationData, onSave }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch hierarchy
  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/locations/hirarchy');
        setCountries(res.data);
      } catch (err) {
        console.error('Error fetching hierarchy', err);
      }
    };
    fetchHierarchy();
  }, []);

  // Set selected data on edit open
  useEffect(() => {
    if (locationData && isOpen) {
      setSelectedCountry(locationData.country_id);
      setSelectedState(locationData.state_id);
      setSelectedCity(locationData.city_id);
    }
  }, [locationData, isOpen]);

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const found = countries.find(c => c.country_id === selectedCountry);
      setStates(found ? found.states : []);
      setSelectedState(null);
      setSelectedCity(null);
      setCities([]);
    }
  }, [selectedCountry, countries]);

  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      const foundState = states.find(s => s.state_id === selectedState);
      setCities(foundState ? foundState.cities : []);
      setSelectedCity(null);
    }
  }, [selectedState, states]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/location/country/${locationData.country_id}`, {
        country_name: countries.find(c => c.country_id === selectedCountry)?.country_name || ''
      });
      await axios.put(`http://localhost:5000/api/location/state/${locationData.state_id}`, {
        state_name: states.find(s => s.state_id === selectedState)?.state_name || ''
      });
      await axios.put(`http://localhost:5000/api/location/city/${locationData.city_id}`, {
        city_name: cities.find(c => c.city_id === selectedCity)?.city_name || ''
      });

      onSave();  // Refresh the table
      onClose(); // Close the form
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update location');
    }
  };

  if (!isOpen || !locationData) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-form-container">
        <h2>Edit Location</h2>
        <form onSubmit={handleSubmit}>
          <label>Country</label>
          <select value={selectedCountry || ''} onChange={(e) => setSelectedCountry(parseInt(e.target.value))} required>
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.country_id} value={c.country_id}>{c.country_name}</option>
            ))}
          </select>

          <label>State</label>
          <select value={selectedState || ''} onChange={(e) => setSelectedState(parseInt(e.target.value))} required>
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.state_id} value={s.state_id}>{s.state_name}</option>
            ))}
          </select>

          <label>City</label>
          <select value={selectedCity || ''} onChange={(e) => setSelectedCity(parseInt(e.target.value))} required>
            <option value="">Select City</option>
            {cities.map(ci => (
              <option key={ci.city_id} value={ci.city_id}>{ci.city_name}</option>
            ))}
          </select>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationForm;
