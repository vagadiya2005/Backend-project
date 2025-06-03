import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './LocationTable.css';
// import { useLocation } from './LocationContext';
import EditLocationForm from './EditLocationForm';


const BASE_URL = 'http://localhost:5000/api/location/delete';
const GET_LOCATIONS_TREE = "http://localhost:5000/api/locations/hirarchy";




const LocationTable = () => {

  
const [editingData, setEditingData] = useState(null);
const [isEditOpen, setIsEditOpen] = useState(false);

  // const { refreshFlag } = useLocation();

  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${GET_LOCATIONS_TREE}`);
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (cityId) => {
    if (!window.confirm('Are you sure you want to delete this city?')) return;

    try {
      await axios.delete(`${BASE_URL}/city/${cityId}`);
      fetchLocations(); // Refresh after deletion
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

const handleEdit = (countryId, stateId, cityId) => {
  const country = locations.find(c => c.country_id === countryId);
  const state = country.states.find(s => s.state_id === stateId);
  const city = state.cities.find(c => c.city_id === cityId);
  
  setEditingData({
    country_id: countryId,
    country_name: country.country_name,
    state_id: stateId,
    state_name: state.state_name,
    city_id: cityId,
    city_name: city.city_name
  });
  setIsEditOpen(true);
};


  return (
    <div className="location-table-container">
      <h2>Locations</h2>
      <table className="location-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(country => (
            country.states.map(state => (
              state.cities.map(city => (
                <tr key={city.city_id}>
                  <td>{country.country_name}</td>
                  <td>{state.state_name}</td>
                  <td>{city.city_name}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(country.country_id, state.state_id, city.city_id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(city.city_id)}>Delete</button>
                  </td>
                </tr>
              ))
            ))
          ))}
        </tbody>
      </table>
      <EditLocationForm
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      locationData={editingData}
      onSave={fetchLocations}
    />
    </div>
  );
};

export default LocationTable;
