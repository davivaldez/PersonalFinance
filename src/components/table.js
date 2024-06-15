import { formatValue } from "../utils/formatter.js"

export function createTableRow(id) {
  const tableRowTransactionPersonal = document.createElement('tr')
  tableRowTransactionPersonal.id = `transaction-personal-${id}`
  return tableRowTransactionPersonal
}

export function createId(id) {
  const idRender = document.createElement('td')
  idRender.textContent = id
  return idRender
}

export function createName(id, transactionName) {
  const nameRender = document.createElement('td')
  nameRender.textContent = transactionName
  nameRender.id = `name-${id}`
  return nameRender
}

export function createValue(id, transactionValue) {
  const valueRender = document.createElement('td')
  valueRender.textContent = formatValue(transactionValue)
  valueRender.id = `value-${id}`
  return valueRender
}

export function createTableDataButtons(buttonEditRender, buttonDeleteRender) {
  const tableDataTransactionButtons = document.createElement('td')
  tableDataTransactionButtons.append(buttonEditRender, buttonDeleteRender)
  return tableDataTransactionButtons
}