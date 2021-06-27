import React, { useState, useEffect } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import validator from 'validator';

import db from '../../firebase';

//Component that change data in product.

const ProductChangeModal = ({setFruit, fruit, id, show, onHide }) => {

  //Create state for a new product
  const [productName, setProductName] = useState('');
  const [productImg, setProductImg] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productColor, setProductColor] = useState('');

  //Create state for input validation.
  const [productNameValid, setProductNameValid] = useState(true);
  const [productImgValid, setproductImgValid] = useState(true);
  const [productDescValid, setproductDescValid] = useState(true);
  const [productQtyValid, setproductQtyValid] = useState(true);
  const [productColorValid, setproductColorValid] = useState(true);

  //Add old data to inputs
  useEffect(() => {
    setProductName(fruit.name);
    setProductImg(fruit.imageUrl);
    setProductQty(fruit.count);
    setProductDesc(fruit.description);
    setProductColor(fruit.color);
  }, [setProductName, setProductImg, setProductQty, setProductDesc, setProductColor, fruit])

  //Change data in state
  const handlerChange = (e) => {
    switch(e.target.id){
      case 'name': 
        setProductName(e.target.value);
        break;
      case 'url':
        setProductImg(e.target.value);
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

  //A function that change product in the firebase and checks the input.
  const handleClick = (e) => {
    setProductNameValid(validator.isAlpha(productName));
    setproductImgValid(validator.isURL(productImg));
    setproductDescValid(productDesc <= 0? false : true);
    setproductQtyValid(validator.isInt(productQty, {min: 0, allow_leading_zeroes: false}))
    setproductColorValid(validator.isAlpha(productColor))
    if (productNameValid && productImgValid && productDescValid && productQtyValid && productColorValid && productName.length) {
      changeProduct();
      onHide(); //close Modal
    }
  }

  // Change product in firebase.
  const changeProduct = () => {
    const myFruit = {
      imageUrl: productImg,
      name: productName,
      count: productQty,
      description: productDesc,
      color: productColor,
      comments: ['another comment']
    }

    db.collection('fruits').doc(id).set(myFruit).then(() => {
      setFruit(myFruit);
      console.log('The document has been modified');
    }).catch((error) => {
      console.log('Error adding document: ', error);
    })
  }

  //Modal
  return(
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Change product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group>
            <Form.Label>Product name</Form.Label>
            <Form.Control type='text' id='name' value={productName} onChange={handlerChange}/>
            <Form.Text className='text-muted'>
              Please enter a name product.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product image</Form.Label>
            <Form.Control type='url' id='url' value={productImg} onChange={handlerChange}/>
            <Form.Text className='text-muted'>
              Please enter image url.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product description</Form.Label>
            <Form.Control as='textarea' id='desc' value={productDesc} rows={3} onChange={handlerChange}/>
            <Form.Text className='text-muted'>
              Please enter a product description.
            </Form.Text>
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Q-ty of product</Form.Label>
                <Form.Control type='number' id='qty' value={productQty} onChange={handlerChange}/>
                <Form.Text className='text-muted'>
                  Please enter how much product you have.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Product color</Form.Label>
                <Form.Control type='text' id='color' value={productColor} onChange={handlerChange}/>
                <Form.Text className='text-muted'>
                  Please enter a product color
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='success'>
          Cancel
        </Button>
        <Button onClick={handleClick} variant='secondary'>
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductChangeModal;