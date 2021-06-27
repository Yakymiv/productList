import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './cardElement.scss';

//One product card component

const CardElement = ({id, name, img, desc, count}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div className='cardElement'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete product</Modal.Title>
        </Modal.Header>
        <Modal.Body>You really wont to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' className='buttonDeleteElement' data-id={id} onClick={handleClose}>
            Delete product
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='cardHeader'>
        <h2>{name}</h2>
        <Link to={`/product/${id}`}>More information</Link>
        <Button variant='outline-danger' className='cardButton' onClick={handleShow}>delete</Button>
      </div>
      <div className='cardBody'>
        <div>
          <img className='cardImg' src={img} alt='IMG'></img>
        </div>
        <div className='cardDesc'>
          <p className='cardDescCount'>Count: {count}</p>
          <p className='cardDescText'>{desc}</p>
       </div>
      </div>
    </div>
  );
}

export default CardElement;