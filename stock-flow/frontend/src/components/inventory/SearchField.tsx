import { Search } from 'lucide-react'

import { Input } from '../primitives/Input'

export function SearchField() {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar produto</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-soft" />
      <Input
        type="search"
        placeholder="Buscar por nome ou categoria"
        className="min-h-13 rounded-[1.25rem] pl-11 text-[15px] sm:text-sm"
        aria-label="Buscar produto por nome ou categoria"
      />
    </label>
  )
}
