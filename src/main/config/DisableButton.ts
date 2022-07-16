import { globalShortcut } from 'electron'
import config from '@config/index'

export default {
  Disablef12 (initWindow) {
      globalShortcut.register('f12', () => {
        initWindow.openDevTools()
      })
  }
}
