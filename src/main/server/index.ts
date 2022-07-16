/* eslint-disable prefer-promise-reject-errors */
import {app} from './bilibili-api/src/index'
import config from '@config/index'
const port = config.BuiltInServerPort

export default {
  StatrServer() {
    return new Promise((resolve, reject) => {
      app.listen(port,()=>{
        console.log("服务端运行中:" + port);
      }) 
      app.on('error', (error) => {
        switch (error.code) {
          case 'EACCES':
            reject('权限不足内置服务器启动失败，请使用管理员权限运行。')
            break
          case 'EADDRINUSE':
            reject('内置服务器端口已被占用，请检查。')
            break
          default:
            reject(error)
        }
      })
    })
  },
  StopServer() {
    return new Promise((resolve, reject) => {
      if (app) {
        app.close()
        app.on('close', () => {
          resolve(1)
        })
      } else {
        reject('服务端尚未开启')
      }
    })
  }
}
