import { Avatar, Box, Text, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { Rating } from '../../../templates/RatingsPage'

export function CommentList(props: CommentListProps) {
  const { ratings } = props

  return (
    <Stack maxHeight={200} spacing="3" overflowY="scroll" overflowX="hidden">
      {ratings.map((rating, index) => {
        if (rating.friendly < 3) return

        return <Comment rating={rating} key={index} />
      })}
    </Stack>
  )
}

export function Comment(props: CommentProps) {
  const {
    rating: { user, comment, anonymous = true },
    ...restProps
  } = props

  const photo = anonymous ? '' : user?.photo
  const name = anonymous ? 'anônimo' : user?.displayName

  return (
    <Box {...restProps}>
      <HStack>
        <Avatar size="xs" src={photo} alt={name} />

        <Text fontSize="xs" fontWeight="bold">
          @{name}{' '}
          <Box as="span" fontWeight="normal">
            {comment}
          </Box>
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
