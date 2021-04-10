import { Stack, Flex, Slide, CloseButton, Box } from '@chakra-ui/react'
import React from 'react'
import { RatedPlace } from '../../templates/RatingsPage'
import { RatingsCard } from './components/RatingsCard'
import { PlaceCard } from './components/PlaceCard'
import { RatingsDetails } from './components/RatingsDetails'
import { useMediaQuery } from '../../contexts'

export function RatedPlaceDetails(props: RatedPlaceDetailsProps) {
  const { isDetailsOpen, onCloseDetails, item } = props

  const { desktop } = useMediaQuery()

  return (
    <Slide
      direction={desktop ? 'right' : 'bottom'}
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
      <Flex
        maxWidth="500px"
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
      <Box
        bg="gray.50"
        height="100%"
        overflowY="scroll"
        sx={{ '-webkit-overflow-scrolling': 'touch' }}
        paddingBottom="3"
      >
        <Stack spacing="3" paddingTop="32px">
          <RatingsCard {...item} />
          <PlaceCard {...item} />
          <RatingsDetails {...item} />
        </Stack>
      </Box>
    </Slide>
  )
}

export interface RatedPlaceDetailsProps {
  item: RatedPlace
  isDetailsOpen: boolean
  onCloseDetails: () => void
}
