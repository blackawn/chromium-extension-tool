import type { SuggestionResultList } from '@/hooks/useSuggestion/types'

export interface SearchSuggestionProps extends
  Pick<React.DOMAttributes<HTMLDivElement>, | 'onMouseLeave'> {
  data: SuggestionResultList
  selected: number
  onClick?: (event: React.MouseEvent, keyword: string) => void
  onMouseEnter?: (index: number) => void
}