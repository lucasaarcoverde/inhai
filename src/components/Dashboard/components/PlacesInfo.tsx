import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Text,
  HStack,
  Stack,
  Skeleton,
} from '@chakra-ui/react'
import React from 'react'

import { BadRatedPlace } from '../../icons/BadRatedPlace'
import { GoodRatedPlace } from '../../icons/GoodRatedPlace'

export interface PlacesInfoProps {
  places: number
  value: number
  ratings: number
  loading: boolean
  good?: boolean
}

export function PlacesInfo(props: PlacesInfoProps) {
  const { places, value: currentValue, loading, ratings, good = false } = props
  const percentage = (currentValue * 100) / places

  const value = loading ? 0 : percentage

  return (
    <Grid
      boxShadow={{ base: 'sm', lg: 'none' }}
      bg="white"
      templateColumns="1fr 1fr"
      paddingY="3"
    >
      <Flex justifyContent="center">
        <CircularProgress
          value={value}
          size="100px"
          color={good ? 'green.400' : 'red.400'}
        >
          {!loading && (
            <CircularProgressLabel>
              {percentage.toFixed(1)}%
            </CircularProgressLabel>
          )}
        </CircularProgress>
      </Flex>
      <Flex direction="column" justifyContent="center">
        <HStack>
          {good ? (
            <GoodRatedPlace boxSize="6" />
          ) : (
            <BadRatedPlace boxSize="6" />
          )}
          <Text fontSize="xs">
            {good ? 'LGBTI+ friendly' : 'Não LGBTI+ friendly'}
          </Text>
        </HStack>
        {loading ? (
          <Stack paddingLeft="8" spacing="2px">
            <Skeleton height="10px" width="40px" />
            <Skeleton height="10px" width="80px" />
          </Stack>
        ) : (
          <>
            <Text paddingLeft="8" fontSize="xs" color="gray.600">
              {currentValue} locais
            </Text>
            <Text paddingLeft="8" fontSize="xs" color="gray.600">
              {ratings} avaliações {good ? 'positivas' : 'negativas'}
            </Text>
          </>
        )}
      </Flex>
    </Grid>
  )
}
