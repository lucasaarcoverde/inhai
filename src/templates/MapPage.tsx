import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useDisclosure } from '@chakra-ui/react'

import { Search, Map, Layout } from '../components'
import { HereItem } from '../hooks/useHere'
import { useEffect, useState } from 'react'
import { PlaceDetails } from '../components/PlaceDetails'
import { MapProvider } from '../contexts/map'
import { useAuth } from '../contexts/firebase'

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

  const { firebase } = useAuth()

  const [items, setItems] = useState<HereItem[]>()

  useEffect(() => {
    if (items) return

    const db = firebase.firestore()

    db.collection('places')
      .where('positiveRating', '>=', 3)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const mapItems =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as HereItem
          }) ?? []

        console.log('map items', mapItems)
        setItems(mapItems as HereItem[])
      })
  }, [items])

  return (
    <MapProvider items={items}>
      <Layout onOpenSearch={onOpenSearch}>
        <title>Map</title>

        <Map
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
