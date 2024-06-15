import { formatValue } from "./utils/formatter.js"

export function updateBalance(transactions) {
  let balance = 0

  transactions.forEach(transaction => {
    balance += transaction.value
  })

  document.getElementById('balance').textContent = formatValue(balance)
}