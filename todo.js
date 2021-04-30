const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoListContainer = document.querySelector(".js-toDolist-container"),
  toDoListBox = document.querySelector(".js-toDoList-box"),
  toDoListDoneBox = document.querySelector(".js-toDoList-done-box"),
  toDoListDone = document.querySelector(".js-toDoList-done");

const TODOS_LS = "toDos";
const TODOS_DONE_LS = "toDosDone";

let toDos = [];
let toDosDone = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteToDoDone(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  toDoListDone.removeChild(li);
  const cleanToDosDone = toDosDone.filter(function (toDoDone) {
    return toDoDone.id !== parseInt(li.id);
  });
  toDosDone = cleanToDosDone;
  saveToDosDone();
}

function doneTodo(event) {
  deleteToDo(event);
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  paintToDoDone(li.firstChild.innerText);
}

function returnTodo(event) {
  deleteToDoDone(event);
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  paintToDo(li.firstChild.innerText);
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveToDosDone() {
  localStorage.setItem(TODOS_DONE_LS, JSON.stringify(toDosDone));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  const btnBox = document.createElement("div");
  btnBox.style.display = "flex";
  checkBtn.style.marginRight = "8px";
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", doneTodo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  btnBox.appendChild(checkBtn);
  btnBox.appendChild(delBtn);
  li.appendChild(btnBox);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintToDoDone(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  const btnBox = document.createElement("div");
  btnBox.style.display = "flex";
  checkBtn.style.marginRight = "8px";
  checkBtn.innerText = "↩️";
  checkBtn.addEventListener("click", returnTodo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDoDone);
  span.innerText = text;
  li.appendChild(span);
  btnBox.appendChild(checkBtn);
  btnBox.appendChild(delBtn);
  li.appendChild(btnBox);
  li.id = newId;
  toDoListDone.appendChild(li);

  const toDoDoneObj = {
    text: text,
    id: newId,
  };
  toDosDone.push(toDoDoneObj);
  saveToDosDone();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }

  const loadedToDosDone = localStorage.getItem(TODOS_DONE_LS);
  if (loadedToDosDone !== null) {
    const parsedToDosDone = JSON.parse(loadedToDosDone);
    parsedToDosDone.forEach(function (toDoDone) {
      paintToDoDone(toDoDone.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
