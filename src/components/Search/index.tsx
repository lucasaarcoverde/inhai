import { Box, Slide, useDisclosure } from '@chakra-ui/react'
import useGeolocation from '@rooks/use-geolocation'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useMediaQuery } from '../../contexts'
import { useAuth } from '../../contexts/firebase'
import type { HereItem } from '../../hooks/useHere'
import useHere from '../../hooks/useHere'
import { Autocomplete } from './components/Autocomplete'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])
  const geoObj = useGeolocation()

  const { isOpen } = useDisclosure()
  const { desktop } = useMediaQuery()
  const { user } = useAuth()

  const { setSearchedItem, isSearchOpen, onCloseSearch } = props
  const [queryValue] = useDebounce(query, 400)

  const { discoverAddress } = useHere()

  useEffect(() => {
    if (!user) return

    const defaultLocation = { lat: -7.23072, lng: -35.8817 }

    if (isOpen) return
    let cancelled = false
    const at =
      geoObj?.lat && geoObj?.lng
        ? `${geoObj.lat},${geoObj.lng}`
        : `${defaultLocation.lat},${defaultLocation.lng}`

    if (queryValue.length > 0) {
      discoverAddress({
        q: queryValue,
        at,
      }).then(({ items: hereItems }) => {
        if (!cancelled) {
          setItems(hereItems)
        }
      })
    } else if (!cancelled) {
      setItems([])
    }

    return () => {
      cancelled = true
    }
  }, [queryValue, user, isSearchOpen, isOpen, geoObj])

  return (
    <>
      {desktop ? (
        <Box shadow="xl" zIndex={15}>
          <Autocomplete
            setSearchedItem={setSearchedItem}
            height="calc(100vh - 168px)"
            width="100%"
            maxW="25vw"
            marginTop="112px"
            setSearch={setQuery}
            searchValue={query}
            searchItems={items}
            queryValue={queryValue}
          />
        </Box>
      ) : (
        <Slide
          direction="bottom"
          in={isSearchOpen}
          style={{
            zIndex: 15,
            margin: 0,
            maxWidth: '100vw',
            maxHeight: '-webkit-fill-available',
            height: '100vh',
          }}
        >
          <Autocomplete
            setSearchedItem={setSearchedItem}
            setSearch={setQuery}
            searchValue={query}
            searchItems={items}
            queryValue={queryValue}
            onCloseSearch={onCloseSearch}
          />
        </Slide>
      )}
    </>
  )
}

export interface SearchProps {
  isSearchOpen?: boolean
  onCloseSearch?: () => void
  setSearchedItem: React.Dispatch<React.SetStateAction<HereItem>>
}
