import React, { useEffect, useState } from 'react'
import type { RouteComponentProps } from '@reach/router'
import { Flex } from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'

import { useMediaQuery } from '../contexts'
import { useAuth } from '../contexts/firebase'
import type { HereItem } from '../hooks/useHere'
import type { RatedPlace } from './RatingsPage'
import { Dashboard } from '../components/Dashboard'

const HomePage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()
  const [places, setPlaces] = useState<RatedPlace[]>([])
  const [appInfo, setAppInfo] = useState<AppInfo>({
    cities: 0,
    places: 0,
    ratings: 0,
    users: 0,
    positiveRatings: 0,
    negativeRatings: 0,
  })

  const [badRatedPlaces, setBadRatedPlaces] = useState<number>(0)
  const { firebase } = useAuth()

  useEffect(() => {
    const db = firebase.firestore()
    let cancelled = false

    db.collection('places')
      .orderBy('ratingsQty', 'desc')
      .limit(10)
      .get()
      .then((snap) => {
        const { docs } = snap
        const mapItems =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as HereItem
          }) ?? []

        if (!cancelled) setPlaces(mapItems as RatedPlace[])
      })

    db.collection('places')
      .where('averageRating', '<', 3.5)
      .get()
      .then((snap) => {
        setBadRatedPlaces(snap.size)
      })

    db.collection('info')
      .doc('app-information')
      .get()
      .then((doc) => {
        if (!doc.exists) return

        if (!cancelled) setAppInfo(doc.data() as AppInfo)
      })

    return () => {
      cancelled = true
    }
  }, [firebase])

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 56px)', overflowY: 'scroll' }
    : {}

  const goodRatedPlaces = appInfo.places - badRatedPlaces

  return (
    <Flex
      width="100%"
      direction="column"
      align="center"
      maxH="-webkit-fill-available"
      fontSize="sm"
      fontWeight="medium"
      bg={desktop ? 'white' : 'gray.50'}
      paddingY="3"
      {...layoutProps}
    >
      {children}
      <Dashboard
        goodRatedPlaces={goodRatedPlaces}
        badRatedPlaces={badRatedPlaces}
        appInfo={appInfo}
        places={places}
      />
    </Flex>
  )
}

export interface AppInfo {
  cities: number
  users: number
  places: number
  ratings: number
  positiveRatings: number
  negativeRatings: number
}

export default HomePage
