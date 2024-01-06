import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

function EditRoomType({ typeId }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await axios.get(`/api/types/getroomtype/${typeId}`);
        setType(response.data.type);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchRoomType();
  }, [typeId]);

  const handleUpdateType = async () => {
    try {
      setLoader(true);

      const result = await axios.put(`/api/types/updateroomtype/${typeId}`, { type });

      console.log(result.data);

      Swal.fire('Congrats', 'Room Type Updated Successfully', 'success').then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);

      setLoader(false);
      setError(true);

      Swal.fire('Oops', 'Something Went Wrong', 'error');
    }
  };

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
        <button className='btn btn-primary mt-2' onClick={handleUpdateType} disabled={loader}>
          {loader ? 'Updating...' : 'Update Room Type'}
        </button>
      </div>
    </div>
  );
}

export default EditRoomType;
