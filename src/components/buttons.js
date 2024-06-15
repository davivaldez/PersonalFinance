export function createButtonEdit(id, handleEditTransaction) {
  const buttonEditRender = document.createElement('button')
  buttonEditRender.classList.add('btn-edit', 'btn', 'btn-success')
  buttonEditRender.textContent = 'Editar'
  buttonEditRender.onclick = () => {
    handleEditTransaction(id)
  }

  return buttonEditRender
}

export function createButtonDelete(id, handleDeleteTransaction) {
  const buttonDeleteRender = document.createElement('button')
  buttonDeleteRender.classList.add('btn-delete', 'btn', 'btn-danger')
  buttonDeleteRender.textContent = 'Deletar'
  buttonDeleteRender.onclick = () => {
    handleDeleteTransaction(id)
  }

  return buttonDeleteRender
}