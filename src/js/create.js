function createElement(tagName, className, action, id, type) {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }
    if (action) {
        element.dataset.action = action;
    }
    if (id) {
        element.dataset.id = id;
    }
    if (type) {
        element.type = type;
    }

    return element;
}


export function createLi(id, description = '', isCompleted) {
    const li = createElement('li', 'item', '', id);
    const label = createElement('label');
    const input = createElement('input', 'checkbox', 'cross', '', 'checkbox');
    const button = createElement('button', 'checkbox-close', 'remove');
    const div = createElement('div', 'checkbox-block');


    label.className = isCompleted ? 'list-label checkbox-active' : 'list-label';
    label.for = 'text';

    input.checked = isCompleted;

    li.append(div, button);

    div.append(label);

    label.append(input, description)

    return li;
}
