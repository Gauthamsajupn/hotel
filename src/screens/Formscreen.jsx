
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

function AddTypeForm() {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [type, setType] = useState('');
  
    async function addType() {
      try {
        setLoader(true);
    
        // Set the display field to true
        const result = await axios.post('/api/types/addroomtype', { type, display: true });
    
        console.log(result.data);
    
        // Show a success message using Swal
        Swal.fire("Congrats", "Room Type Added Successfully", "success").then(result => {
          window.location.reload();
        });
    
        // Handle success, e.g., show a success message or redirect
      } catch (error) {
        console.error(error);
    
        // Check for a specific error condition related to duplicate values
        if (error.response && error.response.status === 400 && error.response.data.message === 'Duplicate room type') {
          Swal.fire("Oops", "Duplicate Room Type. Please enter a unique value.", "error");
        } else {
          // Show a general error message using Swal
          Swal.fire("Oops", "Something Went Wrong", "error");
        }
    
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    
    return (
      <div className='row'>
        {loader && <Loader />}
        <div className='col-md-5'>
          <input
            type='text'
            className='form-control'
            placeholder='Room Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <br />
          <button className='btn btn-primary mt-2' onClick={addType} disabled={loader}>
            {loader ? 'Adding...' : 'Add Room Type'}
          </button>
        </div>
        
      </div>
    );
    }
  
  export default AddTypeForm;
  