const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}))

let useridtosocketid = {}

io.on('connection', (socket) => {

    socket.on('login', (data) => {
        useridtosocketid[data.userid] = socket.id
    })

    socket.on('like', (data) => {
        io.to(useridtosocketid[data.imageLiked]).emit('like', { message: `${data.userliked} liked your image` })
    })

    socket.on('superlike', (data) => {
        io.to(useridtosocketid[data.imageSuperliked]).emit('superlike', { image: data.image, message: ` ${data.usersuperliked} superliked your image` })
    })

    socket.on('disconnect', () => {
        socket.disconnect()
    })

})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes/api'))

server.listen(5000, () => {
    console.log('server started at http://localhost:5000')
})
