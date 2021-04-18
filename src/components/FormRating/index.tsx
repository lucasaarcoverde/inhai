import * as React from 'react'
import type { FormikHelpers } from 'formik'
import { Form, Formik } from 'formik'
import { Button, Divider, Radio, Stack } from '@chakra-ui/react'
import {
  CheckboxSingleControl,
  RadioGroupControl,
  TextareaControl,
} from 'formik-chakra-ui'

import { PlaceField } from './components/PlaceField'
import { RatingField } from './components/RatingField'
import type { RatingFormValue } from '../../templates/RatingsPage'
import { validationSchema } from './components/validationSchema'
import type { HereItem } from '../../hooks/useHere'

export interface FormRatingProps {
  handleSubmit: (
    values: RatingFormValue,
    actions: FormikHelpers<RatingFormValue>
  ) => void
  onOpenSearch: () => void
  searchedItem: HereItem
}

export function FormRating(props: FormRatingProps) {
  const { handleSubmit, onOpenSearch, searchedItem } = props

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          comment: '',
          safePlace: 'false',
          frequentedBy: 'false',
          place: {},
          rate: 0,
          term: false,
          anonymous: false,
          id: '',
        } as RatingFormValue
      }
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <Form>
            <PlaceField onOpenSearch={onOpenSearch} item={searchedItem} />
            <Divider />
            <Stack spacing={2} paddingX="6" paddingTop="3" paddingBottom="6">
              <CheckboxSingleControl
                name="anonymous"
                sx={{ '> label > span': { fontSize: '14px' } }}
              >
                Exibir avaliação anonimamente
              </CheckboxSingleControl>
              <RatingField name="rate" />
              <RadioGroupControl
                name="frequentedBy"
                sx={{
                  '> label': {
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                  },
                  span: {
                    fontSize: 'xs',
                  },
                }}
                label="Esse local é frequentado pela comunidade LGBTI+?"
                id="frequented-by-community"
              >
                <Radio value="false" id="frequented-by">
                  Não
                </Radio>
                <Radio value="true" id="not-frequented-by">
                  Sim
                </Radio>
              </RadioGroupControl>
              <RadioGroupControl
                name="safePlace"
                sx={{
                  '> label': {
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                  },
                  span: {
                    fontSize: 'xs',
                  },
                }}
                label="Você se sente seguro nesse local?"
              >
                <Radio value="false" id="safe-place">
                  Não
                </Radio>
                <Radio value="true" id="not-safe-place">
                  Sim
                </Radio>
              </RadioGroupControl>
              <TextareaControl
                sx={{
                  '> label': {
                    fontSize: 'xs',
                    fontWeight: 'semibold',
                  },
                }}
                textareaProps={{
                  sx: {
                    '::placeholder': { fontSize: 'xs' },
                  },
                  minH: '100px',
                  fontSize: '16px',
                  placeholder:
                    'Conte sobre sua experiência nesse local e ajude o pessoal a conhecer mais sobre os lugares da cidade. Obrigado!',
                }}
                name="comment"
                label="Comentários"
              />
              <CheckboxSingleControl
                name="term"
                sx={{
                  '> label > span': { fontSize: '10px' },
                  marginBottom: '6',
                }}
              >
                Certifico que essa avaliação é baseada em minha própria
                experiência e é minha opinião sincera sobre este local e que não
                possuo nenhuma relação pessoal ou comercial com esse
                estabelecimento, não tendo recebido incentivo ou pagamento algum
                do estabelecimento para escrevê-la.
              </CheckboxSingleControl>
              <Button
                size="sm"
                isLoading={formikProps.isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Enviar
              </Button>
            </Stack>
          </Form>
        )
      }}
    </Formik>
  )
}
