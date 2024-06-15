export function formatValue(value) {
  const formatedValue = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency'
  }).format(value)

  return formatedValue
}