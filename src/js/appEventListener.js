import { mainBtn, getInput, list } from './nodes.js';
import { todos } from './initialRender.js';
import { createLi } from './create.js'

getInput.addEventListener('input', (event) => {
    mainBtn.disabled = event.currentTarget.value === '';
})

mainBtn.addEventListener('click', () => {
    const todo = {
        id: todos.length >= 1 ? todos.at(-1).id + 1 : 1,
        discription: getInput.value,
        isCompleted: false,
    };

    getInput.value = '';
    mainBtn.disabled = true;

    const newToDoItem = createLi(todo.id, todo.discription, todo.isCompleted);

    list.append(newToDoItem);

    todos.push(todo);

    const jsonTodos = JSON.stringify(todos);

    localStorage.setItem('todos', jsonTodos);
})

list.addEventListener('click', (event) => {
    switch (event.target.dataset.action) {
        case 'remove': {
            const li = event.target.closest('.item');

            function remove() {
                li.remove();
            }

            const btnCancel = document.querySelector('.checkbox-close')
            let timerId1;
            if (event.target.className !== 'checkbox-close cancel-close') {
                timerId1 = setTimeout(remove, 5000);
                event.target.textContent = 'Отмена 5...';
            }
            function timer(time) {
                time--
                setTimeout(() => {
                    if (btnCancel.className === 'checkbox-close') {
                        clearTimeout(timerId1);
                        return
                    }
                    event.target.textContent = `Отмена ${time}...`;
                    timer(time);
                }, 1000);
            }
            timer(5);

            event.target.classList.toggle('cancel-close');
            const inputAnimation = document.querySelector('.list-label');
            inputAnimation.classList.toggle('animation');
            if (btnCancel.className === 'checkbox-close') {
                event.target.textContent = '';
            }


            const index = todos.findIndex(todo => todo.id === +li.dataset.id);

            todos.splice(index, 1);

            localStorage.setItem('todos', JSON.stringify(todos));
            break;
        }
        case 'cross': {
            const li = event.target.closest('.item');
            const label = li.querySelector('.list-label');

            const todo = todos.find(todo => todo.id === +li.dataset.id);

            todo.isCompleted = !(todo.isCompleted);

            localStorage.setItem('todos', JSON.stringify(todos));

            event.target.classList.toggle('checkbox-active');
            label.classList.toggle('checkbox-active');

            break;
        }
        default: break;
    }
})