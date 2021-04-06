import * as React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { BaseProvider, LightTheme } from 'baseui'
import { StarRating } from 'baseui/rating'
import { useField } from 'formik'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

const engine = new Styletron()

export function Rating(props: RatingProps) {
  const { name } = props

  const [field, meta, helpers] = useField({ name })

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <FormControl isInvalid={!!meta.touched && !!meta.error}>
          <FormLabel fontSize="xs" fontWeight="semibold">
            Dê uma nota ao local
          </FormLabel>
          <StarRating
            value={field.value}
            onChange={(e) => helpers.setValue(e.value)}
            numItems={5}
            size={22}
          />
          <FormErrorMessage>{meta.touched && meta.error}</FormErrorMessage>
        </FormControl>
      </BaseProvider>
    </StyletronProvider>
  )
}

export interface RatingProps {
  name: string
}
