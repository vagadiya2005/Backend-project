import logo from './logo.svg';
import './App.css';
import './UserForm';
import UserForm from './UserForm';
import AddLocationForm from './AddLocationForm';
import LocationTable from './LocationTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import UserTable from './userTable';
// import { LocationProvider } from './LocationContext';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar/>      
         <Routes>

        <Route path="/userForm" element={<UserForm/>} />
        <Route path="/addLocation" element={<AddLocationForm/>} />
        <Route path="/table" element={<LocationTable />} />
        <Route path="/users" element={<UserTable />} />

        
        


      </Routes>
    

      </Router>
      {/* <UserForm></UserForm>
      <AddLocationForm></AddLocationForm>
      <LocationTable></LocationTable> */}

      
    </div>
  );
}

export default App;
