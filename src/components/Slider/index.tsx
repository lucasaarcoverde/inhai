import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
  Divider,
  WrapItem,
  Badge,
  Flex,
  Skeleton,
} from '@chakra-ui/react'
import React from 'react'
import Slider from 'react-slick'

import './slider.css'
import './slider-theme.css'

import type { RatedPlace } from '../../templates/RatingsPage'
import { GoodRatedPlace } from '../icons/GoodRatedPlace'

export function PlaceSlider(props: { places: RatedPlace[] }) {
  const { places } = props

  return places.length === 0 ? (
    <SliderSkeleton />
  ) : (
    <Slider
      autoplay
      autoplaySpeed={3000}
      fade
      dots
      infinite
      speed={200}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {places.map((place, index) => (
        <Box key={`places-${index}`}>
          <PlaceDetails {...place} />
        </Box>
      ))}
    </Slider>
  )
}

function SliderSkeleton() {
  return (
    <Stack paddingY="4">
      <Flex height="18px" justifyContent="space-between">
        <Skeleton width="140px" />
        <Skeleton width="80px" />
      </Flex>

      <Skeleton width="100%" height="60px" />

      <HStack spacing="3">
        <Skeleton height="25px" width="80px" />
        <Skeleton height="25px" width="80px" />
      </HStack>
    </Stack>
  )
}

function PlaceDetails(props: RatedPlace) {
  const { title, address, averageRating, ratingsQty, categories } = props

  const {
    street,
    houseNumber,
    district,
    city,
    stateCode,
    postalCode,
    countryName,
  } = address ?? {}

  const label = address
    ? `${street ? `${street}, ` : ''}${houseNumber ? `${houseNumber}, ` : ''}${
        district ? `${district}, ` : ''
      }${city && stateCode ? `${city} - ${stateCode}, ` : ''}${
        postalCode ? `${postalCode}, ` : ''
      }${countryName ?? 'Brasil'}`
    : null

  const firstCategory = categories?.[0]
  const secondCategory = categories?.[1]

  return (
    <Stack spacing="4" paddingY="3" bg="white">
      <Stack spacing="4">
        <Stack spacing="1">
          <Flex justifyContent="space-between">
            <HStack spacing="1">
              <GoodRatedPlace />
              <Heading fontSize="sm">
                {title}{' '}
                {averageRating >= 0 && `- (${averageRating.toFixed(2)})`}
              </Heading>
            </HStack>
            {ratingsQty >= 0 && (
              <Text marginLeft="2" fontSize="sm">
                {`${ratingsQty} ${
                  ratingsQty <= 1 ? 'avaliação' : 'avaliações'
                }`}
              </Text>
            )}
          </Flex>
          <Text paddingLeft="20px" fontSize="sm">
            {label}
          </Text>
        </Stack>
        <Divider />
        <Wrap>
          {firstCategory && (
            <WrapItem>
              <Badge
                variant="subtle"
                colorScheme={getPalettes(firstCategory.name)}
              >
                {firstCategory.name}
              </Badge>
            </WrapItem>
          )}
          {secondCategory && (
            <WrapItem>
              <Badge
                variant="subtle"
                colorScheme={getPalettes(secondCategory.name)}
              >
                {secondCategory.name}
              </Badge>
            </WrapItem>
          )}
        </Wrap>
      </Stack>
    </Stack>
  )
}

function getPalettes(category: string) {
  switch (category.toLowerCase()) {
    case 'bar ou pub':
      return 'purple'

    case 'restaurante':
      return 'pink'

    case 'ginásio ou health club':
      return 'yellow'

    case 'padaria':
      return 'orange'

    case 'comida rápida':
      return 'red'

    default:
      return 'blue'
  }
}
