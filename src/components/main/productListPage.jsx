import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import CardElement from './cardElement';
import NewProductModal from './newProductModal';
import './productListPage.scss';

import db from '../../firebase';

//Component that get products from firebase.

const ProductListPage = () => {

  const [modalShow, setModalShow] = useState(false);
  const [sortList, setSortList] = useState(false);
  const [cardList, setCardList] = useState([]);

  //Get products from firebase
  useEffect(() => {
    const itemArray = [];
    db.collection('fruits').get().then(querySnapshot => {
      querySnapshot.forEach(el => {
        const item = el.data();
        item.id = el.id;
        itemArray.push(item);
      })
      setCardList(itemArray); //Add array with products to firebase.
    })
  }, [])

  //Function for delete product from firebase.
  const handleClickDeleteElement = (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('buttonDeleteElement')) {
      db.collection('fruits').doc(id).delete().then(() => {
        setCardList(cardList => cardList.filter(e => e.id !== id));
        console.log('Document successfull deleted')
      }).catch((err) => {
        console.log('Error removing document ', err);
      })
    }
  }

  //Create sort for products
  const fruitList = cardList;
  const createCardList = () => {
    if (sortList === 'Name'){
      fruitList.sort((a, b) => a.name > b.name ? 1 : -1);
    } else if (sortList === 'Count') {
      fruitList.sort((a, b) => a.count - b.count);
    }
  }
  createCardList();
  const sortBy = (sort) => {
    setSortList(sort);
  };

  return(
    <div className='ProductListPage'>
      <NewProductModal setCardList={setCardList} cardLit={cardList} show={modalShow} onHide={() => setModalShow(false)}></NewProductModal>
      <div className='ProductListPageButtons'>
        <div className='ProductListPageButtonNew'>
          <Button variant='info' onClick={() => setModalShow(true)}>New Product</Button>
        </div>
        <div className='ProductListPageButtonSort'>
          <Button variant='outline-info' onClick={() => sortBy('Name')}>Short by name</Button>
          <Button variant='outline-info' onClick={() => sortBy('Count')}>Short by Count</Button>
        </div>
      </div>
      <div onClick={handleClickDeleteElement}>
        {
          fruitList.map(el => <CardElement key={el.id} id={el.id} name={el.name} img={el.imageUrl} count={el.count} desc={el.description}></CardElement>)
        }
      </div>
    </div>
  );
}

export default ProductListPage;