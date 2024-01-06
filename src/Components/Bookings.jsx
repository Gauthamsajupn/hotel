import React, { useState, useEffect } from 'react';
import { Tabs, Modal } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

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
                                <td>{bookings.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>



            </div>
        </div>
    );


}