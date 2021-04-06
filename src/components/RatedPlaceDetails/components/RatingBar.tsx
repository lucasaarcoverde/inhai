import React from 'react'
import { Flex, Text, HStack, Progress } from '@chakra-ui/react'

export function RatingBar(props: RatingBarProps) {
  const { label, total, points } = props
  return (
    <Flex width="100%" justifyContent="space-between">
      <Text fontSize="xs">{label}</Text>
      <HStack spacing="2">
        <Text fontSize="xs">({points})</Text>
        <Progress
          width="100px"
          colorScheme="teal"
          value={(points / total) * 100}
        />
      </HStack>
    </Flex>
  )
}

interface RatingBarProps {
  total: number
  points: number
  label: string
}
