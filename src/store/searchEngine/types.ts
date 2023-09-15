export type SearchEngineName = 'baidu' | 'bing' | 'google'

export interface SearchEngine {
  icon: string
  name: SearchEngineName
  url: string
}
