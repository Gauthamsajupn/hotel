import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import Loader from '../Components/Loader';
import Error from '../Components/Error';

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Get the navigate function
  const navigate = useNavigate();

  async function Login() {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      const result = response.data;
      setLoading(false);
      localStorage.setItem('currentuser', JSON.stringify(result));

      // Use React Router to navigate to the home page
      navigate('/home');
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
      localStorage.removeItem('currentuser');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 ">
          {error && <Error message="Invalid Credentials" />}
          <div className='bs'>
            <h2>Login</h2>

            <input type="text" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

            <button className='btn btn-primary mt-3' onClick={Login}>Login</button>

            {/* Add the hyperlink under the login button */}
            <p className="mt-2">
              An Admin? <Link to="/signin">Click Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
