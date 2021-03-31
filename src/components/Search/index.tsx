import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import useHere, { HereItem } from '../../hooks/useHere'

import { MobileSearch } from './MobileSearch'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])

  const [queryValue] = useDebounce(query, 400)

  const { discoverAddress } = useHere()

  useEffect(() => {
    if (queryValue.length > 0) {
      discoverAddress({
        q: queryValue,
      })
        .then(({ items }) => setItems(items))
        .catch((e) => console.log('err', e))
    } else {
      setItems([])
    }
  }, [queryValue])

  return (
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
  setSearchedItem: React.Dispatch<React.SetStateAction<HereItem>>
}
