import { ChevronDownIcon } from '@chakra-ui/icons'
import { Stack, IconButton } from '@chakra-ui/react'
import React from 'react'

import { RatedPlace, Rating } from '../../../templates/RatingsPage'
import { Comment } from './Comment'

export function CommentList(props: CommentListProps) {
  const { ratings, limit = false, loading, onLoadMoreRatings, ...place } = props

  return (
    <Stack spacing="4" overflowX="hidden">
      {ratings.map((rating, index) => {
        return (
          <Comment
            place={place}
            rating={rating}
            key={`${rating.id}-comment-${index}`}
          />
        )
      })}
      {!limit && (
        <IconButton
          aria-label="Botão para carregar mais avaliações"
          isLoading={loading}
          onClick={onLoadMoreRatings}
          variant="ghost"
          size="sm"
          minHeight="32px"
          icon={<ChevronDownIcon boxSize="6" />}
          colorScheme="teal"
        />
      )}
    </Stack>
  )
}

export interface CommentListProps extends RatedPlace {
  ratings: Rating[]
  onLoadMoreRatings: () => void
  limit: boolean
  loading: boolean
}
