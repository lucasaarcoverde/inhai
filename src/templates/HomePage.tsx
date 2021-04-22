import React, { useEffect, useState } from 'react'
import type { RouteComponentProps } from '@reach/router'
import {
  Center,
  HStack,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Stack,
  Text,
  Grid,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Sidebar } from '../components'
import { useMediaQuery } from '../contexts'
import { BadRatedPlace } from '../components/icons/BadRatedPlace'
import { GoodRatedPlace } from '../components/icons/GoodRatedPlace'
import { PlaceSlider } from '../components/Slider'
import { useAuth } from '../contexts/firebase'
import type { HereItem } from '../hooks/useHere'
import type { RatedPlace } from './RatingsPage'

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
  const [sexualOrientation, setSexualOrientation] = useState<number>(0)
  const [genderIdentity, setGenderIdentity] = useState<number>(0)
  const [lgbtphobia, setLgbtphobia] = useState<number>(0)

  const { firebase } = useAuth()

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "places.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

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

    db.collection('users')
      .where('sexualOrientation', '==', 'do-not-know')
      .get()
      .then((snap) => {
        setSexualOrientation(snap.size)
      })

    db.collection('users')
      .where('genderIdentity', '==', 'do-not-know')
      .get()
      .then((snap) => {
        setGenderIdentity(snap.size)
      })

    db.collection('users')
      .where('lgbtphobia', '==', true)
      .get()
      .then((snap) => {
        setLgbtphobia(snap.size)
      })

    return () => {
      cancelled = true
    }
  }, [firebase])

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 112px)', overflowY: 'scroll' }
    : {}

  const goodRatedPlaces = appInfo.places - badRatedPlaces

  return (
    <Grid templateColumns={desktop ? '1fr 2fr 1fr' : '1fr'}>
      {desktop && <Sidebar />}
      <Flex
        width="100%"
        direction="column"
        maxH="-webkit-fill-available"
        fontSize="sm"
        fontWeight="medium"
        bg={desktop ? 'white' : 'gray.50'}
        paddingY="3"
        {...layoutProps}
      >
        {children}
        <Stack spacing="3">
          <Grid
            boxShadow="sm"
            bg="white"
            templateColumns="1fr 1fr"
            paddingY="3"
          >
            <Flex justifyContent="center">
              <CircularProgress
                value={
                  !appInfo.places && !badRatedPlaces
                    ? 0
                    : (goodRatedPlaces * 100) / appInfo.places
                }
                size="100px"
                color="green.400"
              >
                {!!appInfo.places && !!badRatedPlaces && (
                  <CircularProgressLabel>
                    {((goodRatedPlaces * 100) / appInfo.places).toFixed(1)}%
                  </CircularProgressLabel>
                )}
              </CircularProgress>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <HStack>
                <GoodRatedPlace boxSize="6" />
                <Text fontSize="xs">LGBTI+ friendly</Text>
              </HStack>
              <Text paddingLeft="8" fontSize="xs" color="gray.600">
                {appInfo.places - badRatedPlaces} locais
              </Text>
              <Text paddingLeft="8" fontSize="xs" color="gray.600">
                {appInfo.positiveRatings} avaliações positivas
              </Text>
            </Flex>
          </Grid>

          <Grid
            boxShadow="sm"
            bg="white"
            templateColumns="1fr 1fr"
            paddingY="3"
          >
            <Flex justifyContent="center">
              <CircularProgress
                value={
                  !appInfo.places && !badRatedPlaces
                    ? 0
                    : (badRatedPlaces * 100) / appInfo.places
                }
                size="100px"
                color="red.400"
              >
                {!!appInfo.places && !!badRatedPlaces && (
                  <CircularProgressLabel>
                    {((badRatedPlaces * 100) / appInfo.places).toFixed(1)}%
                  </CircularProgressLabel>
                )}
              </CircularProgress>
            </Flex>
            <Flex direction="column" justifyContent="center">
              <HStack>
                <BadRatedPlace boxSize="6" />
                <Text fontSize="xs">Não LGBTI+ friendly</Text>
              </HStack>
              <Text paddingLeft="8" fontSize="xs" color="gray.600">
                {badRatedPlaces} locais
              </Text>
              <Text paddingLeft="8" fontSize="xs" color="gray.600">
                {appInfo.negativeRatings} avaliações negativas
              </Text>
            </Flex>
          </Grid>

          <Box
            paddingX="4"
            paddingTop="4"
            paddingBottom="8"
            maxWidth="100vw"
            bg="white"
          >
            <Heading fontSize="lg" color="teal.500">
              Locais mais avaliados
            </Heading>
            <PlaceSlider places={places} />
          </Box>

          <Flex direction="column" bg="white" boxShadow="sm" paddingY="4">
            <Flex justifyContent="center">
              <Box width="100%" maxWidth="300px">
                <Img fluid={data.file.childImageSharp.fluid} alt="" />
              </Box>
            </Flex>
            <Flex direction="column" paddingX="4" color="teal.500">
              <Text fontWeight="bold" fontSize="md">
                {appInfo?.cities}
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                CIDADES
              </Text>
            </Flex>
          </Flex>

          <Box paddingY="4" bg="white">
            <Grid templateColumns="1fr" templateRows="repeat(6, 80px)">
              <Center bg="red.200">
                <Text
                  fontSize="md"
                  color="red.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {appInfo?.ratings} avaliações
                </Text>
              </Center>
              <Center bg="orange.200">
                <Text
                  fontSize="md"
                  color="orange.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {appInfo?.places} locais
                </Text>
              </Center>
              <Center bg="yellow.200">
                <Text
                  fontSize="md"
                  color="yellow.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {appInfo?.users} usuários ativos
                </Text>
              </Center>
              <Center bg="green.200">
                <Text
                  fontSize="sm"
                  color="green.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {((lgbtphobia * 100) / appInfo.users).toFixed(2)}% já sofreram
                  LGBTfobia ou conhecem alguém que sofreu
                </Text>
              </Center>
              <Center bg="blue.200">
                <Text
                  fontSize="sm"
                  color="blue.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {((genderIdentity * 100) / appInfo.users).toFixed(2)}% não
                  sabem identificar seu gênero.
                </Text>
              </Center>
              <Center bg="purple.200">
                <Text
                  fontSize="sm"
                  color="purple.800"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {((sexualOrientation * 100) / appInfo.users).toFixed(2)}% não
                  sabem sua orientação sexual.
                </Text>
              </Center>
            </Grid>
          </Box>

          <Flex direction="column" padding="4" bg="white">
            <Text as="i" fontSize="lg">
              <q>
                Quando falamos temos medo de que as nossas palavras não vão ser
                ouvidas ou bem-vindas. Mas quando estamos em silêncio, ainda
                temos medo. Por isso é melhor falar.
              </q>
            </Text>
            <Text color="gray.600" fontSize="xs" fontWeight="semibold">
              Audre Lorde
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Grid>
  )
}

interface AppInfo {
  cities: number
  users: number
  places: number
  ratings: number
  positiveRatings: number
  negativeRatings: number
}

export default HomePage
