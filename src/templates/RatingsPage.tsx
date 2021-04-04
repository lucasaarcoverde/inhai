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
import useFirebase from '../hooks/useFirebase'

export interface Rating {
  comment: string
  safePlace: boolean
  frequentedBy: boolean
  friendly: number
  userId?: string
  user?: User | null
  placeId?: string
  anonymous?: boolean
  id: string
}

export interface RatedPlace extends HereItem {
  positiveRating: number
  negativeRating: number
  totalRatings: number
  averageRating: number
  ratingsQty: number
}

export interface RatingForm extends Rating {
  place: RatedPlace
}

const validationSchema = Yup.object({
  place: Yup.object().required(),
  friendly: Yup.number()
    .required('Este campo é obrigatório.')
    .typeError('Este campo é obrigatório.')
    .min(1, 'Você precisa selecionar uma opcão.'),
  comment: Yup.string().when('friendly', {
    is: (friendly: number) => friendly < 3,
    then: Yup.string().required(
      'Comentário é obrigatório em caso de avaliações negativas.'
    ),
  }),
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
  const {
    updatePlace,
    addRating,
    addPlace,
    addCity,
    updateInfo,
    db,
  } = useFirebase()

  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const handleSubmit = useCallback(
    (values: RatingForm, actions: FormikHelpers<RatingForm>) => {
      const { place, ...rating } = values
      const friendly = Number(rating.friendly)
      console.log(place)

      db.collection('places')
        .where('position', '==', values.place.position)
        .get()
        .then((snap) => {
          const [doc] = snap.docs
          if (doc && doc.exists) {
            const {
              id,
              positiveRating = 0,
              negativeRating = 0,
              totalRatings = 0,
              ratingsQty = 0,
            } = doc.data() as RatedPlace

            updatePlace({
              id,
              positiveRating:
                friendly > 3 ? positiveRating + 1 : positiveRating,
              negativeRating:
                friendly < 3 ? negativeRating + 1 : negativeRating,
              totalRatings: totalRatings + friendly,
              averageRating: (totalRatings + friendly) / (ratingsQty + 1),
              ratingsQty: ratingsQty + 1,
            })

            const uuid = v4()
            addRating({
              ...rating,
              placeId: id,
              friendly,
              user,
              id: uuid,
            })
          } else {
            const placeId = v4()

            addPlace({
              ...place,
              id: placeId,
              positiveRating: friendly > 3 ? 1 : 0,
              negativeRating: friendly < 3 ? 1 : 0,
              totalRatings: friendly,
              averageRating: friendly,
              ratingsQty: 1,
            })?.then(() => {
              const ratingId = v4()

              updateInfo({
                places: firebase.firestore.FieldValue.increment(1),
              })

              db.collection('cities')
                .doc(place.address.city)
                .get()
                .then((doc) => {
                  if (!doc.exists) {
                    updateInfo({
                      cities: firebase.firestore.FieldValue.increment(1),
                    })
                    addCity(place.address.city)
                  }
                })

              addRating({ ...rating, placeId, friendly, user, id: ratingId })
            })
          }
        })
        .then(() => {
          actions.resetForm()
          toastSuccess()
          updateInfo({
            ratings: firebase.firestore.FieldValue.increment(1),
          })
        })
        .catch(() => {
          toastError()
        })
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [user, firebase, db]
  )

  return (
    <MapProvider>
      <Layout>
        <Flex direction="column" width="100%" height="100%">
          <Map
            height="40vh"
            paddingTop="0px"
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
                  id: '',
                } as RatingForm
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
                        label="Para você, o quanto esse local é LGBTI+ friendly?"
                        selectProps={{
                          placeholder: 'Selecione uma opção',
                          cursor: 'pointer',
                        }}
                        helperText="Considere 1 (péssimo) e 5 (ótimo)"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </SelectControl>

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
                            Esse local é frequentado pela comunidade LGBTI+.{' '}
                          </CheckboxSingleControl>
                        </Stack>
                      </FormControl>
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
  const { desktop } = useMediaQueryContext()

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
