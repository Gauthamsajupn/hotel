import React, { useState, useEffect } from 'react';
import { Tabs, Modal, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

import Loader from '../Components/Loader';
import EditRoom from '../Components/Editroom';
import AddRoomTypeForm from './Formscreen';
import Addroom from '../Components/Addroom';


import EditRoomType from '../Components/Edittype';

const { TabPane } = Tabs;

function Adminscreen() {
  const admin = JSON.parse(localStorage.getItem('currentadmin'));
  if(!admin)
  {
    window.location.href='/signin'
  }
  const [visible, setVisible] = useState(false);
  const [roomId, setRoomId] = useState('');
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const renderWelcomeMessage = () => {
    return (
      <div className='welcome-container'>
        <h1 className='welcome-message'>Welcome to Emirates Hotel</h1>
        <p className='welcome-message'>
          Manage rooms, bookings, and user profiles to ensure a seamless experience for our guests.
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className='ml-5 mt-3 mr-5 mb-5 bsx'>
        <h2 className='text-center' style={{ fontSize: '30px' }}>
          <b>Admin Panel</b>
        </h2>
        <Tabs defaultActiveKey='1' tabPosition='left'>
        <TabPane tab='Admin' key='1'>
            
        {renderWelcomeMessage()}
         </TabPane>
          <TabPane tab='Bookings' key='2'>
            
             <Bookings /> 
          </TabPane>
          <TabPane tab='Rooms' key='3'>
            
             <Rooms /> 
          </TabPane>
          <TabPane tab='Add Room' key='4'>
            
             <Addroom/> 
          </TabPane>
          <TabPane tab='Users' key='5'>
            
             <Users /> 
          </TabPane>
          
          <TabPane tab='Add type' key='6'>
            
            < AddRoomTypeForm/> 
         </TabPane>

  <TabPane tab='Types' key='7'>
            
            < RoomTypes/> 
         </TabPane>
         
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;

//bookings list compnent


//rooms list component
export function RoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/types/getroomtypes');
      setRoomTypes(response.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditType = (typeId) => {
    setVisible(true);
    setSelectedTypeId(typeId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedTypeId('');
  };

  const handleActivateType = async (typeId) => {
    try {
      // Set loader to true before making the request
      setLoader(true);
  
      await axios.put(`/api/types/handleactivate/${typeId}`, { display: true });
      fetchData();
  
      // Set loader to false after the request is completed
      setLoader(false);
  
      Swal.fire("Success", "Room type activated successfully", "success");
      setLoader(true);
      window.location.reload();
      setLoader(false)
    } catch (error) {
      console.error(error);
      
      // Set loader to false in case of an error
      setLoader(false);
  
      Swal.fire("Error", "Failed to activate room type", "error");
    }
  };
  const handleDeactivateType = async (typeId) => {
    try {
      // Set loader to true before making the request
      setLoader(true);
  
      await axios.put(`/api/types/handledeactivate/${typeId}`, { display: false });
      fetchData();
  
      // Set loader to false after the request is completed
      setLoader(false);
  
      Swal.fire("Success", "Room type deactivated successfully", "success");
      window.location.reload();
    } catch (error) {
      console.error(error);
  
      // Set loader to false in case of an error
      setLoader(false);
  
      Swal.fire("Error", "Failed to deactivate room type", "error");
    }
  };
  
  return (
    <div className="row">
      <div className="col-md-12">
        {loader && <Loader />}
        <h1>Room Types</h1>
        <table className='table table-border table-dark'>
          <thead className='bs'>
            <tr>
              <th>Type ID</th>
              <th>Type Name</th>
              <th>Display</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.length > 0 ? (
              roomTypes.map((type, index) => (
                <tr key={index}>
                  <td>{type._id}</td>
                  <td>{type.type}</td>
                  <td>
                    {type.display ? (
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDeactivateType(type._id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className='btn btn-success'
                        onClick={() => handleActivateType(type._id)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      type='primary'
                      className='btn btn-primary ml-2'
                      onClick={() => handleEditType(type._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No room types available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* EditTypeForm Modal */}
        <Modal
          title='Edit Room Type'
          visible={visible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <EditRoomType
            typeId={selectedTypeId}
            onCancel={handleModalCancel}
          />
        </Modal>
      </div>
    </div>
  );
}




export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch("/api/rooms/getallrooms");
      const data = await response.json();
      setRooms(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditRoom = (roomId) => {
    setVisible(true);
    setSelectedRoomId(roomId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedRoomId('');
  };

  const handleActivateRoom = async (roomId) => {
    try {
      await axios.put(`/api/rooms/handleactivate/${roomId}`, { display: true });
      fetchData();
      Swal.fire("Success", "Room activated successfully", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to activate room", "error");
    }
  };

  const handleDeactivateRoom = async (roomId) => {
    try {
      await axios.put(`/api/rooms/handledeactivate/${roomId}`, { display: false });
      fetchData();
      Swal.fire("Success", "Room deactivated successfully", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to deactivate room", "error");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        {loader && <Loader />}
        <h1>Rooms</h1>
        <table className='table table-border table-dark'>
          <thead className='bs'>
            <tr>
              <th>RoomID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Maximum Occupancy</th>
              <th>Conditioning</th>
              <th>Available</th>
              <th>Display</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.conditioning}</td>
                  <td>{room.count}</td>
                  <td>
                    {room.display ? (
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDeactivateRoom(room._id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className='btn btn-success'
                        onClick={() => handleActivateRoom(room._id)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className='btn btn-primary ml-2'
                      onClick={() => handleEditRoom(room._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No rooms available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* EditRoom Modal */}
        <Modal
          title='Edit Room'
          visible={visible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <EditRoom roomId={selectedRoomId} />
        </Modal>
      </div>
    </div>
  );
}

//users list component
export function Users() {
    const [users, setUsers] = useState([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/users/getallusers");
                const data = await response.json();
                setUsers(data);
                setLoader(false);
            } catch (error) {
                console.error(error);
                setLoader(false);
                setError(true);
            }
        };
        fetchData()
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                {loader && <Loader />}
                <h1>Users</h1>


                <table className='table table-dark table-border'>

                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>UserName</th>
                            <th>UserEmail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        }))}
                    </tbody>

                </table>
            </div>
        </div>
    )

}

export function renderWelcomeMessage()  {
  return (
    <div className='welcome-container'>
    <h1 className='welcome-message'>Welcome to Emirates Hotel</h1>
    <p className='welcome-message'>
      Manage rooms, bookings, and user profiles to ensure a seamless experience for our guests.
    </p>
  </div>
  );
};


export function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)


  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch("/api/bookings/getallbookings");
              const data = await response.json();
              setBookings(data);
              setLoader(false);
          } catch (error) {
              console.error(error);
              setLoader(false);
              setError(true);
          }
      };
      fetchData()
  }, []);

  return (
      <div className="row">
          <div className="col-md-12">
              {loader && (<Loader />)}
              <h1>Bookings</h1>
              <table className='table table-border table-dark'>
                  <thead className='bs'>
                      <tr>
                          <th>BookigID</th>
                          <th>UserID</th>
                          <th>Room</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {bookings.length && (bookings.map(bookings => {
                          return <tr>
                              <td>{bookings._id}</td>
                              <td>{bookings.userid}</td>
                              <td>{bookings.room}</td>
                              <td>{bookings.fromdate}</td>
                              <td>{bookings.todate}</td>
                              <td>{bookings.status === 'booked' ? 'Confirmed' : bookings.status}</td>
                          </tr>
                      }))}
                  </tbody>
              </table>



          </div>
      </div>
  );


}