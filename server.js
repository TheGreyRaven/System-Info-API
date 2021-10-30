const io = require('socket.io')(8000)
const express = require('express')
const cors = require('cors')
const app = express()
const getStats = require('./socket/server-stats')
const errorHandling = require('./helpers/error-handling')
const jwt = require('./helpers/jwt')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(jwt())

app.use(errorHandling)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
app.listen(port, () => {
    console.log(`Express server running on port: ${port}!`)
})

io.on("connection", (socket) => {
    const userID = socket.id
    const userIP = socket.handshake.address

    console.log(`Client: ${userID} with IP: ${userIP} connected!`)
})

setInterval(async () => {
    const stats = await getStats()
    io.emit('server_stats', stats)
}, 1000)