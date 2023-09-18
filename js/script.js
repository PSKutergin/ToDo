'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify([]))
}

const render = function () {
    let toDoData = JSON.parse(localStorage.getItem('tasks'))

    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function (item) {
        const li = document.createElement('li')

        li.classList.add('todo-item')
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.complited) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.complited = !item.complited
            localStorage.setItem('tasks', JSON.stringify(toDoData))
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.forEach(function (elem, index) {
                if (elem.text === item.text) {
                    toDoData.splice(index, 1)
                    localStorage.setItem('tasks', JSON.stringify(toDoData))
                }
            })
            render()
        })
    })
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()  // отключили стандартное поведение формы

    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            complited: false
        }

        let toDoData = JSON.parse(localStorage.getItem('tasks'))

        toDoData.push(newToDo)
        headerInput.value = ''

        localStorage.setItem('tasks', JSON.stringify(toDoData))

        render()
    }
});

render()