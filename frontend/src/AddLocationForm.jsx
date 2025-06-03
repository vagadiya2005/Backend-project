import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addLocationForm.css';

const BASE_URL_GET_LOCATION = 'http://localhost:5000/api/locations';
const BASE_URL_ADD_LOCATION = 'http://localhost:5000/api/location/add';

const AddLocationForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [location, setLocation] = useState({
    country_name: '',
    state_name: '',
    state_country_id: '',
    city_name: '',
    city_state_id: '',
  });


  const loadCountries = () => {
    axios.get(`${BASE_URL_GET_LOCATION}/countries`)
      .then(res => setCountries(res.data))
      .catch(err => console.error('Error loading countries:', err));
  };

  const loadStates = () => {
    if (location.state_country_id) {
      axios.get(`${BASE_URL_GET_LOCATION}/states/${location.state_country_id}`)
        .then(res => setStates(res.data))
        .catch(err => console.error('Error loading states:', err));
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);


  useEffect(() => {
    loadStates();
  }, [location.state_country_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({ ...prev, [name]: value }));
  };

  const addCountry = async () => {
    try {
      await axios.post(`${BASE_URL_ADD_LOCATION}/country`, { 
        country_name: location.country_name 
      });
      alert('Country added!');
      loadCountries(); 
      setLocation(prev => ({ ...prev, country_name: '' })); 
    } catch (err) {
      alert('Error adding country');
    }
  };

  const addState = async () => {
    try {
      await axios.post(`${BASE_URL_ADD_LOCATION}/state`, {
        state_name: location.state_name,
        country_id: location.state_country_id,
      });
      alert('State added!');
      loadStates(); // Refresh the states list
      setLocation(prev => ({ ...prev, state_name: '' })); 
    } catch (err) {
      alert('Error adding state');
    }
  };

  const addCity = async () => {
    try {
      await axios.post(`${BASE_URL_ADD_LOCATION}/city`, {
        city_name: location.city_name,
        state_id: location.city_state_id,
      });
      alert('City added!');
      setLocation(prev => ({ ...prev, city_name: '' })); 
    } catch (err) {
      alert('Error adding city');
    }
  };

  return (
    <div className="add-location-container">
      <div style={{ padding: 20 }}>
        <h2>Add Country</h2>
        <input
          type="text"
          name="country_name"
          placeholder="Country Name"
          value={location.country_name}
          onChange={handleChange}
        />
        <button onClick={addCountry}>Add Country</button>

        <h2>Add State</h2>
        <select 
          name="state_country_id" 
          value={location.state_country_id} 
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.country_id} value={c.country_id}>{c.country_name}</option>
          ))}
        </select>
        <input
          type="text"
          name="state_name"
          placeholder="State Name"
          value={location.state_name}
          onChange={handleChange}
        />
        <button onClick={addState}>Add State</button>

        <h2>Add City</h2>
        <select 
          name="city_state_id" 
          value={location.city_state_id} 
          onChange={handleChange}
        >
          <option value="">Select State</option>
          {states.map(s => (
            <option key={s.state_id} value={s.state_id}>{s.state_name}</option>
          ))}
        </select>
        <input
          type="text"
          name="city_name"
          placeholder="City Name"
          value={location.city_name}
          onChange={handleChange}
        />
        <button onClick={addCity}>Add City</button>
      </div>
    </div>
  );
};

export default AddLocationForm;