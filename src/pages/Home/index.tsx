import React, { useEffect, useState } from 'react';

import { Container, Deck } from './styles';

import deckCards from '../../utils/deckCards';

import Card from '../../components/Card';

interface deckCardsProps {
  id: number;
  icon: string;
  description: string;
}

const Home: React.FC = () => {
  return (
    <>
      <Container>
        <Deck>
          <p> teste</p>
          <div>
            {deckCards[0].cards.map((copa) => (
              <Card
                id={copa.id}
                icon={copa.icon}
                description={copa.description}
              />
            ))}
          </div>
          <div>
            {deckCards[1].cards.map((espada) => (
              <Card
                id={espada.id}
                icon={espada.icon}
                description={espada.description}
              />
            ))}
          </div>
          <div>
            {deckCards[2].cards.map((ouro) => (
              <Card
                id={ouro.id}
                icon={ouro.icon}
                description={ouro.description}
              />
            ))}
          </div>
          <div>
            {deckCards[3].cards.map((pau) => (
              <Card id={pau.id} icon={pau.icon} description={pau.description} />
            ))}
          </div>
        </Deck>
      </Container>
    </>
  );
};

export default Home;
