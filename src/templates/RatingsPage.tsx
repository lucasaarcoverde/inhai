import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import * as Yup from 'yup'

import { Layout } from '../components/Layout'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text,
  useDisclosure,
  createStandaloneToast,
  IconButton,
} from '@chakra-ui/react'
import { v4 } from 'uuid'
import { Search } from '../components/Search'

import { HereItem } from '../hooks/useHere'
import { MapProvider } from '../contexts/map'
import { Map, PlaceDetails } from '../components'
import { useCallback, useState } from 'react'
import { Form, Formik, FormikHelpers, useField } from 'formik'
import { useAuth, User } from '../contexts/firebase'
import { useMediaQueryContext } from '../contexts'
import { SearchIcon } from '@chakra-ui/icons'
import {
  CheckboxSingleControl,
  SelectControl,
  TextareaControl,
} from 'formik-chakra-ui'

export interface Rating {
  comment: string
  safePlace: boolean
  frequentedBy: boolean
  friendly: number
  place: HereItem
  userId?: string
  user?: User
  placeId?: string
  anonymous?: boolean
}

export interface RatedPlace extends HereItem {
  ratings: Rating[]
}

const validationSchema = Yup.object({
  place: Yup.object().required(),
  friendly: Yup.number()
    .required('Este campo é obrigatório.')
    .typeError('Este campo é obrigatório.')
    .min(1, 'Você precisa selecionar uma opcão.'),
})

const RatingsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const {
    isOpen: isSearchOpen,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure()

  const toast = useCallback(createStandaloneToast(), [])
  const { desktop } = useMediaQueryContext()
  const {
    isOpen: isDetailsOpen,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure()

  const toastSuccess = useCallback(
    () =>
      toast({
        title: 'Avaliação realizada.',
        description: 'Obrigado por nos ajudar!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const toastError = useCallback(
    () =>
      toast({
        title: 'Erro ao realizar avaliação.',
        description: 'Tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const { firebase, user } = useAuth()
  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const handleSubmit = useCallback(
    (values: Rating, actions: FormikHelpers<Rating>) => {
      const { place, ...rating } = values
      const { id: userId = 'anonymous' } = user ?? {}
      const db = firebase.firestore()

      db.collection('places')
        .where('position', '==', values.place.position)
        .get()
        .then((snap) => {
          const [doc] = snap.docs
          if (doc && doc.exists) {
            const { id, ratings = [] } = doc.data() as RatedPlace

            const positiveRating = ratings.filter(
              (rating) => rating.friendly > 3
            ).length

            db.collection('places')
              .doc(id)
              .update({
                ratings: [...ratings, { ...rating, placeId: id, userId, user }],
                positiveRating,
              })
              .then(() => {
                actions.resetForm()
                toastSuccess()
              })
              .catch(() => toastError())
              .finally(() => {
                actions.setSubmitting(false)
              })
          } else {
            const uuid = v4()
            db.collection('places')
              .doc(uuid)
              .set({
                ...place,
                ratings: [{ ...rating, placeId: uuid, userId, user }],
                id: uuid,
                positiveRating: rating.friendly > 3 ? 1 : 0,
              })
              .then(() => {
                actions.resetForm()
                toastSuccess()
              })
              .catch(() => {
                toastError()
              })
              .finally(() => {
                actions.setSubmitting(false)
              })
          }
        })
    },
    [user, firebase]
  )

  return (
    <MapProvider>
      <Layout>
        <Flex direction="column" width="100%" height="100%" overflowY="scroll">
          <Map
            height="40vh"
            onOpenDetails={onOpenDetails}
            searchedItem={searchedItem}
            setCurrentItem={setCurrentItem}
          />
          <Box>
            <Formik
              enableReinitialize
              initialValues={
                {
                  comment: '',
                  safePlace: false,
                  frequentedBy: false,
                  place: currentItem,
                  friendly: 0,
                  anonymous: false,
                } as Rating
              }
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => {
                return (
                  <Form>
                    <PlaceField
                      onOpenSearch={onOpenSearch}
                      item={searchedItem}
                    />

                    <Divider />

                    <Stack spacing={2} paddingX={6} paddingY={3}>
                      <CheckboxSingleControl name="anonymous">
                        Responder anonimamente
                      </CheckboxSingleControl>
                      <SelectControl
                        sx={{
                          maxWidth: 400,
                          label: {
                            fontSize: 'xs',
                            fontWeight: 'semibold',
                          },
                        }}
                        name="friendly"
                        label="Para você, o quanto esse local é LGBTQI+ friendly?"
                        selectProps={{
                          placeholder: 'Considere 1 (péssimo) e 5 (ótimo)',
                          cursor: 'pointer',
                        }}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </SelectControl>
                      <TextareaControl
                        sx={{
                          label: {
                            fontSize: 'xs',
                            fontWeight: 'semibold',
                          },
                        }}
                        name="comment"
                        label="Comentário"
                      />
                      <FormControl>
                        <Stack direction="row" spacing={1}>
                          <FormLabel
                            htmlFor="group"
                            fontSize="xs"
                            fontWeight="semibold"
                            marginX={0}
                          >
                            Assinale as opções que você concorda.
                          </FormLabel>
                        </Stack>
                        <Stack id="group">
                          <CheckboxSingleControl name="safePlace">
                            Me sinto seguro nesse local.
                          </CheckboxSingleControl>
                          <CheckboxSingleControl name="frequentedBy">
                            Esse local é frequentado pela comunidade LGBTQI+.{' '}
                          </CheckboxSingleControl>
                        </Stack>
                      </FormControl>

                      <Button
                        isLoading={props.isSubmitting}
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
          </Box>
        </Flex>
        <PlaceDetails
          isDetailsOpen={isDetailsOpen}
          onCloseDetails={onCloseDetails}
          item={currentItem}
        />
        <Search
          isSearchOpen={isSearchOpen}
          onCloseSearch={onCloseSearch}
          setSearchedItem={setSearchedItem}
        />
        {children}
      </Layout>
    </MapProvider>
  )
}

export default RatingsPage

function PlaceField(props: PlaceFieldProps) {
  const { item, onOpenSearch } = props

  const [_, meta, helpers] = useField<HereItem>({
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
    <Stack direction="row" paddingX={6} paddingY={2}>
      <IconButton
        aria-label="open-search"
        icon={<SearchIcon />}
        variant="outline"
        size="sm"
        onClick={onOpenSearch}
      />
      <Text
        border="GrayText"
        fontSize="lg"
        fontWeight="bold"
        isTruncated
        align="center"
        color={meta.error && meta.touched ? 'red.500' : 'blackAlpha.800'}
      >
        {meta.error && meta.touched
          ? meta.error
          : meta.value?.title ?? 'Escolha um local'}
      </Text>
    </Stack>
  )
}

interface PlaceFieldProps {
  item: HereItem
  onOpenSearch: () => void
}
