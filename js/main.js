// localStorage.removeItem
// localStorage.setItem
// localStorage.getItem
// localStorage.clear

// Selectors

let formElement = document.querySelector(".todo__form")
let formInputElement = document.querySelector(".todo__input")
let todosListElement = document.querySelector(".todo__list")
let DeleteFormElement = document.querySelector('.todo__form__button--delete')
let nightModeButton = document.querySelector('.night-mode')
let lightModeButton = document.querySelector('.light-mode')
let bodyElement = document.querySelector('.body')
let titleElement = document.querySelector('.todo__heading')

let todos = localStorage.getItem("__todos");

if(todos){
    todos = JSON.parse(todos)
    renderTodos(todos)
}

DeleteFormElement.onclick = event =>{
    event.preventDefault()
    todosListElement.textContent = ""
    localStorage.removeItem("__todos")
    todos = []
}

nightModeButton.onclick = event =>{
    event.preventDefault
    bodyElement.style.backgroundColor = '#333'
}

lightModeButton.onclick = event =>{
    event.preventDefault
    bodyElement.style.backgroundColor = 'white'
}

formElement.addEventListener('submit', event => {
    event.preventDefault()
    if(!todos){
        todos = []
        todos.unshift(formInputElement.value)
        localStorage.setItem("__todos", JSON.stringify(todos))
        renderTodos(todos)
    } else {
        todos.unshift(formInputElement.value)
        localStorage.setItem("__todos", JSON.stringify(todos))
        renderTodos(todos)
    }
    formElement.reset()
    formInputElement.focus()
})

function renderTodos(array) {
    todosListElement.textContent = ""

    array.forEach((element, index) => {
        let newTodoElement = document.createElement("li")
        let newTodoTitleElement = document.createElement("h2")
        let newTodoCloseButtonElement = document.createElement("button")
        let unfulfilledButtonElement = document.createElement('button')
        let fulfilledButtonElement = document.createElement('button')

        unfulfilledButtonElement.classList.add('unfulfilled-Button')
        fulfilledButtonElement.classList.add('fulfilled-Button')
        newTodoElement.classList.add("todo__item")
        newTodoTitleElement.classList.add("todo__title")
        newTodoCloseButtonElement.classList.add("todo__item__close")

        newTodoTitleElement.textContent = element
        newTodoCloseButtonElement.textContent = "X"

        unfulfilledButtonElement.onclick = event => {
            event.preventDefault()
            newTodoElement.style.backgroundColor = 'red'
        }
        fulfilledButtonElement.onclick = event =>{
            event.preventDefault()
            newTodoElement.style.backgroundColor = 'green'
        }

        newTodoCloseButtonElement.addEventListener('click', event => {
            todos.splice(index, 1)
            localStorage.setItem("__todos", JSON.stringify(todos))
            renderTodos(todos)
        })

        newTodoElement.appendChild(newTodoTitleElement)
        newTodoElement.appendChild(newTodoCloseButtonElement)
        newTodoElement.appendChild(unfulfilledButtonElement)
        newTodoElement.appendChild(fulfilledButtonElement)

        todosListElement.appendChild(newTodoElement)
    })
}