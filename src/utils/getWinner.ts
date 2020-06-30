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
  } else {
    alert('nem full house');
  }
}

export function verifyStraightFlush(deckCards: deckCardsProps[]): boolean {
  if (verifySameNaipe(deckCards) && verifyNumericalOrder(deckCards)) {
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
  if (verifyCardsSameValue(deckCards, 3)) {
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

export function verifyNumericalOrder(deckCards: deckCardsProps[]): boolean {
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
    alert('nao ta na ordem');
    return false;
  } else {
    alert('ta na ordem');
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
