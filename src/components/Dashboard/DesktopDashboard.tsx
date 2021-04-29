import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import type { AppInfo } from '../../templates/HomePage'
import type { RatedPlace } from '../../templates/RatingsPage'
import { PlaceSlider } from '../Slider'
import { LGBTFlag } from './components/LGBTFlag'
import { PlacesInfo } from './components/PlacesInfo'
import { DesktopFooter } from '../Footer'

interface DashboardProps {
  places: RatedPlace[]
  appInfo: AppInfo
  badRatedPlaces: number
  goodRatedPlaces: number
}

export function DesktopDashboard(props: DashboardProps) {
  const { appInfo, places, badRatedPlaces, goodRatedPlaces } = props
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

  return (
    <Stack spacing="32" align="center">
      <Stack spacing="10" maxWidth="800px">
        <Flex justifyContent="space-between" width="100%">
          <PlacesInfo
            good
            ratings={appInfo.positiveRatings}
            loading={!appInfo.places && !badRatedPlaces}
            value={goodRatedPlaces}
            places={appInfo.places}
          />

          <PlacesInfo
            ratings={appInfo.negativeRatings}
            loading={!appInfo.places && !badRatedPlaces}
            value={badRatedPlaces}
            places={appInfo.places}
          />
        </Flex>

        <Box
          paddingX="4"
          paddingTop="4"
          paddingBottom="8"
          maxWidth="100vw"
          bg="white"
        >
          <Heading fontSize="xl" color="teal.500">
            Locais mais avaliados
          </Heading>
          <PlaceSlider places={places} />
        </Box>
        <Flex direction="column" bg="white" boxShadow="sm" padding="4">
          <Flex justifyContent="center">
            <Box width="100%" maxWidth="500px">
              <Img fluid={data.file.childImageSharp.fluid} alt="" />
            </Box>
          </Flex>
          <Flex direction="column" paddingX="4" color="teal.500">
            <Text fontWeight="bold" fontSize="xx-large">
              {appInfo?.cities}
            </Text>
            <Text fontWeight="bold" fontSize="xx-large">
              CIDADES
            </Text>
          </Flex>
        </Flex>
      </Stack>
      <Box width="100vw">
        <LGBTFlag
          users={appInfo.users}
          places={appInfo.places}
          ratings={appInfo.ratings}
        />
      </Box>

      <Flex direction="column" padding="8" bg="white">
        <Text as="i" fontSize="xx-large">
          <q>
            Quando falamos temos medo de que as nossas palavras não vão ser
            ouvidas ou bem-vindas. Mas quando estamos em silêncio, ainda temos
            medo. Por isso é melhor falar.
          </q>
        </Text>
        <Text color="gray.600" fontSize="lg" fontWeight="semibold">
          Audre Lorde
        </Text>
      </Flex>
      <DesktopFooter />
    </Stack>
  )
}
