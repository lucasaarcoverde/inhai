import {
  Button,
  Flex,
  Select,
  Skeleton,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'

import React, { useEffect, useState } from 'react'
import AdminRoute from '../components/AdminRoute'
import { Topbar } from '../components/Topbar'
import { useAuth } from '../contexts/firebase'
import { RatedPlace } from './RatingsPage'

interface AppInfo {
  users: number
  ratings: number
  places: number
  cities: number
}

function AdminPage(props: React.PropsWithChildren<RouteComponentProps>) {
  const { firebase } = useAuth()
  const [places, setPlaces] = useState<RatedPlace[]>([])
  const [query, setQuery] = useState<'>=' | '<' | 'all'>('all')

  const [info, setInfo] = useState<AppInfo>()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(query)

    const db = firebase.firestore()

    const placesRef = db.collection('places')

    if (query === 'all') {
      placesRef
        .limit(25)
        .get()
        .then((snap) => {
          const docs = snap.docs
          const places =
            docs.map((doc) => {
              if (!doc.exists) return

              return doc.data() as RatedPlace
            }) ?? []

          setPlaces(places as RatedPlace[])
        })
    } else {
      placesRef
        .where('averageRating', query, 3.5)
        .limit(25)
        .get()
        .then((snap) => {
          const docs = snap.docs
          const places =
            docs.map((doc) => {
              if (!doc.exists) return

              return doc.data() as RatedPlace
            }) ?? []

          setPlaces(places as RatedPlace[])
        })
    }

    db.collection('info')
      .doc('app-information')
      .get()
      .then((doc) => {
        if (doc.exists) {
          setInfo(doc.data() as AppInfo)
        }
      })
  }, [firebase, query])

  useEffect(() => {
    if (!info || places === []) return

    setLoading(false)
  }, [places, info])

  return (
    <AdminRoute path="/app">
      <Flex width="100vw">
        <Topbar />
        {props.children}
        <Stack
          direction="column"
          spacing={6}
          width="100%"
          align="center"
          paddingTop="80px"
        >
          <StatGroup
            minWidth="60vw"
            border="solid"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.200"
            padding={3}
          >
            <Stat colorScheme="teal">
              <StatLabel color="teal.500" fontWeight="bold">
                Cidades
              </StatLabel>
              <StatNumber>
                {loading ? (
                  <Skeleton height="26px" marginY="1" maxWidth="40%" />
                ) : (
                  info?.cities
                )}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel color="teal.500" fontWeight="bold">
                Usuários
              </StatLabel>
              <StatNumber>
                {loading ? (
                  <Skeleton height="26px" marginY="1" maxWidth="40%" />
                ) : (
                  info?.users
                )}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel color="teal.500" fontWeight="bold">
                Locais avaliados
              </StatLabel>
              <StatNumber>
                {loading ? (
                  <Skeleton height="26px" marginY="1" maxWidth="40%" />
                ) : (
                  info?.places
                )}
              </StatNumber>
            </Stat>

            <Stat>
              <StatLabel color="teal.500" fontWeight="bold">
                Avaliações
              </StatLabel>
              <StatNumber>
                {loading ? (
                  <Skeleton height="26px" marginY="1" maxWidth="40%" />
                ) : (
                  info?.ratings
                )}
              </StatNumber>
            </Stat>
          </StatGroup>

          <Stack spacing={4}>
            <Flex width="60vw" justifyContent="space-between">
              <Select
                maxWidth="400px"
                onChange={(e) => setQuery(e.target.value as '<' | '>=' | 'all')}
              >
                <option value="all">Todos</option>
                <option value="<">Avaliados negativamente</option>
                <option value=">=">Avaliados positivamente</option>
              </Select>
              <Button colorScheme="teal" onClick={() => navigate('/app')}>
                Voltar para página inicial
              </Button>
            </Flex>

            <Table size={'sm'} variant="simple" maxWidth="60vw">
              <TableCaption>Avaliações</TableCaption>
              <Thead>
                <Tr>
                  <Th>Local</Th>
                  <Th isNumeric>Positivas</Th>
                  <Th isNumeric>Negativas</Th>
                  <Th isNumeric>Média</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              {loading ? (
                <BodySkeleton />
              ) : (
                <Tbody>
                  {places.map((place, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          <Text isTruncated>{place.title}</Text>
                        </Td>
                        <Td color="green.500" isNumeric>
                          {place.positiveRating}
                        </Td>
                        <Td color="red.500" isNumeric>
                          {place.negativeRating}
                        </Td>
                        <Td
                          color={
                            place.averageRating >= 3.5 ? 'green.500' : 'red.500'
                          }
                          isNumeric
                        >
                          {place.averageRating}
                        </Td>
                        <Td isNumeric>{place.ratingsQty}</Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              )}
            </Table>
          </Stack>
        </Stack>
      </Flex>
    </AdminRoute>
  )
}

function BodySkeleton() {
  return (
    <Tbody>
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <Tr key={index}>
            <Td>
              <Skeleton h="14px" />
            </Td>
            <Td>
              <Skeleton h="14px" />
            </Td>
            <Td>
              <Skeleton h="14px" />
            </Td>
            <Td>
              <Skeleton h="14px" />
            </Td>
            <Td>
              <Skeleton h="14px" />
            </Td>
          </Tr>
        )
      })}
    </Tbody>
  )
}

export default AdminPage
