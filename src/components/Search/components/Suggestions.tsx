import type { ButtonProps } from '@chakra-ui/react'
import { Box, Button, HStack } from '@chakra-ui/react'
import React from 'react'

export function PlaceSuggestions(props: {
  handleInputChange: (value: string) => void
}) {
  const { handleInputChange } = props

  return (
    <HStack overflowX="scroll" paddingY={2}>
      <SuggestionButton
        colorScheme="cyan"
        onClick={() => handleInputChange('Restaurante')}
      >
        Restaurante
      </SuggestionButton>
      <SuggestionButton
        colorScheme="purple"
        onClick={() => handleInputChange('Bar')}
      >
        Bar
      </SuggestionButton>
      <SuggestionButton
        colorScheme="green"
        onClick={() => handleInputChange('Colégio')}
      >
        Colégio
      </SuggestionButton>
      <SuggestionButton
        colorScheme="pink"
        onClick={() => handleInputChange('Universidade')}
      >
        Universidade
      </SuggestionButton>
      <SuggestionButton
        colorScheme="yellow"
        onClick={() => handleInputChange('Academia')}
      >
        Academia
      </SuggestionButton>
      <SuggestionButton
        colorScheme="blue"
        onClick={() => handleInputChange('Salão de Beleza')}
      >
        Salão de Beleza
      </SuggestionButton>
      <SuggestionButton
        colorScheme="red"
        onClick={() => handleInputChange('Consultório médico')}
      >
        Consultório médico
      </SuggestionButton>
      <SuggestionButton
        colorScheme="green"
        onClick={() => handleInputChange('Padaria')}
      >
        Padaria
      </SuggestionButton>
      <SuggestionButton
        colorScheme="purple"
        onClick={() => handleInputChange('Loja')}
      >
        Loja
      </SuggestionButton>
    </HStack>
  )
}

function SuggestionButton(props: ButtonProps) {
  const { children, ...restProps } = props

  return (
    <Box>
      <Button size="xs" variant="ghost" {...restProps}>
        {children}
      </Button>
    </Box>
  )
}
