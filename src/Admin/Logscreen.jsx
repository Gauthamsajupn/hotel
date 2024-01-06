import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loader from '../Components/Loader';
import Error from '../Components/Error';

function Logscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Get the navigate function
    const navigate = useNavigate();

    async function Login() {
        const user = {
            email,
            password
        };

        try {
            setLoading(true);
            const response = await axios.post('/api/admin/signin', user);
            const result = response.data;
            setLoading(false);
            localStorage.setItem('currentadmin', JSON.stringify(result));

            // Use React Router to navigate to the home page
            navigate('/panel');
        } catch (err) {
            console.error(err);
            setLoading(false);
            setError(true);
            localStorage.removeItem('currentadmin');
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

                        <input type="text" className='form-control' value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} placeholder='Email' />
                        <input type="password" className='form-control' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} placeholder='Password' />

                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logscreen;
