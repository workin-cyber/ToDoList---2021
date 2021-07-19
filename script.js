let counter = 4
const list = [
    {
        id: 1,
        text: 'asfasdf',
        done: false
    },
    {
        id: 2,
        text: 'asfasdf',
        done: false
    },
    {
        id: 3,
        text: 'asfasdf',
        done: true
    }
]

function renderLists() {
    document.querySelector('#tasksList').innerHTML = ''
    document.querySelector('#doneList').innerHTML = ''

    list.forEach(task => {
        document.querySelector(task.done ? '#doneList' : '#tasksList')
            .innerHTML += `<li class="${task.done ? 'done' : ''}">
                              <label>${task.text}</label>
                              <div class="btns">
                                  <input 
                                        type="checkbox" ${task.done ? `checked` : ''}  
                                        onchange="updateTask(${task.id})"
                                        class="btn" 
                                    />
                                  ${task.done ? '' : `<button onclick="deleteTask(${task.id})" class="btn">X</button>`}
                              </div>
                          </li>`
    })
}
renderLists()

document.querySelector('form').onsubmit = addNewTask
function addNewTask(event) {
    event.preventDefault()
    const values = Object.values(event.target)
        .reduce((acc, input) => !input.name ? acc : ({
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value
        }), {}
        )
    list.push({
        id: counter,
        text: values.new,
        done: false
    })
    counter++
    document.querySelector('form').reset()
    renderLists()
}

function updateTask(id) {
    const index = list.findIndex(task => task.id == id)
    list[index].done = !list[index].done
    renderLists()
}

function deleteTask(id) {
    const index = list.findIndex(task => task.id == id)
    list.splice(index, 1)
    renderLists()
}
