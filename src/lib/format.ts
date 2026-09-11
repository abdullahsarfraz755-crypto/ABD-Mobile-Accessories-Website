export function formatPrice(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`
}

export function discountPercent(price: number, oldPrice: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}
