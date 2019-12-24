export enum CardType {
  arts = 'arts',
  buster = 'buster',
  quick = 'quick',
  extra = 'extra',
}

export const castCardIdAsType = (cardId: number): CardType => {
  switch (cardId) {
    case 1:
      return CardType.arts;
    case 2:
      return CardType.buster;
    case 3:
      return CardType.quick;
    case 4:
      return CardType.extra;
  }

  return null;
};
