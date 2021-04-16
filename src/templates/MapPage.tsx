import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Grid,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'

import { Search, Map, Tutorial, Sidebar } from '../components'
import { HereItem } from '../hooks/useHere'
import { useEffect, useState } from 'react'
import { RatedPlaceDetails } from '../components'
import { useAuth } from '../contexts/firebase'
import { RatedPlace } from './RatingsPage'
import { useMediaQuery } from '../contexts'
import { useLayout } from '../contexts/layout'
import { navigate } from 'gatsby'
import { BiLocationPlus } from 'react-icons/bi'

const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { searchOpen, onCloseSearch } = useLayout()
  const [firstTime, setFirstTime] = useState(false)
  const { user } = useAuth()

  const handleTutorialClose = () => {
    setFirstTime(true)
    const timer = setTimeout(() => setFirstTime(false), 4000)
    return () => clearTimeout(timer)
  }

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

    if (!user) return

    const avgRating = user.id === process.env.GATSBY_FIREBASE_ADMIN_ID ? 1 : 3.5

    const db = firebase.firestore()

    db.collection('places')
      .where('averageRating', '>=', avgRating)
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
  }, [items, user])

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
        <Tooltip
          label="Comece avaliando um local!"
          placement="top"
          isOpen={firstTime}
          fontWeight="semibold"
          zIndex="9"
          hasArrow
        >
          <IconButton
            aria-label="Avaliar local"
            borderRadius="full"
            icon={<Icon as={BiLocationPlus} boxSize="8" />}
            position="fixed"
            right="8"
            variant="ghost"
            shadow="lg"
            bg="white"
            bottom="104px"
            height="56px"
            width="56px"
            colorScheme="teal"
            zIndex="docked"
            onClick={() => navigate('/app/ratings')}
          />
        </Tooltip>
      )}
      <Tutorial handleClose={handleTutorialClose} />
    </Grid>
  )
}

export default MapPage
