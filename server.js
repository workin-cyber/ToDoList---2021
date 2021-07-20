const uniqid = require('uniqid')
const express = require('express')
const app = express()

const list = [
    {
        id: 1,
        text: 'aaa',
        done: false
    },
    {
        id: 2,
        text: 'bbb',
        done: false
    },
    {
        id: 3,
        text: 'ccc',
        done: true
    }
]

app.use(express.json())

app.get('/task', function (req, res) {
    if (req.query.id)
        res.send(list.find(t => t.id == req.query.id))
    else
        res.send(list)
})

app.post('task', function (req, res) {
    if (req.body.text) {
        const task = {
            id: uniqid(),
            text: req.body.text,
            done: false
        }
        list.push(task)
        res.send('sccess')
    }
    else
        res.send(`Error: field 'text' is required`)
})

app.put('task', function (req, res) {
    const index = list.findIndex(item => item.id == req.body.id)
    list[index].done = !list[index].done
    res.send('sccess')
})

app.delete('task', function (req, res) {
    const index = list.findIndex(task => task.id == id)
    list.splice(index, 1)
    res.send('sccess')
})

app.listen(3000, () => console.log('server is runnig'))
