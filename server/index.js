const express = require('express')
const app = express()
const PORT = 4000
const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://yaay-ak-doom-app.volkeno-engineering.click'
    ]
  }
})

let users = []

app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  socket.on('all_conversations', (data) => {
    socketIO.emit('allConversations', data)
  })

  socket.on('all_chatable_users', (data) => {
    socketIO.emit('AllChatableUsers', data)
  })

  // Listens when a new user joins the server
  socket.on('newUser', (data) => {
    // Adds the new user to the list of users
    users.push(data)
    // console.log(users)
    // Sends the list of users to the client
    socketIO.emit('newUserResponse', users)
  })

  // Listens when user typing
  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data))

  // sends the message to all the users on the server
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data)
    console.log('message envoyé')
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
    // Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id)
    // Sends the list of users to the client
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  })
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
