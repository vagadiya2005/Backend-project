// import React, { createContext, useContext, useState } from 'react';

// const LocationContext = createContext();

// export const useLocation = () => useContext(LocationContext);

// export const LocationProvider = ({ children }) => {
//   const [locations, setLocations] = useState([]);
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   const fetchLocations = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/locations/hirarchy');
//       const data = await res.json();
//       setLocations(data);
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     }
//   };

//   const refreshLocations = () => {
//     setRefreshFlag(prev => !prev); // Toggle flag to notify other components
//   };

//   return (
//     <LocationContext.Provider value={{ locations, fetchLocations, refreshLocations, refreshFlag }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };
