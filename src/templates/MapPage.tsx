import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Grid, IconButton, useDisclosure } from '@chakra-ui/react'

import { Search, Map, Tutorial, Sidebar } from '../components'
import { HereItem } from '../hooks/useHere'
import { useEffect, useState } from 'react'
import { RatedPlaceDetails } from '../components'
import { useAuth } from '../contexts/firebase'
import { RatedPlace } from './RatingsPage'
import { useMediaQuery } from '../contexts'
import { useLayout } from '../contexts/layout'
import { AddIcon } from '@chakra-ui/icons'
import { navigate } from 'gatsby'

const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { searchOpen, onCloseSearch } = useLayout()

  const {
    isOpen: isDetailsOpen,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure()

  const { desktop } = useMediaQuery()

  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const { firebase } = useAuth()

  const [items, setItems] = useState<RatedPlace[]>()

  useEffect(() => {
    if (items) return

    const db = firebase.firestore()

    db.collection('places')
      .where('averageRating', '>=', 3)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const mapItems =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as HereItem
          }) ?? []

        setItems(mapItems as RatedPlace[])
      })
  }, [items])

  return (
    <Grid templateColumns={desktop ? '1fr 2fr 1fr' : '1fr'}>
      {desktop && <Sidebar />}
      <Map
        items={items}
        width={desktop ? '100%' : '100vw'}
        onOpenDetails={onOpenDetails}
        searchedItem={searchedItem}
        setCurrentItem={setCurrentItem}
      />
      <Search
        isSearchOpen={searchOpen}
        onCloseSearch={onCloseSearch}
        setSearchedItem={setSearchedItem}
      />
      <RatedPlaceDetails
        isDetailsOpen={isDetailsOpen}
        onCloseDetails={onCloseDetails}
        item={currentItem}
      />
      {children}
      {!desktop && (
        <IconButton
          aria-label="ir para página de avaliações"
          borderRadius="full"
          icon={<AddIcon />}
          position="fixed"
          right="6"
          bottom="104px"
          size="lg"
          colorScheme="teal"
          zIndex="docked"
          onClick={() => navigate('/app/ratings')}
        />
      )}
      {desktop && <Tutorial />}
    </Grid>
  )
}

export default MapPage
