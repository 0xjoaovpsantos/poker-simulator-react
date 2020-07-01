import React, { useState } from 'react';

import { Container, Deck, Table, Hand, Result } from './styles';

import deckCards from '../../utils/deckCards';

import { getWinner } from '../../utils/getWinner';

import Card from '../../components/Card';

interface deckCardsProps {
  id: number;
  icon: string;
  description: string;
  suit?: string;
  value: number;
}

const Home: React.FC = () => {
  const [firstHand, setFirstHand] = useState<deckCardsProps[]>([]);
  const [secondHand, setSecondHand] = useState<deckCardsProps[]>([]);
  const [resultFirstHand, setResultFirstHand] = useState('');
  const [resultSecondHand, setResultSecondHand] = useState('');
  const [resultGame, setResultGame] = useState('');

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
    }

    if (secondHand.length == 5) {
      let resultado = getWinner(firstHand, secondHand);
      setResultFirstHand(resultado!.first.description);
      setResultSecondHand(resultado!.second.description);
      if (resultado!.winner == 0) {
        setResultGame('A Primeira mão venceu!');
      } else {
        setResultGame('A Segunda mão venceu!');
      }
    }
  }

  return (
    <>
      <Container>
        <Deck>
          <h1>Poker Simulator with React</h1>
          <p>
            Escolha 5 cartas para a primeira mão e mais 5 cartas para a segunda
            mão!!!
          </p>
          <div>
            {deckCards[0].cards.map((copa) => (
              <Card
                id={copa.id}
                icon={copa.icon}
                description={copa.description}
                click={() => addCard({ ...copa, suit: deckCards[0].suit })}
              />
            ))}

            {deckCards[1].cards.map((espada) => (
              <Card
                id={espada.id}
                icon={espada.icon}
                description={espada.description}
                click={() => addCard({ ...espada, suit: deckCards[1].suit })}
              />
            ))}

            {deckCards[2].cards.map((ouro) => (
              <Card
                id={ouro.id}
                icon={ouro.icon}
                description={ouro.description}
                click={() => addCard({ ...ouro, suit: deckCards[2].suit })}
              />
            ))}

            {deckCards[3].cards.map((pau) => (
              <Card
                id={pau.id}
                icon={pau.icon}
                description={pau.description}
                click={() => addCard({ ...pau, suit: deckCards[3].suit })}
              />
            ))}
          </div>
        </Deck>
        <Table>
          <Hand>
            <h3>Primeiro Mão</h3>
            {firstHand.map((card) => (
              <Card
                id={card.id}
                icon={card.icon}
                description={card.description}
                click={() => {}}
              />
            ))}
            {<p>{resultFirstHand}</p>}
          </Hand>
          <Hand>
            <h3>Segunda Mão</h3>
            {secondHand.map((card) => (
              <Card
                id={card.id}
                icon={card.icon}
                description={card.description}
                click={() => {}}
              />
            ))}
            {<p>{resultSecondHand}</p>}
          </Hand>
        </Table>
        <Result>
          <p>{resultGame}</p>
        </Result>
      </Container>
    </>
  );
};

export default Home;
