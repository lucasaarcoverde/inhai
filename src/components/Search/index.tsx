import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useMediaQueryContext } from '../../contexts'
import useHere, { HereItem } from '../../hooks/useHere'
import { Autocomplete } from './components/Autocomplete'

import { MobileSearch } from './MobileSearch'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])
  const { setSearchedItem } = props
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

  const { desktop } = useMediaQueryContext()

  return desktop ? (
    <Flex
      width="100%"
      justifyContent="flex-start"
      shadow="-3px 4px 6px -4px rgba(0, 0, 0, 0.1), 0 2px 0px -1px rgba(0, 0, 0, 0.06)"
    >
      <Autocomplete
        setSearchedItem={setSearchedItem}
        minWidth="300px"
        maxWidth="350px"
        setSearch={setQuery}
        searchValue={query}
        searchItems={items}
      />
    </Flex>
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
  isSearchOpen?: boolean
  onCloseSearch?: () => void
  setSearchedItem: React.Dispatch<React.SetStateAction<HereItem>>
}
