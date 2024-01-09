import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

function Addroom() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [maxCount, setMaxCount] = useState('');
  const [description, setDescription] = useState('');
  const [conditioning, setConditioning] = useState('NonAC');
  const [selectedType, setSelectedType] = useState('');
  const [imageurl1, setImageurl1] = useState('');
  const [imageurl2, setImageurl2] = useState('');
  const [imageurl3, setImageurl3] = useState('');
  const [count, setCount] = useState(0); // New state for count
  const [roomTypes, setRoomTypes] = useState([]); // New state for room types

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get('/api/types/getroomtypes'); // Adjust the API endpoint accordingly
        setRoomTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomTypes();
  }, []);

  async function addRoom() {
    const newRoom = {
      name,
      rentperday: rentPerDay,
      maxcount: maxCount,
      description,
      conditioning,
      type: selectedType,
      imageurls: [imageurl1, imageurl2, imageurl3].filter((url) => url),
      count,
      display: true, // Set display directly to true
    };

    console.log(newRoom);

    try {
      setLoader(true);

      const result = await axios.post('/api/rooms/addroom', newRoom);

      console.log(result.data);

      Swal.fire('Congrats', 'New Room Added Successfully', 'success').then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);

      setLoader(false);
      setError(true);

      Swal.fire('Oops', 'Something Went Wrong', 'error');
    }
  }

  return (
    <div className='row'>
      {loader && <Loader />}
      <div className='col-md-5'>
        <div>
          <label htmlFor='name'>Room Name:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Room Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='rentPerDay'>Rent Per Day:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Rent Per Day'
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
          />
        </div>
        <div>
          <label>Maximum Occupancy:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Maiximum Occupancy'
            value={maxCount}
            onChange={(e) => setMaxCount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            className='form-control'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='conditioning'>Conditioning:</label>
          <select
            id='conditioning'
            className='form-control'
            value={conditioning}
            onChange={(e) => setConditioning(e.target.value)}
          >
            <option value='NonAC'>Non-AC</option>
            <option value='AC'>AC</option>
          </select>
        </div>
        <div>
          <label htmlFor='type'>Room Type:</label>
          <select
            id='type'
            className='form-control'
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value='' disabled>
              Select Room Type
            </option>
            {roomTypes
              .filter((type) => type.display !== false) // Filter out room types with display false
              .map((type) => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='col-md-5'>
        <div>
          <label htmlFor='imageurl1'>Image URL 1:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Image URL 1'
            value={imageurl1}
            onChange={(e) => setImageurl1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='imageurl2'>Image URL 2:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Image URL 2'
            value={imageurl2}
            onChange={(e) => setImageurl2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='imageurl3'>Image URL 3:</label>
          <input
            type='text'
            className='form-control'
            placeholder='Image URL 3'
            value={imageurl3}
            onChange={(e) => setImageurl3(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='count'>Available:</label>
          <input
            type='number'
            className='form-control'
            placeholder='Count'
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={addRoom} disabled={loader}>
            {loader ? 'Adding...' : 'Add Room'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
