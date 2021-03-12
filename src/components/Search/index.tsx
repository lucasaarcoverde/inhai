import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import useHere, { HereItem } from '../../hooks/useHere'

import { useMediaQueryContext } from '../../contexts'
import { DesktopSearch } from './DesktopSearch'
import { MobileSearch } from './MobileSearch'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])

  const [queryValue] = useDebounce(query, 400)

  const { discoverAddress } = useHere()

  useEffect(() => {
    if (queryValue.length > 0) {
      console.log(queryValue)
      discoverAddress({
        q: queryValue,
      })
        .then(({ items }) => setItems(items))
        .catch((e) => console.log('err', e))
    } else {
      setItems([])
    }
  }, [queryValue])

  const { desktop } = useMediaQueryContext()
  console.log(items)
  return desktop ? (
    <DesktopSearch {...props} setSearch={setQuery} searchItems={items} />
  ) : (
    <MobileSearch
      {...props}
      setSearch={setQuery}
      searchValue={query}
      searchItems={items}
    />
  )
}

export interface SearchProps {
  isSearchOpen: boolean
  onCloseSearch: () => void
  setItem: React.Dispatch<React.SetStateAction<HereItem>>
}
