import React, { useState } from 'react';

import { Container } from './styles';

interface CardProps {
  id: number;
  icon: string;
  description: string;
  click(): void;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <Container>
      <img
        src={props.icon}
        alt={props.description}
        onClick={() => props.click()}
      />
    </Container>
  );
};

export default Card;
