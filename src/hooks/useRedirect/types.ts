export type SearchEngineName = 'baidu' | 'bing' | 'google'

export type SearchEngineType = {
  [key in SearchEngineName]: {
    url?: string
    icon?: string
  }
}
