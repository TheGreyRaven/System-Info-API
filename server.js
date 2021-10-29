const io    = require("socket.io")(8000)
const osu   = require('node-os-utils')
const cpu   = osu.cpu
const mem   = osu.mem
const net   = osu.netstat

io.on("connection", (socket) => {
    const userID = socket.id
    const userIP = socket.handshake.address

    console.log(`Client: ${userID} with IP: ${userIP} connected!`)
})

setInterval(async () => {
    const cpuUsage  = await cpu.usage()
    const memUsed   = await mem.used()
    const netIn     = await net.inOut() // This is not supported on Windows machine but Linux works fine

    const serverStats = {
        cpuUsage: cpuUsage,
        totalMem: memUsed['totalMemMb'],
        usedMem: memUsed['usedMemMb'],
        netIn: (netIn != 'not supported' ? netIn : 'N/A')
    }
    
    io.emit('server_stats', serverStats)
}, 1000)