import React, { useState } from 'react';
import { Button, Carousel, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate ,numberOfPeople}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Check if the room count is greater than 0
  if (room.count <= 0 || room.display <=0) {
    return null; // Do not render the component if count is 0 or negative
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
            <Link to={`/book/${room._id}/${fromdate}/${todate}/${numberOfPeople}`}>
              <Button className='btn btn-primary m-2'>Book Now</Button>
            </Link>
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
