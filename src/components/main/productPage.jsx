import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';

import ProductChangeModal from './productChangeModal';
import ProductComments from './productComments';
import './productPage.scss';

import db from '../../firebase';

//Component that get one product from firebase

const ProductPage = () => {

  const [fruit, setFruit] = useState('');
  const [modalShow, setModalShow] = useState(false);

  //Get id from URL.
  const location = useLocation();
  const id = location.pathname.replace('/product/', '');

  //Get one product from firebase. Use product id for it.
  useEffect(() => {
    var docRef = db.collection('fruits').doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setFruit(doc.data());
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document: ', error);
    })
  }, [id])

  return(
    <div className='productPage'>
      <ProductChangeModal setFruit={setFruit} fruit={fruit} id={id} show={modalShow} onHide={() => setModalShow(false)}/>
      <div className='productPageTopLine'>
        <Row>
          <Col>
            <h1 className='productPageEditTitle'>{fruit.name}</h1>
          </Col>
          <Col className='productPageEditButton'>
            <Button variant='primary' onClick={() => setModalShow(true)}>Edit</Button>
          </Col>
        </Row>
      </div>
      <div className='productPageImageWrapper'>
        <img className='productPageImage' src={fruit.imageUrl} alt={fruit.name} />
      </div>
      <div className='productPageDescWrapper'>
      <p>{fruit.description}</p>
      </div>
      <div className='productPageInfoWrapper'>
        <p className='productPageInfoItem'>Qty: {fruit.count}</p>
        <p className='productPageInfoItem'>Color: {fruit.color}</p>
      </div>
      <ProductComments id={id} />
    </div>
  );
}

export default ProductPage;