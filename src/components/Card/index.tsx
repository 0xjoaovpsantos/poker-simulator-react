import React from 'react';

interface CardProps {
  id: number;
  icon: string;
  description: string;
}

const Card: React.FC<CardProps> = (props) => <img src={props.icon} />;

export default Card;
