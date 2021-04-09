import { Stack, Flex, Slide, CloseButton, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RatedPlace, Rating } from '../../templates/RatingsPage'
import { RatingsCard } from './components/RatingsCard'
import { PlaceCard } from './components/PlaceCard'
import { useAuth } from '../../contexts/firebase'
import { RatingsDetails } from './components/RatingsDetails'
import { useMediaQuery } from '../../contexts'

export function RatedPlaceDetails(props: RatedPlaceDetailsProps) {
  const { isDetailsOpen, onCloseDetails, item } = props
  const [ratings, setRatings] = useState([] as Rating[])
  const [loading, setLoading] = useState(true)
  const { firebase } = useAuth()
  const { desktop } = useMediaQuery()

  useEffect(() => {
    if (!item.id) return

    setLoading(true)

    const db = firebase.firestore()
    db.collection('ratings')
      .where('placeId', '==', item.id)
      .limit(50)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const ratings =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as Rating
          }) ?? []

        setRatings(ratings as Rating[])
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 100)
      })
      .catch((e) => console.log(e))
  }, [item])

  return (
    <Slide
      direction={desktop ? 'right' : 'bottom'}
      in={isDetailsOpen}
      style={{
        zIndex: 13,
        margin: 0,
        top: 0,
        bottom: 0,
        width: desktop ? '35%' : '100vw',
        maxWidth: desktop ? '500px' : '100vw',
        maxHeight: '-webkit-fill-available',
        height: '100vh',
      }}
    >
      <Flex
        maxWidth="500px"
        position="fixed"
        bg="gray.50"
        width="100vw"
        justifyContent="flex-start"
        align="center"
        paddingX="1"
        shadow="sm"
        borderBottom="solid"
        borderWidth="1px"
        borderColor="gray.100"
        zIndex={13}
      >
        <CloseButton zIndex={14} onClick={onCloseDetails} />
      </Flex>
      <Box bg="gray.50" height="100%" overflowY="scroll" paddingBottom="3">
        <Stack spacing="3" paddingTop="32px">
          <RatingsCard {...item} />
          <PlaceCard {...item} />
          <RatingsDetails loading={loading} {...item} ratings={ratings} />
        </Stack>
      </Box>
    </Slide>
  )
}

export interface RatedPlaceDetailsProps {
  item: RatedPlace
  isDetailsOpen: boolean
  onCloseDetails: () => void
}
