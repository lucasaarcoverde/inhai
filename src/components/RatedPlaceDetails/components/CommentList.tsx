import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Text,
  HStack,
  Stack,
  Icon,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import React from 'react'
import { RiStarSFill } from 'react-icons/ri'

import { Rating } from '../../../templates/RatingsPage'

export function CommentList(props: CommentListProps) {
  const { ratings, limit = false, loading, onLoadMoreRatings } = props

  return (
    <Stack spacing="4" overflowX="hidden">
      {ratings.map((rating, index) => {
        return <Comment rating={rating} key={index} />
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

export function Comment(props: CommentProps) {
  const {
    rating: { user, comment, anonymous = true, rate, created },
    ...restProps
  } = props

  const photo = anonymous ? '' : user?.photo
  const name = anonymous ? 'anônimo' : user?.displayName

  return (
    <Stack
      fontSize="xs"
      direction="column"
      spacing={2}
      {...restProps}
      width="100%"
      justifyContent="center"
    >
      <HStack spacing="2">
        <Avatar size="sm" src={photo} alt={name} />
        <Text fontSize="xs">{name}</Text>
      </HStack>
      <HStack align="center" spacing={2}>
        <Flex color="yellow.400">
          {Array.from({ length: rate }, (_, index) => {
            return <Icon as={RiStarSFill} key={index} boxSize="18px" />
          })}
        </Flex>
        {created && (
          <Text fontSize="x-small" color="gray.500">
            Avaliado em {created.toDate().toLocaleDateString('pt-BR')}
          </Text>
        )}
      </HStack>
      <Text fontWeight="normal">{comment && comment}</Text>
    </Stack>
  )
}

export interface CommentListProps {
  ratings: Rating[]
  onLoadMoreRatings: () => void
  limit: boolean
  loading: boolean
}

export interface CommentProps {
  rating: Rating
}
