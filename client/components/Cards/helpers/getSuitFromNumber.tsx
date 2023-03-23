export const getSuitFromNumber = (cardNumber: number) => {
  if ([0, 5].includes(cardNumber)) return 'spade'
  if ([1, 8].includes(cardNumber)) return 'heart'
  if ([2, 13].includes(cardNumber)) return 'diamond'
  return 'club'
}
