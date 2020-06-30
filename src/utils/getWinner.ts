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
  if (verifyStraightFlush(firstHand)) {
    alert('primeira mao staright flush');
  } else if (verifyQuadra(firstHand)) {
    alert('primeira mao quadra');
  } else if (verifyFullHouse(firstHand)) {
    alert('primeira mao full house');
  } else if (verifyFlush(firstHand)) {
    alert('primeira mao flush');
  } else if (verifySequence(firstHand)) {
    alert('primeira mao sequencia');
  } else if (verifyTrinca(firstHand)) {
    alert('primeira mao trinca');
  } else if (verifyTwoPairs(firstHand)) {
    alert('primeira mao two pairs');
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
  if (
    verifyCardsSameValue(deckCards, 2) &&
    verifyCardsSameValue(deckCards, 2)
  ) {
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
