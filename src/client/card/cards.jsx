import React from 'react';
import { useParams } from 'react-router-dom';
import './cards.css'; // Assurez-vous que le chemin est correct
import MenuCard from '../card.jsx';

const Cards = () => {
  const { id } = useParams();

  return (
    <div className="cards-container">
      <MenuCard Numtab={id} />
    </div>
  );
};

export default Cards;
