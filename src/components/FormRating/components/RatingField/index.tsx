import * as React from 'react'
import { useField } from 'formik'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { StarRating } from './StarRating'

export function RatingField(props: RatingProps) {
  const { name } = props

  const [field, meta, helpers] = useField({ name })

  return (
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel fontSize="xs" fontWeight="semibold">
        Clique para dar uma nota
      </FormLabel>
      <StarRating onChange={(e) => helpers.setValue(e)} value={field.value} />
      <FormErrorMessage>{meta.touched && meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export interface RatingProps {
  name: string
}
