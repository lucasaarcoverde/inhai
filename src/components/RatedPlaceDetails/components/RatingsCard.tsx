import React from 'react'
import { Flex, Heading, Text, Divider, Icon, Stack } from '@chakra-ui/react'
import { RiStarSFill } from 'react-icons/ri'

import { RatedPlace } from '../../../templates/RatingsPage'
import { RatingBar } from './RatingBar'

export function RatingsCard(props: RatedPlace) {
  const {
    ratingsQty,
    averageRating,
    safePlace,
    unsafePlace,
    frequentedBy,
    notFrequentedBy,
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
        {averageRating && (
          <Stack align="center" fontSize="md" direction="row" spacing={1}>
            <Text fontWeight="semibold">{averageRating.toFixed(2)}</Text>
            <Icon as={RiStarSFill} boxSize="24px" />
          </Stack>
        )}
        {ratingsQty && (
          <Text marginLeft="2" fontSize="sm">
            {`${ratingsQty} ${ratingsQty === 1 ? 'avaliação' : 'avaliações'}`}
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
