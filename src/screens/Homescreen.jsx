
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Room from '../Components/Room';
import Loader from '../Components/Loader';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState(null);
  const [todate, setTodate] = useState(null);
  const [duplicaterooms, setDuplicaterooms] = useState([]);
  const [searchkey, setSearchkey] = useState('');
  const [type, setType] = useState('all');
  const [conditioningFilter, setConditioningFilter] = useState('all');
  const [roomTypes, setRoomTypes] = useState([]);
  const [acNonAcFilter, setAcNonAcFilter] = useState('all');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const user = JSON.parse(localStorage.getItem('currentuser'));

  if (!user) {
    window.location.href = '/login';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const roomData = (await axios.get('/api/rooms/getallrooms')).data;
        const typeData = (await axios.get('/api/types/getroomtypes')).data;

        setRooms(roomData);
        setDuplicaterooms(roomData);
        setLoading(false);
        setRoomTypes(typeData);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromdate(dates[0].format('DD-MM-YYYY'));
    setTodate(dates[1].format('DD-MM-YYYY'));

    // Remove the filtering logic, and set the rooms directly
    setRooms(duplicaterooms);
  }

  function filterBySearch() {
    const tempRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setRooms(tempRooms);
  }

  function filterByType(selectedType) {
    setType(selectedType);

    if (selectedType.toLowerCase() !== 'all') {
      const tempRooms = duplicaterooms.filter((room) => room.type.toLowerCase() === selectedType.toLowerCase());
      setRooms(tempRooms);
    } else {
      // Handle the case when 'all' is selected
      setRooms(duplicaterooms);
    }
  }

  function filterByConditioning(selectedConditioning) {
    setConditioningFilter(selectedConditioning);

    if (type.toLowerCase() !== 'all') {
      const tempRooms = duplicaterooms.filter((room) => {
        const typeMatch = room.type.toLowerCase() === type.toLowerCase();
        const acNonAcMatch = acNonAcFilter === 'all' || room.ac === (acNonAcFilter === 'ac');
        const conditioningMatch =
          selectedConditioning === 'all' || room.conditioning.toLowerCase() === selectedConditioning.toLowerCase();
        const numberOfPeopleMatch = room.maxcount >= numberOfPeople;

        return typeMatch && acNonAcMatch && conditioningMatch && numberOfPeopleMatch;
      });
      setRooms(tempRooms);
    } else {
      const tempRooms = duplicaterooms.filter((room) => {
        const acNonAcMatch = acNonAcFilter === 'all' || room.ac === (acNonAcFilter === 'ac');
        const conditioningMatch =
          selectedConditioning === 'all' || room.conditioning.toLowerCase() === selectedConditioning.toLowerCase();
        const numberOfPeopleMatch = room.maxcount >= numberOfPeople;

        return acNonAcMatch && conditioningMatch && numberOfPeopleMatch;
      });
      setRooms(tempRooms);
    }
  }

  function filterByNumberOfPeople(selectedNumberOfPeople) {
    setNumberOfPeople(selectedNumberOfPeople);

    const tempRooms = duplicaterooms.filter((room) => {
      const typeMatch = type.toLowerCase() === 'all' || room.type.toLowerCase() === type.toLowerCase();
      const acNonAcMatch = acNonAcFilter === 'all' || room.ac === (acNonAcFilter === 'ac');
      const conditioningMatch =
        conditioningFilter.toLowerCase() === 'all' || room.conditioning.toLowerCase() === conditioningFilter.toLowerCase();
      const numberOfPeopleMatch = room.maxcount >= selectedNumberOfPeople;

      return typeMatch && acNonAcMatch && conditioningMatch && numberOfPeopleMatch;
    });

    setRooms(tempRooms);
  }

  return (
    <div className='container text-center'>
      <div className='row mt-5 bs'>
        <div className='col-md-4'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search Rooms'
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-2'>
          <select className='form-control' value={type} onChange={(e) => filterByType(e.target.value)}>
            <option value='all'>All</option>
            {roomTypes.map((roomType) => (
              <option key={roomType._id} value={roomType.type}>
                {roomType.type}
              </option>
            ))}
          </select>
        </div>
        <div className='col-md-2'>
          <select
            className='form-control'
            value={conditioningFilter}
            onChange={(e) => filterByConditioning(e.target.value)}
          >
            <option value='all'>All Conditioning</option>
            <option value='ac'>AC</option>
            <option value='nonac'>Non-AC</option>
          </select>
        </div>
        <div className='col-md-1'>
          <label htmlFor='numberOfPeople'>No. of People</label>
          <input
            type='number'
            id='numberOfPeople'
            className='form-control'
            value={numberOfPeople}
            onChange={(e) => filterByNumberOfPeople(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className='col-md-9 mt-2' key={room._id}>
              <Room room={room} fromdate={fromdate} todate={todate} numberOfPeople={numberOfPeople} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homescreen;