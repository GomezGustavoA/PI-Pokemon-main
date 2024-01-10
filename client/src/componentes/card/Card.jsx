
import React from 'react';
import styles from './card.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { addDetail } from '../../redux/detail';
import { useDispatch } from 'react-redux';


function Card({ id, image, name, type }) {
  const dispatch = useDispatch();
  const imageName = name ? name.toUpperCase() : '';

  const handleAddDetail = () => {
    dispatch(addDetail(id))
  }

  return (
    <Link to='/detail' onClick={handleAddDetail}>
    <div className={styles.container} key={id}>

        <h2 className={styles.heading}>{imageName}</h2>

        <div className={styles.container2}>
          <img src={image} alt="imagen de pokemon" />
        </div>

        <h3 className={styles.footer}>{type.join(', ')}</h3>

    </div>
    </Link>
  );
}

export default Card;