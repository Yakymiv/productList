import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import Comment from './comment';
import './productComments.scss';

import db from '../../firebase';

//Component that get comments from firebase.

const ProductComments = ({ id }) => {
  
  const [commentList, setCommentList] = useState([]);
  const [textareaComment, setTextareaComment] = useState('');

  //Get comments from firebase. For it we use prodict ID.
  useEffect(() => {
    const commentArray = []
    db.collection('comments').where('productId', '==', id ).get().then(querySnapshot => {
      querySnapshot.forEach(el => {
        const item = el.data(); 
        item.id = el.id;
        commentArray.push(item);
      })
      setCommentList(commentArray); //Add array with comments to state
    })
  }, [id]);

  //Follow the text area
  const handleChange = (e) => {
    setTextareaComment(e.target.value);
  }

  // Function that checks the input and adds a new comment to the firebase
  const handleClickAdd = () => {

    if (textareaComment.length <= 0) {
      return 
    }

    const currentDate = new Date().getTime();
    const newComment = {
      date: currentDate,
      description: textareaComment,
      productId: id,
    }
    db.collection('comments').add(newComment).then(e => {
      newComment.id = e.id;
      setCommentList([...commentList, newComment])
    })
  }

  //Function that delete comment from firebase.
  const handleClickDelete = (e) => {
    if (e.target.dataset.id) {
      db.collection('comments').doc(e.target.dataset.id).delete().then(() => {
        setCommentList(commentList => commentList.filter(el => el.id !== e.target.dataset.id));
        console.log('Document successfull deleted')
      }).catch((err) => {
        console.log('Error removing document ', err);
      })
    }
  }

  //Sort comments on date.
  commentList.sort((a, b) => a.date < b.date ? 1 : -1);

  return (
    <div className='productComments'>
      <div>
      <Form>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Add new comment</Form.Label>
          <Form.Control onChange={handleChange} value={textareaComment} as='textarea' rows={3} />
        </Form.Group>
        <Button onClick={handleClickAdd}>Add comment</Button>
      </Form>
      </div>
      <div onClick={handleClickDelete} className='productCommentList'>
        <div>
          <h3 className='ProductCommentListTitle'>Comments</h3>
        </div>
        {commentList.map(el => <Comment key={el.id} id={el.id} commentDate={el.date}>{el.description}</Comment>)}
      </div>
    </div>

  );
}

export default ProductComments;
