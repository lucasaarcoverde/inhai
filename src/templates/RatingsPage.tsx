import * as React from 'react'
import * as Sentry from '@sentry/gatsby'
import type { RouteComponentProps } from '@reach/router'
import type { FlexProps } from '@chakra-ui/react'
import {
  Box,
  Flex,
  useDisclosure,
  createStandaloneToast,
  Grid,
} from '@chakra-ui/react'
import { v4 } from 'uuid'
import { useCallback, useState } from 'react'
import type { FormikHelpers } from 'formik'

import { Search } from '../components/Search'
import type { HereItem } from '../hooks/useHere'
import { Map, PlaceDetails } from '../components'
import type { User, Timestamp } from '../contexts/firebase'
import { useAuth } from '../contexts/firebase'
import { useMediaQuery } from '../contexts'
import useFirebase from '../hooks/useFirebase'
import { FormRating } from '../components/FormRating'

export interface Rating {
  comment: string
  safePlace: boolean
  frequentedBy: boolean
  rate: number
  userId?: string
  user?: User | null
  placeId?: string
  anonymous?: boolean
  id: string
  like: number
  term: boolean
  reports: Report[]
  reportedBy: string[]
  createdAt: Timestamp
  visible?: boolean
}

export interface Report {
  notRelated: boolean
  aggressive: boolean
  userId: string
}

export interface RatedPlace extends HereItem {
  totalRatings: number
  averageRating: number
  totalSafePlace: number
  totalFrequentedBy: number
  safePlace: number
  unsafePlace: number
  frequentedBy: number
  notFrequentedBy: number
  rateDetails: {
    good: number
    bad: number
    excellent: number
    horrible: number
    neutral: number
  }
  ratingsQty: number
}

export interface RatingFormValue
  extends Omit<Rating, 'frequentedBy' | 'safePlace'> {
  place: RatedPlace
  frequentedBy: string
  safePlace: string
}

const RatingsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)
  const {
    isOpen: isSearchOpen,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure()

  const { firebase, user } = useAuth()
  const {
    addRating,
    addPlace,
    addCity,
    updatePlaceRating,
    updateInfo,
    updateRatingInfo,
    db,
  } = useFirebase()

  const toast = useCallback(createStandaloneToast(), [])
  const { desktop } = useMediaQuery()
  const {
    isOpen: isDetailsOpen,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure()

  const toastSuccess = useCallback(
    () =>
      toast({
        title: 'Avaliação realizada.',
        description: 'Obrigado por nos ajudar!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const toastError = useCallback(
    () =>
      toast({
        title: 'Erro ao realizar avaliação.',
        description: 'Tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  React.useEffect(() => {
    if (window) {
      const currentPlace = window.localStorage.getItem('rate-place')

      if (currentPlace) {
        window.localStorage.removeItem('rate-place')
        setSearchedItem(JSON.parse(currentPlace))
      }
    }
  }, [])

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const handleSubmit = useCallback(
    (values: RatingFormValue, actions: FormikHelpers<RatingFormValue>) => {
      const {
        place,
        frequentedBy: formFrequentedBy,
        safePlace: formSafePlace,
        ...restValues
      } = values

      const rate = Number(restValues.rate)

      const uuid = v4()
      const rating = {
        ...restValues,
        safePlace: formSafePlace === 'true',
        frequentedBy: formFrequentedBy === 'true',
        rate,
        user,
        like: 0,
        id: uuid,
        visible: true,
      }

      db.collection('places')
        .where('position', '==', values.place.position)
        .get()
        .then((snap) => {
          const [doc] = snap.docs

          if (doc?.exists) {
            const ratedPlace = doc.data() as RatedPlace

            updatePlaceRating(ratedPlace, rating)?.then(() =>
              addRating({ ...rating, placeId: ratedPlace.id })
            )
          } else {
            const placeId = v4()

            addPlace({ ...place, id: placeId }, rating)?.then(() => {
              addRating({
                ...rating,
                placeId,
              })

              updateInfo({
                places: firebase.firestore.FieldValue.increment(1),
              })

              db.collection('cities')
                .doc(place.address.city)
                .get()
                .then((cityDoc) => {
                  if (!cityDoc.exists) {
                    updateInfo({
                      cities: firebase.firestore.FieldValue.increment(1),
                    })
                    addCity(place.address.city)
                  }
                })
            })
          }
        })
        .then(() => {
          actions.resetForm()
          setSearchedItem({} as RatedPlace)
          setCurrentItem({} as RatedPlace)
          toastSuccess()
          updateRatingInfo(rating)
        })
        .catch((err) => {
          Sentry.captureException(err)
          toastError()
        })
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [user, firebase, db]
  )

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 56px)', overflowY: 'scroll' }
    : {}

  return (
    <Grid templateColumns={desktop ? '1fr 3fr' : '1fr'}>
      <Search
        isSearchOpen={isSearchOpen}
        onCloseSearch={onCloseSearch}
        setSearchedItem={setSearchedItem}
      />
      <Flex
        maxWidth="800px"
        paddingX={desktop ? '6' : '0'}
        direction="column"
        {...layoutProps}
      >
        <Box>
          <Map
            height="calc(40vh - 56px)"
            width={desktop ? '100%' : '100vw'}
            onOpenDetails={onOpenDetails}
            searchedItem={searchedItem}
            setCurrentItem={setCurrentItem}
          />
        </Box>
        <FormRating
          onOpenSearch={onOpenSearch}
          handleSubmit={handleSubmit}
          searchedItem={searchedItem}
        />
      </Flex>
      <PlaceDetails
        isDetailsOpen={isDetailsOpen}
        onCloseDetails={onCloseDetails}
        item={currentItem}
      />
      {children}
    </Grid>
  )
}

export default RatingsPage
