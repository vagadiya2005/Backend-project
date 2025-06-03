const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const addLocationRoutes = require('./routes/addLocationRoutes');
const getLocationHierarchyRoute = require('./routes/getLocationHierarchyRoute');
const deleteLocationRoute = require('./routes/deleteLocationRoute');
const editLocationRoute = require('./routes/editLocationRoute');
const getUserDetailRoute = require('./routes/getUserRoutes');
const deleteUserRoute = require('./routes/deleteUserRoute');
const updateUserRoute = require('./routes/updateUserRoute');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://backend-project-1-lh7s.onrender.com/',
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);   // user routes to save the form
app.use('/api/locations', locationRoutes);   // get location for the registration form
app.use('/api/location', addLocationRoutes);   // add new location
app.use('/api/locations', getLocationHierarchyRoute); // get all city with country and state
app.use('/api/location/delete', deleteLocationRoute); // delete the city in the table view
app.use('/api/location/update',editLocationRoute);     // edit the city in the table view 
app.use('/api',getUserDetailRoute); // get all users details.
app.use('/api/delete',deleteUserRoute); // delete the user
app.use('/api/update',updateUserRoute)  // update the user 
 
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
