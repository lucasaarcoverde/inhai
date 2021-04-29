import React from 'react'
import { Stack, Flex, Slide, CloseButton, Box } from '@chakra-ui/react'

import type { RatedPlace } from '../../templates/RatingsPage'
import { RatingsCard } from './components/RatingsCard'
import { PlaceCard } from './components/PlaceCard'
import { RatingsDetails } from './components/RatingsDetails'
import { useMediaQuery } from '../../contexts'

export function RatedPlaceDetails(props: RatedPlaceDetailsProps) {
  const { isDetailsOpen } = props

  const { desktop } = useMediaQuery()

  return desktop ? (
    <Slide
      direction="left"
      in={isDetailsOpen}
      style={{
        zIndex: 16,
        margin: 0,
        top: 56,
        bottom: 56,
        left: 0,
        width: '25vw',
        maxWidth: '25vw',
        maxHeight: '-webkit-fill-available',
        height: 'calc(100vh - 120px)',
      }}
    >
      <Details {...props} />
    </Slide>
  ) : (
    <Slide
      direction={'bottom'}
      in={isDetailsOpen}
      style={{
        zIndex: 13,
        margin: 0,
        top: 0,
        bottom: 0,
        width: desktop ? '35%' : '100vw',
        maxWidth: desktop ? '500px' : '100vw',
        maxHeight: '-webkit-fill-available',
        height: '100vh',
      }}
    >
      <Details {...props} />
    </Slide>
  )
}

function Details(props: RatedPlaceDetailsProps) {
  const { onCloseDetails, item } = props
  const { desktop } = useMediaQuery()

  return (
    <>
      <Flex
        maxWidth={desktop ? '25vw' : '500px'}
        position="fixed"
        bg="gray.50"
        width="100vw"
        justifyContent="flex-start"
        align="center"
        paddingX="1"
        shadow="sm"
        borderBottom="solid"
        borderWidth="1px"
        borderColor="gray.100"
        zIndex={13}
      >
        <CloseButton zIndex={14} onClick={onCloseDetails} />
      </Flex>
      <Box bg="gray.50" height="100%" overflowY="scroll" paddingBottom="3">
        <Stack spacing="3" paddingTop="32px">
          <RatingsCard {...item} />
          <PlaceCard {...item} />
          <RatingsDetails {...item} />
        </Stack>
      </Box>
    </>
  )
}

export interface RatedPlaceDetailsProps {
  item: RatedPlace
  isDetailsOpen: boolean
  onCloseDetails: () => void
}
