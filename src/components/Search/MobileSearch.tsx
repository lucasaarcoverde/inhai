import {
  Box,
  CloseButton,
  Input,
  Slide,
  Stack,
  VStack,
  VisuallyHidden,
  Text,
  StackDivider,
} from '@chakra-ui/react'
import { useCombobox } from 'downshift'
import React from 'react'
import { HereItem } from '../../hooks/useHere'
import { SearchProps } from './index'

export function MobileSearch(
  props: SearchProps & {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchItems: HereItem[]
  }
) {
  const { onCloseSearch, isSearchOpen, setSearch, searchItems, setItem } = props

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
      setItem(selectedItem)
      return selectedItem.title
    },
    onInputValueChange: ({ inputValue: value }) => {
      if (value === undefined && typeof value !== 'string') return
      console.log(value)
      if (value.includes('object')) setSearch((prev) => prev)
      else setSearch(value)
    },
  })

  return (
    <Slide
      direction="bottom"
      in={isSearchOpen}
      style={{ zIndex: 10, margin: 0 }}
    >
      <Box
        h="100vh"
        paddingX="4"
        paddingY="2"
        bg="white"
        rounded="md"
        shadow="md"
      >
        <Stack spacing="2">
          <CloseButton onClick={onCloseSearch} />
          <Box {...getComboboxProps()}>
            <VisuallyHidden>
              <label htmlFor="search" {...getLabelProps()}>
                Search Input
              </label>
            </VisuallyHidden>
            <Input
              {...getInputProps()}
              placeholder="Buscar local LGBT-Friendly"
            />
          </Box>
          <Stack
            divider={<StackDivider borderColor="gray.200" />}
            {...getMenuProps()}
            height="100%"
            overflowY="scroll"
          >
            {searchItems.map((item, index) => (
              <Stack
                key={index}
                bg={highlightedIndex === index ? 'gray.100' : 'white'}
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
    </Slide>
  )
}
