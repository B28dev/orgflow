import { Search } from 'lucide-react'

import { Input } from '../primitives/Input'

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar produto</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-soft" />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar produto pelo nome"
        className="min-h-13 rounded-[1.25rem] pl-11 text-[15px] sm:text-sm"
        aria-label="Buscar produto pelo nome"
      />
    </label>
  )
}
