import deckCards from './deckCards';

interface deckCardsProps {
  id: number;
  icon: string;
  description: string;
  naipe?: string;
  value: string;
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
  if (verifySameNaipe(deckCards) && verifyNumericalOrderSameNaipe(deckCards)) {
    return true;
  } else {
    return false;
  }
}

export function verifyQuadra(deckCards: deckCardsProps[]): boolean {
  if (verifyCardsSameValue(deckCards, 4)) {
    return true;
  } else {
    return false;
  }
}

export function verifyFullHouse(deckCards: deckCardsProps[]): boolean {
  if (
    verifyCardsSameValue(deckCards, 3) &&
    verifyCardsSameValue(deckCards, 2)
  ) {
    return true;
  } else {
    return false;
  }
}

export function verifyFlush(deckCards: deckCardsProps[]): boolean {
  if (verifySameNaipe(deckCards)) {
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
  if (verifyCardsSameValue(deckCards, 3)) {
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
  if (verifyCardsSameValue(deckCards, 2)) {
    return true;
  } else {
    return false;
  }
}

export function verifySameNaipe(deckCards: deckCardsProps[]): boolean {
  let naipeDeck;
  let sameNaipe = true;
  for (let i = 0; i < deckCards.length; i++) {
    if (deckCards[i].naipe && i == 0) {
      naipeDeck = deckCards[i].naipe;
      continue;
    }

    if (i != 0 && deckCards[i].naipe != naipeDeck) {
      sameNaipe = false;
      return sameNaipe;
    }
  }

  return sameNaipe;
}

export function verifyNumericalOrderSameNaipe(
  deckCards: deckCardsProps[],
): boolean {
  deckCards.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }

    if (a.id < b.id) {
      return -1;
    }

    return 0;
  });

  if (
    deckCards[1].id - deckCards[0].id != 1 ||
    deckCards[2].id - deckCards[1].id != 1 ||
    deckCards[3].id - deckCards[2].id != 1 ||
    deckCards[4].id - deckCards[3].id != 1
  ) {
    console.log(deckCards);
    return false;
  } else {
    return true;
  }
}

export function verifyCardsSameValue(
  deckCards: deckCardsProps[],
  quantitySame: number,
): boolean {
  let valueCard;
  let quantity;
  for (let i = 0; i < deckCards.length; i++) {
    quantity = 0;
    for (let j = 0; j < deckCards.length; j++) {
      if (deckCards[i].value == deckCards[j].value) {
        quantity++;
        valueCard = deckCards[i].value;
      }
    }
    if (quantity == quantitySame) {
      return true;
    }
  }
  return false;
}

export function verifyNumericalOrder(deckCards: deckCardsProps[]): boolean {
  for (let i = 0; i < deckCards.length; i++) {
    if (
      deckCards[i].value == 'A' ||
      deckCards[i].value == 'J' ||
      deckCards[i].value == 'Q' ||
      deckCards[i].value == 'K'
    ) {
      return false;
    }
  }

  deckCards.sort(function (a, b) {
    if (Number(a.value) > Number(b.value)) {
      return 1;
    }

    if (Number(a.value) < Number(b.value)) {
      return -1;
    }

    return 0;
  });

  if (
    Number(deckCards[1].value) - Number(deckCards[0].value) != 1 ||
    Number(deckCards[2].value) - Number(deckCards[1].value) != 1 ||
    Number(deckCards[3].value) - Number(deckCards[2].value) != 1 ||
    Number(deckCards[4].value) - Number(deckCards[3].value) != 1
  ) {
    return false;
  } else {
    return true;
  }
}

export function verifyTwoPairsCards(deckCards: deckCardsProps[]): boolean {
  let valueCard = '';
  let quantity;
  let quantityPairs = 0;
  let valueFirstPair = '';
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
