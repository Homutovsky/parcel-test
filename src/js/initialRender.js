import { list } from './nodes.js';
import { createLi } from './create.js'

export let todos = [];

export function render() {
    if (localStorage.getItem('todos')) {
        const data = JSON.parse(localStorage.getItem('todos'))
        todos.push(...data)
    }

    const todoItems = todos.map(item => {
        const li = createLi(item.id, item.discription, item.isCompleted)
        return li;
    })

    list.append(...todoItems)
}