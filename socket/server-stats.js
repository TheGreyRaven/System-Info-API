const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const net = osu.netstat

const getServerStats = async () => {
    const cpuUsage = await cpu.usage()
    const memUsed = await mem.used()
    const netIn = await net.inOut() // This is not supported on Windows machine but on Linux it works fine

    const serverStats = {
        cpuUsage: cpuUsage,
        totalMem: memUsed['totalMemMb'],
        usedMem: memUsed['usedMemMb'],
        netIn: (netIn != 'not supported' ? netIn : 'N/A')
    }

    return serverStats
}

module.exports = getServerStats