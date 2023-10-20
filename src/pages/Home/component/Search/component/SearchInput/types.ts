export interface SearchEngineRef {
  url: string
}

export interface SearchInputProps extends
  React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: (event: React.MouseEvent) => void
}
