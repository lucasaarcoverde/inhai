import React from 'react'
import { Heading, Divider, Stack, Spinner, Center } from '@chakra-ui/react'
import { RatedPlace, Rating } from '../../../templates/RatingsPage'
import { CommentList } from './CommentList'
import { RatingBar } from './RatingBar'

export function RatingsDetails(
  props: RatedPlace & { ratings: Rating[]; loading: boolean }
) {
  const { ratings, rateDetails, ratingsQty, loading } = props

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
      <Heading fontSize="lg" color="teal.500">
        Detalhe das Avaliações
      </Heading>
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
