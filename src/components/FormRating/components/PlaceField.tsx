import React from 'react'
import { IconButton, Stack, Text } from '@chakra-ui/react'
import { useField } from 'formik'
import { SearchIcon } from '@chakra-ui/icons'

import type { HereItem } from '../../../hooks/useHere'
import { useMediaQuery } from '../../../contexts'

export function PlaceField(props: PlaceFieldProps) {
  const { item, onOpenSearch } = props
  const { desktop } = useMediaQuery()

  const [, meta, helpers] = useField<HereItem>({
    name: 'place',
    validate: (value: HereItem) =>
      !value?.title ? 'Escolha um local antes' : undefined,
  })

  React.useEffect(() => {
    if (item?.title) {
      helpers.setValue(item)
    }
  }, [item])

  return (
    <Stack direction="row" paddingX={6} align="center" height="40px">
      <Text
        border="GrayText"
        fontSize="lg"
        fontWeight="bold"
        isTruncated
        align="center"
        color={meta.error && meta.touched ? 'red.500' : 'blackAlpha'}
      >
        {meta.error && meta.touched
          ? meta.error
          : meta.value?.title ?? 'Escolha um local'}
      </Text>
      {!desktop && (
        <IconButton
          aria-label="open-search"
          icon={<SearchIcon />}
          variant="outline"
          size="sm"
          onClick={onOpenSearch}
        />
      )}
    </Stack>
  )
}

interface PlaceFieldProps {
  item: HereItem
  onOpenSearch: () => void
}
