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
      const indexFirstHand = firstHand.findIndex(
        (card) => card.id === cardSelected.id,
      );
      if (indexFirstHand !== -1) {
        alert('Essa carta já foi escolhida na primeira mão!');
        return;
      }
      const index = secondHand.findIndex((card) => card.id === cardSelected.id);

      if (index !== -1) {
        setSecondHand(secondHand.filter((card) => card.id !== cardSelected.id));
      } else {
        setSecondHand([...secondHand, cardSelected]);
        if (secondHand.length === 4) endGame();
      }
    }
  }

  function endGame() {
    let resultado = getWinner(firstHand, secondHand);
    setResultFirstHand(resultado!.first.description);
    setResultSecondHand(resultado!.second.description);
    if (resultado!.winner === 0) {
      setResultGame('A Primeira mão venceu!');
    } else if (resultado!.winner === 1) {
      setResultGame('A Segunda mão venceu!');
    } else {
      setResultGame('As duas mãos empataram');
    }
  }

  function restart() {
    setFirstHand([]);
    setSecondHand([]);
    setResultFirstHand('');
    setResultSecondHand('');
    setResultGame('');
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
            {deckCards.map((deck) =>
              deck.cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  icon={card.icon}
                  description={card.description}
                  click={() => addCard({ ...card, suit: deck.suit })}
                />
              )),
            )}
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
          {resultGame !== '' && (
            <button onClick={() => restart()}>Zerar jogo</button>
          )}
        </Result>
      </Container>
    </>
  );
};

export default Home;
