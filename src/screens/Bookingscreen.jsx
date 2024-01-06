import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Bookingscreen = (match) => {
  const { roomid, fromdate, todate,numberOfPeople } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();

  // Replace the existing totaldays calculation
  const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days');
  const totldys = totaldays + 1
  const [totalamount, setTotalamount] = useState()




  useEffect(() => {

    if(!localStorage.getItem('currentuser'))
    {
      window.location.reload='/login'
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        setTotalamount(response.data.rentperday * totldys)
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  async function bookroom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentuser'))._id,
      fromdate, todate,
      totalamount,
      totaldays: totldys
    }

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)

    } catch (error) {

    }
  }

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentuser'))._id,
      fromdate, todate,
      totalamount,
      totaldays: totldys,token
    }

    try {
      setLoading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setLoading(false)
      Swal.fire("Congragulations","Your Room has Been Booked Successfully","success").then(result=>
        [
          window.location.href='/profile'
        ])

    } catch (error) {
      setLoading(false)
      Swal.fire('Oops',"something went wrong","error")
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <h1 className='text-center'><Loader /></h1>
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' alt={room.name} />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Booking Details</h1>
                  <hr />
                  <p>Name:{JSON.parse(localStorage.getItem('currentuser')).name}</p>
                  <p>From:{fromdate}</p>
                  <p>To:{todate}</p>
                  <p>Guest Count: {numberOfPeople} </p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount:</h1>
                  <hr />
                  <p>Total days: {totldys}</p>

                  <p>Rent per day:{room.rentperday}</p>
                  <p>Total Amount:{totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>

                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency='INR'
                  stripeKey=
                  "pk_test_51OJAnCSFlsOEfvLRZOwvAcP39mGXnJYZDmmBCCKhoSXyXY3h13rGu36ywgXC6uV0K3BnaP6inwC9Tog9Awq9JbiT00gWNkzbXg"
                >
                  <button className='btn btn-primary' >Pay Now</button>
                </StripeCheckout>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookingscreen;
