/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void,
  on0Shortcut: (callback: any) => void,
  on1Shortcut: (callback: any) => void,
  onInfo: (callback: any) => void,
  onAbout: (callback: any) => void,
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
