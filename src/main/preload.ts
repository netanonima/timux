import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message:string) => ipcRenderer.send('message', message),
  on0Shortcut: (callback) => ipcRenderer.on('0shortcut', callback),
  on1Shortcut: (callback) => ipcRenderer.on('1shortcut', callback)
})
