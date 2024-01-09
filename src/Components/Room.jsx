import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Room({ room, fromdate, todate, numberOfPeople }) {
  const [show, setShow] = useState(false);
  const [totalRoomCount, setTotalRoomCount] = useState(null);
  const [bookingCount, setBookingCount] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redirectToBookingPage = () => {
    window.location.href = `/book/${room._id}/${fromdate}/${todate}/${numberOfPeople}`;
  };

  const fetchBookingCount = async () => {
    try {
      setLoadingAvailability(true);
  
      // Validate and convert the dates
      const fromDateObj = new Date(fromdate);
      const toDateObj = new Date(todate);
  
      if (isNaN(fromDateObj) || isNaN(toDateObj)) {
        // Handle invalid date format
        console.error('Invalid date format');
        return;
      }
  
      // Send a POST request to get the count of overlapping bookings
      const bookingResponse = await axios.post('http://localhost:3005/api/bookingdetails/getbookingcount', {
        roomName: room.name,
        fromDate: fromDateObj.toISOString(), // Convert to ISO format for consistent date representation
        toDate: toDateObj.toISOString(),
      });
  
      console.log('Booking Count Data:', bookingResponse.data.count);
  
      // Set the booking count in the component state
      setBookingCount(bookingResponse.data.count);
  
      // Get the total room count from the server
      const totalRoomCountResponse = await axios.get(`http://localhost:3005/api/rooms/getroomcount/${room._id}`);
      console.log('Total Room Count Data:', totalRoomCountResponse.data.count);
      setTotalRoomCount(totalRoomCountResponse.data.count);
  
      if (bookingResponse.data.count >= totalRoomCountResponse.data.count) {
        // If the room is fully booked, show an error message
        Swal.fire({
          title: 'Room Not Available',
          text: 'The room is fully booked for the selected dates.',
          icon: 'error',
        }).then(() => {
          // Reload the page
          window.location.reload();
        });
      } else {
        // Do not automatically redirect here; handle it in the button click handler
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoadingAvailability(false);
    }
  };
  
  const handleBookNowClick = async () => {
    try {
      setLoadingAvailability(true);
      // Run the fetchBookingCount function when the "Book Now" button is clicked
      await fetchBookingCount();
  
      // If the room is available, redirect to the booking page
      if (!loadingAvailability && bookingCount !== null && totalRoomCount !== null) {
        if (bookingCount < totalRoomCount) {
          redirectToBookingPage();
        } else {
          // Show an error message if the room is fully booked
          Swal.fire({
            title: 'Room Not Available',
            text: 'The room is fully booked for the selected dates.',
            icon: 'error'
          }).then((result) => {
            // Check if the user clicked on the "OK" button
            
              // Reload the page
              window.location.reload();
            
          });
          
          
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoadingAvailability(false);
    }
  };
   // Empty dependency array means it runs only on mount
  
  if ( room.display <= 0) {
    return null;
  }

  return (
    <div className='row bs'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} className='smallimg' alt="Room Preview" />
      </div>
      <div className="col-md-7 text-left">
        <h1>{room.name}</h1>
        <b>
          <p>Maximum Occupancy: {room.maxcount}</p>
          <p>Conditioning: {room.conditioning}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: 'right' }}>
          {(fromdate && todate) && (
            <Button
              className='btn btn-primary m-2'
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>
          )}
          <Button className='btn btn-primary' onClick={handleShow}>View Details</Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Room Image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
