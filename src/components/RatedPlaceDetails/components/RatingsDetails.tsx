import React, { useCallback, useEffect, useState } from 'react'
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
import { RatedPlace, Rating } from '../../../templates/RatingsPage'
import { CommentList } from './CommentList'
import { RatingBar } from './RatingBar'
import { navigate } from 'gatsby'
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

    setLoading(true)
    const db = firebase.firestore()
    db.collection('ratings')
      .where('placeId', '==', id)
      .orderBy('createdAt')
      .limit(5)
      .get()
      .then((snap) => {
        const docs = snap.docs
        let lastKey = ''
        const ratings =
          docs.map((doc) => {
            if (!doc.exists) return
            lastKey = doc.data().createdAt
            const rating = doc.data() as Rating
            const { anonymous } = rating

            const rateReturn = !anonymous ? rating : { ...rating, user: {} }

            return rateReturn
          }) ?? []

        setLastKey(lastKey)
        setRatings(ratings as Rating[])
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 100)
      })
  }, [id])

  const loadMoreRatings = useCallback(
    (id: string) => {
      setLoading(true)
      const db = firebase.firestore()
      db.collection('ratings')
        .where('placeId', '==', id)
        .orderBy('createdAt')
        .startAfter(lastKey)
        .limit(10)
        .get()
        .then((snap) => {
          const docs = snap.docs
          let lastKey = ''
          const ratings =
            docs.map((doc) => {
              if (!doc.exists) return

              lastKey = doc.data().createdAt
              return doc.data() as Rating
            }) ?? []

          setLastKey(lastKey)
          setRatings((prev) => [...prev, ...ratings] as Rating[])
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
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
