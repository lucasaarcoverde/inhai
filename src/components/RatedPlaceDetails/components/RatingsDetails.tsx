import React from 'react'
import {
  Heading,
  Divider,
  Stack,
  Spinner,
  Center,
  Flex,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react'
import { RatedPlace, Rating } from '../../../templates/RatingsPage'
import { CommentList } from './CommentList'
import { RatingBar } from './RatingBar'
import { navigate } from 'gatsby'

export function RatingsDetails(
  props: RatedPlace & { ratings: Rating[]; loading: boolean }
) {
  const { ratings, loading, ...ratedPlace } = props

  const { ratingsQty, rateDetails } = ratedPlace
  const { good = 0, bad = 0, horrible = 0, excellent = 0, neutral = 0 } =
    rateDetails ?? {}

  return (
    <Stack
      spacing="4"
      paddingX="4"
      paddingY="3"
      bg="white"
      shadow="sm"
      borderY="solid"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Flex justifyContent="space-between" align="center">
        <HStack spacing="1" align="center">
          <Heading fontSize="lg" color="teal.500">
            Avaliações
          </Heading>
          <Text fontSize="sm" color="gray.500">
            ({`${ratingsQty}`})
          </Text>
        </HStack>
        <Button
          variant="outline"
          size="xs"
          colorScheme="teal"
          onClick={() => {
            window.localStorage.setItem(
              'rate-place',
              JSON.stringify(ratedPlace)
            )
            navigate('/app/ratings')
          }}
        >
          Faça uma avaliação
        </Button>
      </Flex>
      <Stack spacing={2}>
        <RatingBar label="Excelente" points={excellent} total={ratingsQty} />
        <RatingBar label="Bom" points={good} total={ratingsQty} />
        <RatingBar label="Razoável" points={neutral} total={ratingsQty} />
        <RatingBar label="Ruim" points={bad} total={ratingsQty} />
        <RatingBar label="Horrível" points={horrible} total={ratingsQty} />
      </Stack>
      <Divider />
      {loading ? (
        <Center>
          <Spinner size="md" color="teal.500" />
        </Center>
      ) : (
        <CommentList ratings={ratings} />
      )}
    </Stack>
  )
}
