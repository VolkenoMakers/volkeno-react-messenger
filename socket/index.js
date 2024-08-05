const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const { Server } = require('socket.io')

const io = new Server({
  cors: [
    'http://localhost:3001/',
    'http://127.0.0.1:8000/',
    'http://localhost:3000/'
  ]
})

let onlineUsers = []

io.on('connection', (socket) => {
  console.log('New connection', socket.id)

  // listen to a connection
  socket.on('addNewUser', (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id
      })
    console.log({ onlineUsers })

    io.emit('getOnlineUsers', onlineUsers)
  })

  //   add message
  socket.on('sendMessage', (message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId)

    if (user) {
      io.to(user.socketId).emit('getMessage', message)
      // io.to(user.socketId).emit('getNotification', {
      //   senderId: message.senderId,
      //   isRead: false,
      //   date: new Date()
      // })
    }

    console.log(message)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)

    io.emit('getOnlineUsers', onlineUsers)
  })
})

console.log('socket_port', process.env.REACT_APP_SOCKET_PORT)
io.listen(process.env.REACT_APP_SOCKET_PORT || 8804)
