import React, { useCallback } from 'react'
import type { StackProps } from '@chakra-ui/react'
import {
  Box,
  CloseButton,
  Input,
  Stack,
  VisuallyHidden,
  Text,
  StackDivider,
  Divider,
} from '@chakra-ui/react'
import { useCombobox } from 'downshift'
import { useLocation } from '@reach/router'

import type { HereItem } from '../../../hooks/useHere'
import type { SearchProps } from '../index'
import { EmptyState } from './EmptyState'
import { useMediaQuery } from '../../../contexts'
import { PlaceSuggestions } from './Suggestions'

export function Autocomplete(
  props: SearchProps & {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchItems: HereItem[]
    searchValue: string
    queryValue: string
  } & StackProps
) {
  const {
    onCloseSearch,
    setSearch,
    searchValue,
    searchItems,
    setSearchedItem,
    queryValue,
    ...containerProps
  } = props

  const { desktop } = useMediaQuery()
  const { pathname } = useLocation()

  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue,
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

  const handleInputChange = useCallback(
    (value: string) => setInputValue(value),
    []
  )

  return (
    <>
      <Stack
        paddingX="4"
        paddingTop="2"
        spacing="2"
        position="fixed"
        bg="white"
        width={['100vw', '100vw', '100vw', '25vw']}
      >
        {!desktop && <CloseButton onClick={onCloseSearch} />}
        <Box {...getComboboxProps()}>
          <VisuallyHidden>
            <label htmlFor="search" {...getLabelProps()}>
              Buscar local
            </label>
          </VisuallyHidden>
          <Input
            {...getInputProps()}
            value={searchValue}
            placeholder={
              pathname.includes('ratings') ? 'Escolha um local' : 'Buscar local'
            }
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
          <PlaceSuggestions handleInputChange={handleInputChange} />
          <Divider />
        </Stack>
      </Stack>
      <Box
        height="calc(100vh - 149px)"
        paddingX="4"
        paddingBottom="2"
        marginTop="149px"
        backgroundColor={desktop && !queryValue ? 'transparent' : 'white'}
        overflowY="scroll"
        width={['100vw', '100vw', '100vw', '25vw']}
        {...containerProps}
      >
        {!!queryValue && searchItems.length === 0 ? (
          <EmptyState {...getMenuProps()} searchValue={queryValue} />
        ) : (
          <Stack
            divider={<StackDivider borderColor="gray.200" />}
            width="100%"
            {...getMenuProps()}
          >
            {searchItems.map((item, index) => (
              <Stack
                key={`search-place-${index}`}
                width="100%"
                bg={highlightedIndex === index ? 'gray.50' : 'white'}
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
        )}
      </Box>
    </>
  )
}
