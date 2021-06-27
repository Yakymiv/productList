import React from 'react';
import { Button } from 'react-bootstrap';

import './comment.scss';

// Component for one commet

const Comment = ({commentDate, id, children }) => {

  //create variables for the date.
  let day = undefined
  let month = undefined
  let year = undefined
  let hours = undefined
  let minutes = undefined

  //Create function for initialize variables for date.
  const getDate = () => {
    const date = new Date(commentDate);

    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    hours = date.getHours();
    minutes = date.getMinutes();

    const currentDate = (e) => {
      return ('0' + e).slice(-2);
    }

    day = currentDate(day);
    month = currentDate(month + 1)
    hours = currentDate(hours);
    minutes = currentDate(minutes);
  }

  getDate();

  return (
    <div className='commentItem'>
      <p className='commentDate'>{`${hours}:${minutes} - ${day}.${month}.${year}`}</p>
      <p className='commentText'>{children}</p>
      <Button data-id={id} variant='danger'>Delete</Button>
    </div>
  )
}

export default Comment;