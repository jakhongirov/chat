const express = require('express')
const app = express()
const socketIo = require('socket.io')
const cors = require('cors')
const PORT = process.env.PORT || 7777

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

const server = app.listen(PORT, () => console.log(PORT))

const io = socketIo(server)

io.on('connection', socket => {
   socket.on('new-user', data => {
      socket.broadcast.emit('joined-user', { name: data.name })
   })

   socket.on('new-message', data => {
      socket.broadcast.emit('message', data)
   })
})