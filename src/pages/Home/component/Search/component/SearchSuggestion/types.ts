export interface SearchSuggestionProps extends
  Pick<React.DOMAttributes<HTMLDivElement>, | 'onMouseLeave'> {
  data: Array<string>
  selected: number
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, keyword: string) => void
  onMouseEnter: (index: number) => void
}