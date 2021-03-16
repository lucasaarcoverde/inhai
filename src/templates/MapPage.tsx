import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDisclosure } from '@chakra-ui/react'

import { Search, MapSearch, Layout } from '../components'
import { HereItem } from '../hooks/useHere'
import { useState } from 'react'
import { PlaceDetails } from '../components/PlaceDetails'

const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const {
    isOpen: isSearchOpen,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure()

  const {
    isOpen: isDetailsOpen,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure()

  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  const [currentItem, setCurrentItem] = useState<HereItem>({} as HereItem)

  return (
    <React.Fragment>
      <Layout onOpenSearch={onOpenSearch}>
        <title>Map</title>

        <MapSearch
          onOpenDetails={onOpenDetails}
          searchedItem={searchedItem}
          setCurrentItem={setCurrentItem}
        />
        <PlaceDetails
          isDetailsOpen={isDetailsOpen}
          onCloseDetails={onCloseDetails}
          item={currentItem}
        />
        <Search
          isSearchOpen={isSearchOpen}
          onCloseSearch={onCloseSearch}
          setSearchedItem={setSearchedItem}
        />
        {children}
      </Layout>
    </React.Fragment>
  )
}

export default MapPage
