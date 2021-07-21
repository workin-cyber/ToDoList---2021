const uniqid = require('uniqid')
const express = require('express')
//const cors = require('cors')
const app = express()

const list = [
    {
        id: 1,
        text: 'aaa from server',
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

app.use(express.static('client'))

//app.use(cors())
app.use(express.json())

app.get('/task', function (req, res) {
    if (req.query.id)
        res.send(list.find(t => t.id == req.query.id))
    else
        res.send(list)
})

app.post('/task', function (req, res) {
    try {
        if (!req.body.text)
            throw { message: `Error: field 'text' is required` }
        const task = {
            id: uniqid(),
            text: req.body.text,
            done: false
        }
        list.push(task)
        res.send(task)
    } catch (error) {
        res.status('400').send(error)
    }
})

app.put('/task', function (req, res) {
    const index = list.findIndex(item => item.id == req.body.id)
    list[index].done = !list[index].done
    res.send(list[index])
})

app.delete('/task', function (req, res) {
    const index = list.findIndex(task => task.id == req.query.id)
    list.splice(index, 1)
    res.send('success')
})

app.listen(3000, () => console.log('server is runnig'))
