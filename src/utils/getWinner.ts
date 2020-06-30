interface deckCardsProps {
  id: number;
  icon: string;
  description: string;
  naipe?: string;
}

export function getWinner(
  firstHand: deckCardsProps[],
  secondHand: deckCardsProps[],
) {
  if (verifyStraightFlush(firstHand)) {
    alert('primeira mao staright flush');
  } else {
    alert('primeira mao nao straight flush');
  }
}

export function verifyStraightFlush(deckCards: deckCardsProps[]): boolean {
  if (verifySameNaipe(deckCards) && verifyNumericalOrder(deckCards)) {
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
      alert('nao foi do mesmo naipe');
      return sameNaipe;
    }
  }
  alert('foi do mesmo naipe');
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
