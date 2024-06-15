import { createId, createName, createTableDataButtons, createTableRow, createValue } from "./components/table.js"
import { createButtonDelete, createButtonEdit } from "./components/buttons.js"
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "./api/transactions.js"
import { updateBalance } from "./balance.js"
import { formatValue } from "./utils/formatter.js"

let transactions = []
let idTransaction = null
let edit = false

function renderTransactions(transaction) {
  const tableRowTransactionPersonal = createTableRow(transaction.id)
  const idRender = createId(transaction.id)
  const nameRender = createName(transaction.id, transaction.name)
  const valueRender = createValue(transaction.id, transaction.value)
  const buttonEditRender = createButtonEdit(transaction.id, handleEditTransaction)
  const buttonDeleteRender = createButtonDelete(transaction.id, handleDeleteTransaction)
  const tableDataTransactionButtons = createTableDataButtons(buttonEditRender, buttonDeleteRender)

  tableRowTransactionPersonal.append(idRender, nameRender, valueRender, tableDataTransactionButtons)
  document.getElementById('transactions').append(tableRowTransactionPersonal)
  updateBalance(transactions)
}

async function loadTransactions() {
  transactions = await getTransactions()
  transactions.forEach(renderTransactions)
}

function cleanInputs() {
  document.getElementById('name').value = ''
  document.getElementById('value').value = ''
}

async function handleCreateTransactions(ev) {
  ev.preventDefault()
  const name = document.getElementById('name').value
  const value = document.getElementById('value').value

  if (!name || !value) {
    alert('Dados inválidos!')
    return
  }

  const transactionData = {
    name,
    value: parseFloat(value)
  }

  const newTransaction = await createTransaction(transactionData)

  if (newTransaction) {
    transactions.push(newTransaction)
    renderTransactions(newTransaction)
    cleanInputs()
  }
}

async function handleEditTransaction(id) {
  const currentTransaction = transactions.filter(transaction => transaction.id === id)
  document.getElementById('name').value = currentTransaction[0].name
  document.getElementById('value').value = currentTransaction[0].value

  document.getElementById('btn-cancel').style.display = 'block'

  idTransaction = id
  edit = true
}

async function handleUpdateTransaction(ev) {
  ev.preventDefault()
  const name = document.getElementById('name').value
  const value = document.getElementById('value').value

  if (!name || !value) {
    alert('Dados inválidos!')
    return
  }

  const transactionData = {
    name,
    value: parseFloat(value)
  }

  const updatedTransaction = await updateTransaction(idTransaction, transactionData)

  if (updatedTransaction) {
    const filterTransactions = transactions.filter(t => t.id !== updatedTransaction.id)
    transactions = [...filterTransactions]
    transactions.push(updatedTransaction)
  
    document.getElementById(`name-${updatedTransaction.id}`).textContent = updatedTransaction.name
    document.getElementById(`value-${updatedTransaction.id}`).textContent = formatValue(updatedTransaction.value)
  
    updateBalance(transactions)
    cleanInputs()
    document.getElementById('btn-cancel').style.display = 'none'
    idTransaction = null
    edit = false
  }
}

async function handleDeleteTransaction(id) {
    const oldTransactions = transactions.filter(t => t.id !== id)
    await deleteTransaction(id)
    transactions = [...oldTransactions]
    document.getElementById(`transaction-personal-${id}`).remove()
    updateBalance(transactions)
}

document.getElementById('btn-cancel').addEventListener('click', (ev) => {
  ev.preventDefault()
  cleanInputs()
  document.getElementById('btn-cancel').style.display = 'none'
  idTransaction = null
  edit = false
})

document.addEventListener('DOMContentLoaded', loadTransactions)
document.getElementById('btn-save').addEventListener('click', (ev) => {
  if (edit) {
    handleUpdateTransaction(ev)
  }

  else {
    handleCreateTransactions(ev)
  }
})




