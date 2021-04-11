import React from 'react'
import { Flex, Heading, Text, Divider, Stack } from '@chakra-ui/react'

import { RatedPlace } from '../../../templates/RatingsPage'
import { RatingBar } from './RatingBar'
import { LGBTIcon } from './LGBTIcon'

export function RatingsCard(props: RatedPlace) {
  const {
    ratingsQty = 0,
    averageRating = 0,
    safePlace = 0,
    unsafePlace = 0,
    frequentedBy = 0,
    notFrequentedBy = 0,
  } = props

  const totalSafePlace = safePlace + unsafePlace
  const totalFrequentedBy = frequentedBy + notFrequentedBy

  return (
    <Stack
      spacing="2"
      paddingX="4"
      paddingY="3"
      bg="white"
      shadow="sm"
      borderY="solid"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Heading fontSize="lg" color="teal.500">
        Pontuações e Avaliações
      </Heading>
      <Flex align="center" justifyContent="space-between">
        {averageRating >= 0 && (
          <Stack align="center" fontSize="md" direction="row" spacing={1}>
            <Text fontWeight="semibold" color="black">
              {averageRating.toFixed(2)}
            </Text>
            <LGBTIcon height="18px" width="18px" />
          </Stack>
        )}
        {ratingsQty >= 0 && (
          <Text marginLeft="2" fontSize="sm">
            {`${ratingsQty} ${ratingsQty <= 1 ? 'avaliação' : 'avaliações'}`}
          </Text>
        )}
      </Flex>
      <Divider />
      <Heading fontSize="sm">Pontuações</Heading>
      <Stack fontSize="xs" spacing="1">
        <RatingBar
          label="Frequentado pela comunidade"
          points={frequentedBy}
          total={totalFrequentedBy}
        />
        <RatingBar
          label="Local Seguro"
          points={safePlace}
          total={totalSafePlace}
        />
      </Stack>
    </Stack>
  )
}
