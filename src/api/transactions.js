const url = 'http://localhost:3000/transactions'

export async function getTransactions() {
  try
  {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Erro ao buscar transações!')
    }

    return await response.json()
  }
  catch(err)
  {
    console.log(err.message)
    return []
  }
}

export async function createTransaction(transactionData) {
  try
  {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionData)
    })

    if (!response.ok) {
      throw new Error('Erro ao criar transação!')
    }

    return await response.json()
  }
  catch(err)
  {
    console.log(err.message)
    return null
  }
}

export async function updateTransaction(id, transactionData) {
  try
  {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionData)
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar transação!')
    }

    return await response.json()
  }
  catch(err) 
  {
    console.log(err.message)
    return null
  }
}

export async function deleteTransaction(id) {
  try
  {
    const response = await fetch(`${url}/${id}`, { method: 'DELETE' })

    if (!response.ok) {
      throw new Error('Erro ao deletar transação!')
    }
  }
  catch(err)
  {
    console.log(err.message)
  }
}