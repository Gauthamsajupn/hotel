import React, { useEffect, useState } from 'react';
import { Divider, Layout, Space, Tag } from 'antd';

import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../Components/Loader'
import Error from '../Components/Error'
import Swal from 'sweetalert2';
import { Content } from 'antd/es/layout/layout';
function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentuser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className='ml-3 mt-3'>
            <Layout>
            <Content style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Profile' key='1'>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs">
                                <h1>My Profile</h1>
                                <br />
                                <h1>Name: {user.name}</h1>
                                <h1>Email: {user.email}</h1>
                                
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab='Bookings' key='2'>
                    <Mybookings user={user} />
                </TabPane>
            </Tabs>
            </Content>
            </Layout>
        </div>
    );
}

export default Profilescreen;

export function Mybookings({ user }) {
    const [bookings, setBookings] = useState([]);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        console.log('Before axios request');
        const fetchData = async () => {
            try {
                setLoader(true)
                const response = await axios.post('http://localhost:3005/api/bookings/getbookingsbyuserid', { userid: user._id });
                const rooms = response.data;
                setBookings(rooms);
                console.log('Rooms:', rooms);
                setLoader(false)
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoader(false)
                setError(true)
            }
        };
        fetchData();
        console.log('After axios request');
    }, [user]);


    async function Cancelbooking(bookingid, roomid) {
        try {
            setLoader(true)
            const result = await axios.post("/api/bookings/cancelbooking", { bookingid, roomid }).data
            console.log(result)
            setLoader(false)
            Swal.fire("Congrats", "Your Booking has been Cancelled", 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoader(false)
            setError(true)
            Swal.fire("Oops", "Something Went Wrong", "error")

        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loader && (<Loader />)}
                    {bookings.map((booking) => (
                        <div key={booking._id} className='bs'>
                            <h1><b>{booking.room}</b></h1>
                            <p>BookingID :{booking._id}</p>
                            <p><b>CheckIn</b>: {booking.fromdate}</p>
                            <p><b>CheckOut</b>: {booking.todate}</p>
                            <p><b>Amount</b>:{booking.totalamount}</p>
                            <p><b>Status </b>: {booking.status == 'booked' ? (<Tag color="green">CONFIRMED</Tag>) : ( <Tag color="orange">CANCELLED</Tag>)}</p>


                            {booking.status !== "Cancelled" && (
                                <div className='text-right'>
                                    <button className='btn btn-primary' onClick={() => {
                                        Cancelbooking(booking._id, booking.roomid);
                                    }}>CANCEL BOOKING</button>
                                </div>
                            )}

                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
