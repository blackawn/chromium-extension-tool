export interface SearchEngineRef {
  url: string
}

export interface SearchInputProps extends
  React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: React.MouseEventHandler<HTMLDivElement> | undefined
}
