function renderLists() {
    document.querySelector('#tasksList').innerHTML = ''
    document.querySelector('#doneList').innerHTML = ''
    axios.get('http://localhost:3000/task')
        .then(res => {
            const list = res.data
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
                                  ${task.done ? '' : `<button 
                                     onclick="deleteTask(${task.id})" 
                                     class="btn"
                                  >X</button>`}
                              </div>
                          </li>`
            })
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
        }), {})

    axios.post('http://localhost:3000/task', { text: values.new })
        .then(() => {
            document.querySelector('form').reset()
            renderLists()
        })
}

function updateTask(id) {
    axios.put('http://localhost:3000/task', { id })
        .then(() => {
            renderLists()
        })
}

function deleteTask(id) {
    axios.delete(`http://localhost:3000/task?id=${id}`)
        .then(() => {
            renderLists()
        })
}
