module.exports = {
    build: {
        env: require('./prod.env'),
        DisableF12: false
    },
    dev: {
        env: require('./dev.env'),
        removeElectronJunk: true,
        chineseLog: false,
        port: 9080,
    },
    UseStartupChart: true,
    IsUseSysTitle: true,
    BuiltInServerPort: 25565,
    DllFolder: "lib"
}