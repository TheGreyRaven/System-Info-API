const io = require("socket.io-client")
const client = io.connect("http://localhost:8000")

client.on('connect', () => {
    console.log('Connected to socket server!')
})

client.on('server_stats', (data) => {
    const {
        cpuUsage,
        totalMem,
        usedMem,
        netIn
    } = data

    console.log(`CPU usage: ${cpuUsage}%, RAM used: ${usedMem} / ${totalMem} (Mb), network: ${netIn}`)
})