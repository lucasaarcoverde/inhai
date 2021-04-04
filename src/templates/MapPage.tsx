import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDisclosure } from '@chakra-ui/react'

import { Search, Map, Layout } from '../components'
import { HereItem } from '../hooks/useHere'
import { useEffect, useState } from 'react'
import { PlaceDetails } from '../components/PlaceDetails'
import { MapProvider } from '../contexts/map'
import { useAuth } from '../contexts/firebase'
import { RatedPlace } from './RatingsPage'
import { useMediaQueryContext } from '../contexts'

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
  const { desktop } = useMediaQueryContext()

  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const { firebase } = useAuth()

  const [items, setItems] = useState<HereItem[]>()

  useEffect(() => {
    if (items) return

    const db = firebase.firestore()

    db.collection('places')
      .where('averageRating', '>=', 3.5)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const mapItems =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as HereItem
          }) ?? []

        setItems(mapItems as HereItem[])
      })
  }, [items])

  return (
    <MapProvider items={items}>
      <Layout onOpenSearch={onOpenSearch}>
        <Map
          paddingBottom={desktop ? '48px' : '0'}
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
    </MapProvider>
  )
}

export default MapPage
