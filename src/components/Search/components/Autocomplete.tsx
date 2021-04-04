import React from 'react'
import {
  Box,
  CloseButton,
  Input,
  Stack,
  VisuallyHidden,
  Text,
  StackDivider,
  Badge,
  Divider,
  BoxProps,
} from '@chakra-ui/react'
import { useCombobox } from 'downshift'

import { HereItem } from '../../../hooks/useHere'
import { SearchProps } from '../index'
import { useMediaQueryContext } from '../../../contexts'

export function Autocomplete(
  props: SearchProps & {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchItems: HereItem[]
    searchValue: string
  } & BoxProps
) {
  const {
    onCloseSearch,
    setSearch,
    searchValue,
    searchItems,
    setSearchedItem,
    ...boxProps
  } = props

  const { desktop } = useMediaQueryContext()

  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: searchItems,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return
      setSearchedItem(selectedItem)

      onCloseSearch?.()

      return selectedItem.title
    },
    onInputValueChange: ({ inputValue: value }) => {
      if (value === undefined && typeof value !== 'string') return

      if (value.includes('object')) setSearch((prev) => prev)
      else setSearch(value)
    },
  })

  return (
    <Box {...boxProps} paddingX="4" paddingY="2" bg="white" h="100%">
      <Stack spacing="2">
        {!desktop && <CloseButton onClick={onCloseSearch} />}
        <Box {...getComboboxProps()}>
          <VisuallyHidden>
            <label htmlFor="search" {...getLabelProps()}>
              Search Input
            </label>
          </VisuallyHidden>
          <Input
            {...getInputProps()}
            value={searchValue}
            placeholder="Buscar local"
          />
        </Box>
        <Stack spacing="0">
          <Text
            htmlFor="rating-radio-group"
            color="gray.400"
            fontSize="xs"
            fontWeight="semibold"
          >
            Sugestões
          </Text>
          <Stack direction="row" overflowX="scroll" paddingY={2}>
            <Badge colorScheme="cyan">Restaurante</Badge>
            <Badge colorScheme="purple">Bar ou Pub</Badge>
            <Badge colorScheme="yellow">Academia</Badge>
            <Badge colorScheme="blue">Salão de Beleza</Badge>
            <Badge colorScheme="red">Consultório médico</Badge>
            <Badge colorScheme="green">Padaria</Badge>
            <Badge colorScheme="purple">Comércio</Badge>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
          {...getMenuProps()}
          height="80vh"
          overflowY="scroll"
        >
          {searchItems.map((item, index) => (
            <Stack
              key={index}
              bg={highlightedIndex === index ? 'gray.50' : 'whiteAlpha'}
              {...getItemProps({ item, index })}
              padding="4"
              cursor="pointer"
              borderRadius="4px"
            >
              <Text fontStyle="bold">{item.title}</Text>
              <Text fontSize="sm" color="gray.600" isTruncated>
                {item.address.label}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
