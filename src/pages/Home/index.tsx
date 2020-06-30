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
  const [firstHand, setFirstHand] = useState<deckCardsProps[]>([]);
  const [secondHand, setSecondHand] = useState<deckCardsProps[]>([]);

  function addCard(cardSelected: deckCardsProps) {
    if (firstHand.length < 5) {
      const index = firstHand.findIndex((card) => card.id === cardSelected.id);

      if (index !== -1) {
        setFirstHand(firstHand.filter((card) => card.id !== cardSelected.id));
      } else {
        setFirstHand([...firstHand, cardSelected]);
      }
    } else if (secondHand.length < 5) {
      const index = secondHand.findIndex((card) => card.id === cardSelected.id);

      if (index !== -1) {
        setSecondHand(secondHand.filter((card) => card.id !== cardSelected.id));
      } else {
        setSecondHand([...secondHand, cardSelected]);
      }
    } else {
      alert('ja foi');
    }
  }

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
                click={() => addCard(copa)}
              />
            ))}
          </div>
          <div>
            {deckCards[1].cards.map((espada) => (
              <Card
                id={espada.id}
                icon={espada.icon}
                description={espada.description}
                click={() => addCard(espada)}
              />
            ))}
          </div>
          <div>
            {deckCards[2].cards.map((ouro) => (
              <Card
                id={ouro.id}
                icon={ouro.icon}
                description={ouro.description}
                click={() => addCard(ouro)}
              />
            ))}
          </div>
          <div>
            {deckCards[3].cards.map((pau) => (
              <Card
                id={pau.id}
                icon={pau.icon}
                description={pau.description}
                click={() => addCard(pau)}
              />
            ))}
          </div>
        </Deck>
        <div>
          {firstHand.map((card) => (
            <Card
              id={card.id}
              icon={card.icon}
              description={card.description}
              click={() => {}}
            />
          ))}
        </div>
        <div>
          {secondHand.map((card) => (
            <Card
              id={card.id}
              icon={card.icon}
              description={card.description}
              click={() => {}}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
