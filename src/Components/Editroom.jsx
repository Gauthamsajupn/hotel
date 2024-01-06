import React, { useEffect, useState } from 'react';
import { Input, Button, Select } from 'antd';
import axios from 'axios';
import Loader from './Loader';
import Swal from 'sweetalert2';

const { Option } = Select;

function EditRoom({ roomId }) {
  const [loader, setLoader] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    name: '',
    rentperday: '',
    maxcount: '',
    description: '',
    conditioning: '',
    type: '',
    imageurls: ['', '', ''],
    count: 0, // Added count field
  });
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/rooms/getroombyid', {
          roomid: roomId,
        });
        setRoomDetails(response.data);

        const typesResponse = await axios.get('/api/types/getroomtypes');
        setRoomTypes(typesResponse.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, [roomId]);

  const handleUpdateRoom = async () => {
    try {
      setLoader(true);

      const response = await axios.put(`/api/rooms/updateroom/${roomId}`, {
        ...roomDetails,
      });

      console.log(response.data);
      setLoader(false);
      Swal.fire({
        icon: 'success',
        title: 'Room Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      setLoader(false);
      // Handle error
    }
  };

  const handleImageChange = (e, index) => {
    const newImageUrls = [...roomDetails.imageurls];
    newImageUrls[index] = e.target.value;

    setRoomDetails({
      ...roomDetails,
      imageurls: newImageUrls,
    });
  };

  const handleInputChange = (e, key) => {
    setRoomDetails({
      ...roomDetails,
      [key]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Room</h2>
      <label>Room Name:</label>
      <Input
        placeholder='Room Name'
        value={roomDetails.name}
        onChange={(e) => handleInputChange(e, 'name')}
      />

      <label>Rent Per Day:</label>
      <Input
        placeholder='Rent Per Day'
        value={roomDetails.rentperday}
        onChange={(e) => handleInputChange(e, 'rentperday')}
      />

      <label>Maximum Occupancy:</label>
      <Input
        placeholder='Max Count'
        value={roomDetails.maxcount}
        onChange={(e) => handleInputChange(e, 'maxcount')}
      />

      <label>Description:</label>
      <Input
        placeholder='Description'
        value={roomDetails.description}
        onChange={(e) => handleInputChange(e, 'description')}
      />

      <label>Conditioning:</label>
      <Select
        className='select-box'
        placeholder='Select Conditioning'
        value={roomDetails.conditioning}
        onChange={(value) => handleInputChange({ target: { value } }, 'conditioning')}
      >
        <Option value='AC'>AC</Option>
        <Option value='NonAC'>Non-AC</Option>
      </Select>

      <label>Room Type:</label>
      <Select
        className='select-box'
        placeholder='Select Room Type'
        value={roomDetails.type}
        onChange={(value) => handleInputChange({ target: { value } }, 'type')}
      >
        {roomTypes.map((type) => (
          <Option key={type._id} value={type.type}>
            {type.type}
          </Option>
        ))}
      </Select>

      <label>Available:</label>
      <Input
        placeholder='Count'
        value={roomDetails.count}
        onChange={(e) => handleInputChange(e, 'count')}
      />

      {[0, 1, 2].map((index) => (
        <div key={index}>
          <label>{`Image URL ${index + 1}:`}</label>
          <Input
            placeholder={`Image URL ${index + 1}`}
            value={roomDetails.imageurls[index]}
            onChange={(e) => handleImageChange(e, index)}
          />
        </div>
      ))}

      <Button type='primary' className='mt-3' onClick={handleUpdateRoom}>
        Update Room
      </Button>
      {loader && <Loader />}
    </div>
  );
}

export default EditRoom;
