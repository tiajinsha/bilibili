'use strict'

import { app, dialog } from 'electron'
import initWindow from './services/windowManager'
import DisableButton from './config/DisableButton'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } from 'electron-devtools-installer'
import Server from './server'
async function startNode() {
  try {
    const serveStatus = await Server.StatrServer()
    return serveStatus
  } catch (error) {
    dialog.showErrorBox(
      '错误',
      error
    )
  }
}
function onAppReady() {
  new initWindow().initWindow()
  DisableButton.Disablef12(initWindow)
  startNode()

  if (process.env.NODE_ENV === 'development') {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`已安装 ${name}`))
      .catch(err => console.log(`无法安装: \n 可能发生得错误：网络连接问题 \n`, err))
  } 
}

app.isReady() ? onAppReady() : app.on('ready', onAppReady)
// 由于9.x版本问题，需要加入该配置关闭跨域问题
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

app.on('window-all-closed', () => {
  // 所有平台均为所有窗口关闭就退出软件
  app.quit()
})
app.on('browser-window-created', () => {
  console.log('window-created')
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-react-template')
    console.log('有于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('electron-react-template')
}
