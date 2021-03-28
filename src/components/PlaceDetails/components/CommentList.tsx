import { Avatar, Box, Text, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Rating } from '../../../templates/RatingsPage'

export function CommentList(props: CommentListProps) {
  const { ratings } = props

  return (
    <Stack maxHeight={250} spacing="3" overflowY="scroll" overflowX="hidden">
      {ratings.map((rating, index) => {
        if (rating.friendly < 3) return

        return <Comment rating={rating} key={index} />
      })}
    </Stack>
  )
}

export function Comment(props: CommentProps) {
  const {
    rating: { user, comment },
    ...restProps
  } = props

  return (
    <Box {...restProps}>
      <HStack>
        <Avatar size="xs" src={user?.photo} alt={user?.name} />

        <Text fontSize="xs" fontWeight="bold">
          @{user?.displayName ?? 'anônimo'}
          <Text fontWeight="normal">{comment}</Text>
        </Text>
      </HStack>
    </Box>
  )
}

export interface CommentListProps {
  ratings: Rating[]
}

export interface CommentProps {
  rating: Rating
}
