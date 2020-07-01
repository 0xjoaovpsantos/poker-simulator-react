import deckCards from './deckCards';

interface deckCardsProps {
  id: number;
  icon: string;
  description: string;
  suit?: string;
  value: number;
}

export function getWinner(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let first = verifyHand(firstHand);
  let second = verifyHand(secondHand);

  if (first.id < second.id) {
    return {
      winner: 0,
      first,
      second,
    };
  } else if (first.id > second.id) {
    return {
      winner: 1,
      first,
      second,
    };
  } else {
    if (first.id == 0) {
      let winner = tieStraightFlush(firstHand, secondHand);
      return {
        winner,
        first,
        second,
      };
    } else if (first.id == 1) {
      let winner = tieQuadra(firstHand, secondHand);
      return {
        winner,
        first,
        second,
      };
    }
  }
}

export function verifyHand(hand: deckCardsProps[]) {
  if (verifyStraightFlush(hand)) {
    return {
      id: 0,
      description: 'Staight Flush',
    };
  } else if (verifyQuadra(hand)) {
    return {
      id: 1,
      description: 'Quadra',
    };
  } else if (verifyFullHouse(hand)) {
    return {
      id: 2,
      description: 'Full House',
    };
  } else if (verifyFlush(hand)) {
    return {
      id: 3,
      description: 'Flush',
    };
  } else if (verifySequence(hand)) {
    return {
      id: 4,
      description: 'Sequência',
    };
  } else if (verifyTrinca(hand)) {
    return {
      id: 5,
      description: 'Trinca',
    };
  } else if (verifyTwoPairs(hand)) {
    return {
      id: 6,
      description: 'Dois Pares',
    };
  } else if (verifyOnePair(hand)) {
    return {
      id: 7,
      description: 'Um Par ',
    };
  } else {
    return {
      id: 8,
      description: 'Carta Alta',
    };
  }
}

export function verifyStraightFlush(deckCards: deckCardsProps[]): boolean {
  if (verifySameSuit(deckCards) && verifyNumericalOrder(deckCards)) {
    return true;
  } else {
    return false;
  }
}

export function verifyQuadra(deckCards: deckCardsProps[]): boolean {
  if (verifyCardsSameValue(deckCards, 1, 4)) {
    return true;
  } else {
    return false;
  }
}

export function verifyFullHouse(deckCards: deckCardsProps[]): boolean {
  if (
    verifyCardsSameValue(deckCards, 1, 3) &&
    verifyCardsSameValue(deckCards, 1, 2)
  ) {
    return true;
  } else {
    return false;
  }
}

export function verifyFlush(deckCards: deckCardsProps[]): boolean {
  if (verifySameSuit(deckCards)) {
    return true;
  } else {
    return false;
  }
}

export function verifySequence(deckCards: deckCardsProps[]): boolean {
  if (verifyNumericalOrder(deckCards)) {
    return true;
  } else {
    return false;
  }
}

export function verifyTrinca(deckCards: deckCardsProps[]): boolean {
  if (verifyCardsSameValue(deckCards, 1, 3)) {
    return true;
  } else {
    return false;
  }
}

export function verifyTwoPairs(deckCards: deckCardsProps[]): boolean {
  if (verifyTwoPairsCards(deckCards)) {
    return true;
  } else {
    return false;
  }
}

export function verifyOnePair(deckCards: deckCardsProps[]): boolean {
  if (verifyCardsSameValue(deckCards, 1, 2)) {
    return true;
  } else {
    return false;
  }
}

export function verifySameSuit(deckCards: deckCardsProps[]): boolean {
  let suit = deckCards[0].suit;
  for (let i = 1; i < deckCards.length; i++) {
    if (deckCards[i].suit != suit) return false;
  }
  return true;
}

export function verifyCardsSameValue(
  deckCards: deckCardsProps[],
  quantityOfCards: number,
  numberOfRepetitions: number,
): boolean {
  let maximumValue = 14;
  let ocorrencias = Array(maximumValue).fill(0);

  for (let i = 0; i < deckCards.length; i++)
    ocorrencias[deckCards[i].value] =
      1 + (ocorrencias[deckCards[i].value] || 0);

  for (let i = 0; i < ocorrencias.length; i++)
    if (ocorrencias[i] == numberOfRepetitions) quantityOfCards--;

  if (quantityOfCards == 0) return true;
  else return false;
}

export function verifyNumericalOrder(deckCards: deckCardsProps[]): boolean {
  deckCards.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }

    if (a.value < b.value) {
      return -1;
    }

    return 0;
  });

  for (let i = 0; i < deckCards.length; i++) {
    if (deckCards[i + 1].value - deckCards[i].value != 1) return false;
  }

  return true;
}

export function verifyTwoPairsCards(deckCards: deckCardsProps[]): boolean {
  let valueCard;
  let quantity;
  let quantityPairs = 0;
  let valueFirstPair;
  for (let i = 0; i < deckCards.length; i++) {
    quantity = 0;
    for (let j = 0; j < deckCards.length; j++) {
      if (deckCards[i].value == deckCards[j].value) {
        quantity++;
        valueCard = deckCards[i].value;
      }
    }
    if (quantity == 2) {
      if (quantityPairs == 0) {
        quantityPairs++;
        valueFirstPair = valueCard;
      } else if (valueCard != valueFirstPair) {
        quantityPairs++;
      }
      if (quantityPairs == 2) {
        return true;
      }
    }
  }
  return false;
}

export function tieStraightFlush(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let highestFirstHandCard;
  let highestSecondtHandCard;

  for (let i = 0; i < firstHand.length; i++) {
    if (i == 0) {
      highestFirstHandCard = firstHand[i].value;
      highestSecondtHandCard = secondHand[i].value;
      continue;
    }

    if (Number(firstHand[i].value) > Number(highestFirstHandCard)) {
      highestFirstHandCard = firstHand[i].value;
    }

    if (Number(secondHand[i].value) > Number(highestSecondtHandCard)) {
      highestSecondtHandCard = secondHand[i].value;
    }
  }

  if (Number(highestFirstHandCard) > Number(highestSecondtHandCard)) {
    return 0;
  } else {
    return 1;
  }
}

export function tieQuadra(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let highestFirstHandCard = '';
  let highestSecondtHandCard = '';

  for (let i = 0; i < firstHand.length; i++) {}
}
