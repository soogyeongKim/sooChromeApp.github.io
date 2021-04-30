const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  firstBox = document.querySelector(".first-box"),
  mainBox = document.querySelector(".main-box"),
  todoForm = document.querySelector(".js-toDoForm"),
  todoSection = document.querySelector(".js-toDolist-container");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  firstBox.classList.add("scale-out-vertical");
  saveName(currentValue);
  setTimeout(() => {
    paintGreeting(currentValue);
  }, 500);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  todoForm.classList.remove("hiding");
  todoSection.classList.remove("hiding");
  todoSection.classList.add("flex-box");
  firstBox.classList.remove("first-box");
  mainBox.classList.remove("hiding");
  mainBox.classList.add(SHOWING_CN);
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
