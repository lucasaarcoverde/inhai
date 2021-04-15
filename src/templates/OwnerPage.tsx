import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import { RouteComponentProps } from '@reach/router'

import React, { useEffect, useState } from 'react'
import { DefaultFooter } from '../components'

import OwnerRoute from '../components/OwnerRoute'
import { Topbar } from '../components/Topbar'
import { useAuth } from '../contexts/firebase'

import { RatedPlace, Rating } from './RatingsPage'
import { Comment } from '../components/RatedPlaceDetails/components/CommentList'

// TODO
function OwnerPage(props: React.PropsWithChildren<RouteComponentProps>) {
  const { children } = props
  const { firebase } = useAuth()
  const [place, setPlace] = useState<RatedPlace>()
  const [placeRatings, setPlaceRatings] = useState<Rating[]>([])

  // useEffect(() => {
  //   const db = firebase.firestore()

  //   const placesRef = db.collection('places')
  //   const ratingsRef = db.collection('ratings')

  //   placesRef
  //     .doc('13dfe496-aa26-4a2f-930a-c89a5181a676')
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const place = doc.data()
  //         setPlace(place as RatedPlace)
  //       }
  //     })

  //   ratingsRef
  //     .where('placeId', '==', '13dfe496-aa26-4a2f-930a-c89a5181a676')
  //     .get()
  //     .then((snap) => {
  //       const docs = snap.docs

  //       const ratings =
  //         docs.map((doc) => {
  //           if (doc.exists) {
  //             return doc.data()
  //           }
  //           return
  //         }) ?? []

  //       setPlaceRatings(ratings as Rating[])
  //     })
  // }, [firebase])

  return (
    <OwnerRoute path="/app">
      <Topbar />
      <Grid
        templateColumns="1fr 1fr 1fr"
        width="100vw"
        height="calc(100vh - 112px)"
      >
        {children}
        <Flex direction="column" justifyContent="space-between" padding="4">
          <Stack spacing="2" height="70vh" overflowY="scroll">
            {placeRatings.map(
              (rating) =>
                !!rating.comment && (
                  <Stack>
                    <Comment rating={rating} />
                    <Textarea placeholder="Adicione seu resposta" />
                  </Stack>
                )
            )}
          </Stack>
          <Button colorScheme="teal">Enviar</Button>
        </Flex>
        <Stack spacing="3" maxWidth="400px" padding="4">
          <Heading width="100%" fontSize="xl">
            {place?.title}
          </Heading>
          <Stack spacing="2">
            <label>
              Cidade
              <Input isReadOnly defaultValue={place?.address.city} />
            </label>
            <label>
              Estado
              <Input isReadOnly defaultValue={place?.address.state} />
            </label>
            <label>
              Rua
              <Input isReadOnly defaultValue={place?.address.street} />
            </label>
            <label>
              Complemento
              <Input isReadOnly defaultValue={place?.address.houseNumber} />
            </label>
            <label>
              Código Postal
              <Input isReadOnly defaultValue={place?.address.postalCode} />
            </label>
            <label>
              País
              <Input isReadOnly defaultValue={place?.address.countryName} />
            </label>
          </Stack>
        </Stack>
      </Grid>
      <DefaultFooter />
    </OwnerRoute>
  )
}

export default OwnerPage
