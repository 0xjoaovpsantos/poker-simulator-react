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
  let winner;

  if (first.id < second.id) {
    winner = 0;
  } else if (first.id > second.id) {
    winner = 1;
  } else {
    if (first.id === 0) {
      winner = tieStraightFlush(firstHand, secondHand);
    } else if (first.id === 1) {
      winner = tieQuadra(firstHand, secondHand);
    } else if (first.id === 2) {
      winner = tieFullHouse(firstHand, secondHand);
    }
  }

  return {
    winner,
    first,
    second,
  };
}

export function verifyHand(cardDeck: deckCardsProps[]) {
  let hand = verifyAsValue(cardDeck);

  if (verifyRoyalFlush(hand)) {
    return {
      id: 0,
      description: 'Royal Flush',
    };
  } else if (verifyStraightFlush(hand)) {
    return {
      id: 1,
      description: 'Straight Flush',
    };
  } else if (verifyQuadra(hand)) {
    return {
      id: 2,
      description: 'Quadra',
    };
  } else if (verifyFullHouse(hand)) {
    return {
      id: 3,
      description: 'Full House',
    };
  } else if (verifyFlush(hand)) {
    return {
      id: 4,
      description: 'Flush',
    };
  } else if (verifySequence(hand)) {
    return {
      id: 5,
      description: 'Sequência',
    };
  } else if (verifyTrinca(hand)) {
    return {
      id: 6,
      description: 'Trinca',
    };
  } else if (verifyTwoPairs(hand)) {
    return {
      id: 7,
      description: 'Dois Pares',
    };
  } else if (verifyOnePair(hand)) {
    return {
      id: 8,
      description: 'Um Par',
    };
  } else {
    return {
      id: 9,
      description: 'Carta Alta',
    };
  }
}

export function verifyRoyalFlush(deckCards: deckCardsProps[]): boolean {
  if (
    verifySameSuit(deckCards) &&
    verifyNumericalOrder(deckCards) &&
    deckCards[0].value === 10
  )
    return true;
  else return false;
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
  if (verifyCardsSameValue(deckCards, 2, 2)) {
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
    if (deckCards[i].suit !== suit) return false;
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
    if (ocorrencias[i] === numberOfRepetitions) quantityOfCards--;

  if (quantityOfCards === 0) return true;
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

  for (let i = 0; i < deckCards.length - 1; i++) {
    if (deckCards[i + 1].value - deckCards[i].value !== 1) return false;
  }

  return true;
}

export function MaximumValue(
  deckCards: deckCardsProps[],
  numberOfRepetitions: number,
) {
  let maximumValue = 14;
  let ocorrencias = Array(maximumValue).fill(0);

  for (let i = 0; i < deckCards.length; i++)
    ocorrencias[deckCards[i].value] =
      1 + (ocorrencias[deckCards[i].value] || 0);

  let higherNumber = 0;
  for (let i = 0; i < ocorrencias.length; i++)
    if (ocorrencias[i] === numberOfRepetitions) higherNumber = i;

  return higherNumber;
}

export function tieStraightFlush(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let higherValueFirstHand = MaximumValue(firstHand, 1);
  let higherValueSecondHand = MaximumValue(secondHand, 1);

  if (higherValueFirstHand! > higherValueSecondHand!) return 0;
  else if (higherValueFirstHand! < higherValueSecondHand!) return 1;
  else return 2;
}

export function tieQuadra(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let higherValueFirstHand = MaximumValue(firstHand, 4);
  let higherValueSecondHand = MaximumValue(secondHand, 4);

  if (higherValueFirstHand! > higherValueSecondHand!) return 0;
  else return 1;
}

export function tieFullHouse(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  let higherValueFirstHand = MaximumValue(firstHand, 3);
  let higherValueSecondHand = MaximumValue(secondHand, 3);

  if (higherValueFirstHand! > higherValueSecondHand!) return 0;
  else if (higherValueFirstHand! < higherValueSecondHand!) return 1;
  else {
    higherValueFirstHand = MaximumValue(firstHand, 2);
    higherValueSecondHand = MaximumValue(secondHand, 2);

    if (higherValueFirstHand! > higherValueSecondHand!) return 0;
    else return 1;
  }
}

export function verifyAsValue(deckCards: deckCardsProps[]) {
  let higherValue = -1;
  for (let i = 0; i < deckCards.length; i++)
    if (deckCards[i].value > higherValue && deckCards[i].value !== 14)
      higherValue = deckCards[i].value;

  if (higherValue === 5)
    for (let i = 0; i < deckCards.length; i++)
      if (deckCards[i].value === 14) deckCards[i].value = 1;

  return deckCards;
}
