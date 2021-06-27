import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import validator from 'validator';
import db from '../../firebase'

//Component that create new product.

const NewProductModal = ({ setCardList, show, onHide }) => {

  //Create state for a new product
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productColor, setProductColor] = useState('');
  
  //Create state for input validation.
  const [productNameValid, setProductNameValid] = useState(true);
  const [productUrlValid, setproductUrlValid] = useState(true);
  const [productDescValid, setproductDescValid] = useState(true);
  const [productQtyValid, setproductQtyValid] = useState(true);
  const [productColorValid, setproductColorValid] = useState(true);

  //Add input to the state
  const handlerChange = (e) => {
    switch(e.target.id){
      case 'name': 
        setProductName(e.target.value);
        break;
      case 'url':
        setProductUrl(e.target.value);
        break;
      case 'desc':
        setProductDesc(e.target.value);
        break;
      case 'qty':
        setProductQty(e.target.value);
        break;
      case 'color':
        setProductColor(e.target.value);
        break;
      default: 
        break;
    }
  } 

  //A function that creates a new product in the firebase and checks the input.
  const handleClick = (e) => {
    setProductNameValid(validator.isAlpha(productName));
    setproductUrlValid(validator.isURL(productUrl));
    setproductDescValid(productDesc <= 0? false : true);
    setproductQtyValid(validator.isInt(productQty, {min: 0, allow_leading_zeroes: false}))
    setproductColorValid(validator.isAlpha(productColor))
    if (productNameValid && productUrlValid && productDescValid && productQtyValid && productColorValid && productName.length) {
      addProductToBase();
      onHide(); // close Modal
      setProductName('');
      setProductUrl('');
      setProductDesc('');
      setProductQty('');
      setProductColor('');
    }
  }

  // Add new product to firebase.
  const addProductToBase = () => {
    const newFruits = {
      imageUrl: productUrl,
      name: productName,
      count: productQty,
      description: productDesc,
      color: productColor,
      comments: ['another comment']
    }
      db.collection('fruits').add(newFruits).then((e) => {
        newFruits.id = e.id;
        setCardList(cardLit => [...cardLit, newFruits])
        console.log('Document written with ID: ', e.id);
      }).catch((error) => {
        console.log('Error adding document: ', error);
      })
  }

  //Modal
  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='container-modal-title-vcenter' centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add new product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Product name</Form.Label>
            {
              productNameValid ? (<Form.Control onChange={handlerChange} type='text' id='name' placeholder='Enter product name' />) :
              <Form.Control onChange={handlerChange} type='text' isInvalid='true' id='name' placeholder='Enter product name' />
            }
            <Form.Text className='text-muted'>
              Please enter a name product.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product image</Form.Label>
            {
              productUrlValid ? (<Form.Control onChange={handlerChange} type='url' id='url' placeholder='Enter url to image' />) :
              <Form.Control onChange={handlerChange} type='url' isInvalid='true' id='url' placeholder='Enter url to image' />
            }
            <Form.Text className='text-muted'>
              Please enter image url.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product description</Form.Label>
            {
              productDescValid ? (<Form.Control onChange={handlerChange} as='textarea' id='desc' placeholder='Enter product description' rows={3} />) :
              <Form.Control onChange={handlerChange} as='textarea' isInvalid='true' id='desc' placeholder='Enter product description' rows={3} />
            }
            <Form.Text className='text-muted'>
              Please enter a product description.
            </Form.Text>
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Q-ty of product</Form.Label>
                {
                  productQtyValid ? (<Form.Control onChange={handlerChange} type='number' id='qty' placeholder='Enter q-ty of product' />) :
                  <Form.Control onChange={handlerChange} type='number' isInvalid='true' id='qty' placeholder='Enter q-ty of product' />
                }
                <Form.Text className='text-muted'>
                  Please enter how much product you have.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Product color</Form.Label>
                {
                  productColorValid ? (<Form.Control onChange={handlerChange} type='text' id='color' placeholder='Enter product color' />) :
                  <Form.Control onChange={handlerChange} type='text' isInvalid='true' id='color' placeholder='Enter product color' />
                }
                <Form.Text className='text-muted'>
                  Please enter a product color
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='secondary'>
          Close
        </Button>
        <Button onClick={handleClick} variant='success'>
          Add product
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewProductModal