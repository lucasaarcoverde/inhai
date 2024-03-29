import React, { useCallback, useEffect, useState } from 'react'
import * as Sentry from '@sentry/gatsby'
import {
  Heading,
  Divider,
  Stack,
  Spinner,
  Center,
  Flex,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react'
import { navigate } from 'gatsby'

import type { RatedPlace, Rating } from '../../../templates/RatingsPage'
import { CommentList } from './CommentList'
import { RatingBar } from './RatingBar'
import { useAuth } from '../../../contexts/firebase'

export function RatingsDetails(props: RatedPlace) {
  const [ratings, setRatings] = useState([] as Rating[])
  const [lastKey, setLastKey] = useState('')
  const [loading, setLoading] = useState(true)

  const { firebase } = useAuth()

  const { id, ratingsQty = 0, rateDetails } = props
  const { good = 0, bad = 0, horrible = 0, excellent = 0, neutral = 0 } =
    rateDetails ?? {}

  useEffect(() => {
    if (!id) return

    setRatings([])
    setLoading(true)
    const db = firebase.firestore()

    db.collection('ratings')
      .where('placeId', '==', id)
      .orderBy('createdAt')
      .limit(5)
      .get()
      .then((snap) => {
        const { docs } = snap
        let currentLastKey = ''

        const promises = docs.map(async (doc) => {
          if (!doc.exists) return
          currentLastKey = doc.data().createdAt
          const rating = doc.data() as Rating
          const { anonymous } = rating

          const fetchedUser = await db
            .collection('users')
            .doc(rating?.user?.id)
            .get()
            .then((userDoc) => {
              return userDoc.exists ? userDoc.data() : rating.user
            })

          const rateReturn = !anonymous
            ? { ...rating, user: fetchedUser }
            : { ...rating, user: {} }

          return rateReturn
        })

        Promise.all(promises).then((currentRatings) => {
          setLastKey(currentLastKey)
          const filteredRatings = currentRatings.filter(
            (rating) => rating?.visible !== false
          )

          setRatings(filteredRatings as Rating[])
        })
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 100)
      })
  }, [id])

  const loadMoreRatings = useCallback(
    (placeId: string) => {
      setLoading(true)
      const db = firebase.firestore()

      db.collection('ratings')
        .where('placeId', '==', placeId)
        .orderBy('createdAt')
        .startAfter(lastKey)
        .limit(10)
        .get()
        .then((snap) => {
          const { docs } = snap
          let currentLastKey = ''

          const promises = docs.map(async (doc) => {
            if (!doc.exists) return
            currentLastKey = doc.data().createdAt
            const rating = doc.data() as Rating
            const { anonymous } = rating

            const fetchedUser = await db
              .collection('users')
              .doc(rating?.user?.id)
              .get()
              .then((userDoc) => {
                return userDoc.exists ? userDoc.data() : rating.user
              })

            const rateReturn = !anonymous
              ? { ...rating, user: fetchedUser }
              : { ...rating, user: {} }

            return rateReturn
          })

          Promise.all(promises).then((currentRatings) => {
            const filteredRatings = currentRatings.filter(
              (rating) => rating?.visible !== false
            )

            setLastKey(currentLastKey)
            setRatings((prev) => [...prev, ...filteredRatings] as Rating[])
            setLoading(false)
          })
        })
        .catch((err) => {
          setLoading(false)
          Sentry.captureException(err)
        })
    },
    [firebase, lastKey]
  )

  return (
    <Stack
      spacing="4"
      paddingX="4"
      paddingY="3"
      bg="white"
      shadow="sm"
      borderY="solid"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Flex justifyContent="space-between" align="center">
        <HStack spacing="1" align="center">
          <Heading fontSize="lg" color="teal.500">
            Avaliações
          </Heading>
          <Text fontSize="sm" color="gray.500">
            ({`${ratingsQty}`})
          </Text>
        </HStack>
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => {
            window.localStorage.setItem('rate-place', JSON.stringify(props))
            navigate('/app/ratings')
          }}
        >
          Avalie esse local
        </Button>
      </Flex>
      <Stack spacing={2}>
        <RatingBar label="Excelente" points={excellent} total={ratingsQty} />
        <RatingBar label="Bom" points={good} total={ratingsQty} />
        <RatingBar label="Razoável" points={neutral} total={ratingsQty} />
        <RatingBar label="Ruim" points={bad} total={ratingsQty} />
        <RatingBar label="Horrível" points={horrible} total={ratingsQty} />
      </Stack>
      <Divider />
      {loading && ratings.length === 0 ? (
        <Center>
          <Spinner size="md" color="teal.500" />
        </Center>
      ) : (
        <CommentList
          {...props}
          loading={loading}
          onLoadMoreRatings={() => loadMoreRatings(id)}
          limit={ratings.length >= ratingsQty}
          ratings={ratings}
        />
      )}
    </Stack>
  )
}
