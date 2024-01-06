import axios from 'axios';
import React, { useState } from 'react';
import Loader from '../Components/Loader';
import Success from '../Components/Success';
import Error from '../Components/Error';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        await axios.post('/api/users/register', user);
        setLoading(false);
        setSuccess(true);

        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    } else {
      alert('Passwords do not Match');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      
      <div className="row justify-content-center mt-5">
      
        <div className="col-md-5 mt-5 ">
        {success && <Success message="Registered successfully" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
