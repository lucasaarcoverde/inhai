import React from 'react'
import {
  Box,
  CloseButton,
  Input,
  Slide,
  Stack,
  VisuallyHidden,
  Text,
  StackDivider,
} from '@chakra-ui/react'
import { Location } from '@reach/router'
import { useCombobox } from 'downshift'
import { HereItem } from '../../hooks/useHere'
import { SearchProps } from './index'

export function MobileSearch(
  props: SearchProps & {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchItems: HereItem[]
    searchValue: string
  }
) {
  const {
    onCloseSearch,
    isSearchOpen,
    setSearch,
    searchValue,
    searchItems,
    setItem,
  } = props

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
      onCloseSearch()

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
    <Location>
      {({ location: { pathname } }) => (
        <Slide
          direction="bottom"
          in={isSearchOpen}
          style={{ zIndex: 10, margin: 0 }}
        >
          <Box
            h={pathname.includes('map') ? '100vh' : '60vh'}
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
                  value={searchValue}
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
      )}
    </Location>
  )
}
