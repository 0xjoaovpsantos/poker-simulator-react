import React from 'react';

import { Container, Deck } from './styles';

import deckCards from '../../utils/deckCards';

import Card from '../../components/Card';

const Home: React.FC = () => (
  <>
    <Container>
      <Deck>
        <p>Escolha 5 cartas para a primeira mão do poker</p>
        <div>
          {deckCards.map((card) => (
            <Card
              id={card.id}
              icon={card.icon}
              description={card.description}
            />
          ))}
        </div>
      </Deck>
    </Container>
  </>
);

export default Home;
