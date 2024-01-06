import { Button } from 'react-bootstrap';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';

import Logscreen from "./Admin/Logscreen"
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:roomid/:fromdate/:todate/:numberOfPeople" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          
          <Route path="/signin" element={<Logscreen />} />
          <Route path="/profile" element={<Profilescreen/> }/>
          <Route path="/panel" element={<Adminscreen/>}/>
          <Route path="/" element={<Landingscreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
