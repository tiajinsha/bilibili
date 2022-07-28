import { ipcMain, dialog, BrowserWindow, IpcMainInvokeEvent } from 'electron'
import Server from '../server'
import { winURL } from '../config/StaticPath'
import DownloadFile from './downloadFile'
import Update from './checkupdate';
import { ligo3D } from '../config/StaticPath';
var newWin
export default {
  Mainfunc(IsUseSysTitle: boolean) {
    const updater = new Update();
    ipcMain.on('open3D', (event, args) => {
      if (newWin) {
        newWin.focus() // 存在 则聚焦
        return
      }
      newWin = new BrowserWindow({
        width: 900,
        height: 620,
        minWidth: 900,
        minHeight: 620,
        frame: true,//是否显示边缘框
        fullscreen: true, //是否全屏显示
        title: "web3D 多人联机demo",
        autoHideMenuBar: true
      })
      newWin.loadURL("http://localhost:25565")  // 此处写 你要打开的路由地址
      newWin.on('close', () => {
        newWin = null
      })
    })
    ipcMain.handle('IsUseSysTitle', async (event: IpcMainInvokeEvent, args: unknown) => {
      return IsUseSysTitle
    })
    ipcMain.handle('windows-mini', (event, args) => {
      BrowserWindow.fromWebContents(event.sender)?.minimize()
    })
    ipcMain.handle('window-max', async (event, args) => {
      if (BrowserWindow.fromWebContents(event.sender)?.isMaximized()) {
        BrowserWindow.fromWebContents(event.sender)?.unmaximize()
        return { status: false }
      } else {
        BrowserWindow.fromWebContents(event.sender)?.maximize()
        return { status: true }
      }
    })
    ipcMain.handle('window-close', (event, args) => {
      BrowserWindow.fromWebContents(event.sender)?.close()
    })
    ipcMain.handle('start-download', (event, msg) => {
      new DownloadFile(BrowserWindow.fromWebContents(event.sender), msg.downloadUrl).start()
    })
    ipcMain.handle('check-update', (event, args) => {
      updater.checkUpdate(BrowserWindow.fromWebContents(event.sender))
    })
    ipcMain.handle('confirm-update', () => {
      updater.quitInstall()
    })
    ipcMain.handle('open-messagebox', async (event, arg) => {
      const res = await dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), {
        type: arg.type || 'info',
        title: arg.title || '',
        buttons: arg.buttons || [],
        message: arg.message || '',
        noLink: arg.noLink || true
      })
      return res
    })
    ipcMain.handle('open-errorbox', (event, arg) => {
      dialog.showErrorBox(
        arg.title,
        arg.message
      )
    })
    ipcMain.handle('statr-server', async () => {
      try {
        const serveStatus = await Server.StatrServer()
        console.log(serveStatus)
        return serveStatus
      } catch (error) {
        dialog.showErrorBox(
          '错误',
          error
        )
      }
    })
    ipcMain.handle('stop-server', async (event, arg) => {
      try {
        const serveStatus = await Server.StopServer()
        return serveStatus
      } catch (error) {
        dialog.showErrorBox(
          '错误',
          error
        )
      }
    })
    ipcMain.handle('open-win', (event, arg) => {
      const ChildWin = new BrowserWindow({
        height: 595,
        useContentSize: true,
        width: 842,
        autoHideMenuBar: true,
        minWidth: 842,
        show: false,
        frame: IsUseSysTitle,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false,
          // 如果是开发模式可以使用devTools
          // devTools: process.env.NODE_ENV === 'development',
          devTools: true,
          // 在macos中启用橡皮动画
          scrollBounce: process.platform === 'darwin'
        }
      })
      ChildWin.loadURL(winURL + `#${arg.url}`)
      ChildWin.webContents.once('dom-ready', () => {
        ChildWin.show()
        ChildWin.webContents.openDevTools({ mode: 'undocked', activate: true })
        /*     if (process.env.NODE_ENV === 'development') {
              ChildWin.webContents.openDevTools({ mode: 'undocked', activate: true })
            } */
        ChildWin.webContents.send('send-data', arg.sendData)
        if (arg.IsPay) {
          // 检查支付时候自动关闭小窗口
          const testUrl = setInterval(() => {
            const Url = ChildWin.webContents.getURL()
            if (Url.includes(arg.PayUrl)) {
              ChildWin.close()
            }
          }, 1200)
          ChildWin.on('close', () => {
            clearInterval(testUrl)
          })
        }
      })
    })
  }
}
