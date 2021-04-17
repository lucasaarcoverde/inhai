import * as React from 'react'
import type { IconButtonProps } from '@chakra-ui/react'
import { Flex, HStack, Icon, IconButton } from '@chakra-ui/react'
import { RiStarLine, RiStarFill } from 'react-icons/ri'

interface StarRatingProps {
  onChange: (value: number) => void
  value: number
}

export function StarRating(props: StarRatingProps) {
  const { value, onChange } = props

  const [hoverIndex, setHoverIndex] = React.useState(value)

  React.useEffect(() => {
    if (hoverIndex !== value) setHoverIndex(value)
  }, [value])

  return (
    <Flex justifyContent="flex-start">
      <HStack spacing="1" onMouseLeave={() => setHoverIndex(value ?? 0)}>
        <StarButton
          index={1}
          hoverIndex={hoverIndex}
          aria-label="avaliação-1"
          onMouseEnter={() => setHoverIndex(1)}
          onClick={() => onChange(1)}
        />
        <StarButton
          index={2}
          hoverIndex={hoverIndex}
          aria-label="avaliação-2"
          onMouseEnter={() => setHoverIndex(2)}
          onClick={() => onChange(2)}
        />
        <StarButton
          index={3}
          hoverIndex={hoverIndex}
          aria-label="avaliação-3"
          onMouseEnter={() => setHoverIndex(3)}
          onClick={() => onChange(3)}
        />
        <StarButton
          index={4}
          hoverIndex={hoverIndex}
          aria-label="avaliação-4"
          onMouseEnter={() => setHoverIndex(4)}
          onClick={() => onChange(4)}
        />
        <StarButton
          index={5}
          hoverIndex={hoverIndex}
          aria-label="avaliação-5"
          onMouseEnter={() => setHoverIndex(5)}
          onClick={() => onChange(5)}
        />
      </HStack>
    </Flex>
  )
}

function StarButton(
  props: IconButtonProps & {
    hoverIndex: number
    index: number
  }
) {
  const { hoverIndex, index, ...restProps } = props

  return (
    <IconButton
      {...restProps}
      bg="transparent"
      size="sm"
      icon={
        <Icon
          color={hoverIndex >= index ? 'yellow.400' : 'gray.500'}
          as={hoverIndex >= index ? RiStarFill : RiStarLine}
          boxSize="6"
        />
      }
    />
  )
}

export interface RatingProps {
  name: string
}
