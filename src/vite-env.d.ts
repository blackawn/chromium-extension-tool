/// <reference types="vite/client" />


// vite env
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


interface BaiduCallback {
  p: boolean,
  q: string,
  s: string[]
}

interface BingCallback {
  AS: {
    Query: string
    FullResults: number
    Results: Array<{
      Type: 'AS' | 'VS'
      Suggests: Array<{
        Txt: string
        Type: string
        Sk: string
        HCS: number
      }>
    }>
  }
}

interface GoogleCallback {
  0: string
  1: Array<string>
  2: Array<string>
  3: Array
  4: {
    "google:clientdata": {
      bpc: boolean
      tlw: boolean
    }
    "google:suggestrelevance": Array<string>
    "google:suggestsubtypes": Array<Array<number>>
    "google:suggesttype": Array<string>
    "google:verbatimrelevance": number
  }
}

interface Window {
  searchEngine: {
    baidu: (result: BaiduCallback) => void
    bing: (data: BingCallback) => void
    google: (data: GoogleCallback) => void
  }
}