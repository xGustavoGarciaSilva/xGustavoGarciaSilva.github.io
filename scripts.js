const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-task')

let myListOfItens = []

function addNewItem(){
  if (!inputValidator()) {
    return;
  }
  myListOfItens.push({
    merchandise: input.value,
    statusOfMerchandise: false
  })
  input.value = ''

  showItem()
}

function showItem(){
  let newLi = ''

  myListOfItens.forEach((item, position) => {
    newLi = newLi + 
    `<li class="task ${item.statusOfMerchandise && "done"}" >
      <img src="/img/checked.png" alt="check-na-tarefa" onclick="completeTask(${position})">
      <p>${item.merchandise}</p>
      <img src="/img/trash.png" alt="excluir-tarefa" onclick="deleteItem(${position})">
    </li>`
  })
  completeList.innerHTML = newLi

  localStorage.setItem('list', JSON.stringify(myListOfItens))
}

function completeTask(position){
  myListOfItens[position].statusOfMerchandise = !myListOfItens[position].statusOfMerchandise
  showItem()
}

function deleteItem(position){
  myListOfItens.splice(position, 1)
  showItem()
}

function reloadItens(){
  const itensOfLocalStorage = localStorage.getItem('list')
  if (itensOfLocalStorage) {
    myListOfItens = JSON.parse(itensOfLocalStorage)
  }
  
  showItem()
}

function inputValidator() {
  var name = document.getElementById("name").value;

  if (name === "") {
      alert("Não é possível adicionar um item vazio. Por favor, entre com algum valor.");
      return false;
  }
  return true;
}


reloadItens();
button.addEventListener('click', addNewItem )