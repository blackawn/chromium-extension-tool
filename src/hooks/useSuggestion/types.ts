export interface BaiduCallback {
  p: boolean,
  q: string,
  s: string[]
}

export interface BingCallback {
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

export interface GoogleCallback {
  0: string
  1: Array<string>
  2: Array<string>
  3: []
  4: {
    'google:clientdata': {
      bpc: boolean
      tlw: boolean
    }
    'google:suggestrelevance': Array<string>
    'google:suggestsubtypes': Array<Array<number>>
    'google:suggesttype': Array<string>
    'google:verbatimrelevance': number
  }
}