import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import * as Yup from 'yup'

import { Layout } from '../components/Layout'
import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  useDisclosure,
  createStandaloneToast,
  IconButton,
  Radio,
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
  RadioGroupControl,
  TextareaControl,
} from 'formik-chakra-ui'
import { FormRating } from '../components/FormRating'
import useFirebase from '../hooks/useFirebase'
import firebase from 'firebase/app'

export interface Rating {
  comment: string
  safePlace: boolean
  frequentedBy: boolean
  rate: number
  userId?: string
  user?: User | null
  placeId?: string
  anonymous?: boolean
  id: string
  like: number
  created: firebase.firestore.Timestamp
}

export interface RatedPlace extends HereItem {
  totalRatings: number
  averageRating: number
  totalSafePlace: number
  totalFrequentedBy: number
  safePlace: number
  unsafePlace: number
  frequentedBy: number
  notFrequentedBy: number
  rateDetails: {
    good: number
    bad: number
    excellent: number
    horrible: number
    neutral: number
  }
  ratingsQty: number
}

export interface RatingForm extends Omit<Rating, 'frequentedBy' | 'safePlace'> {
  place: RatedPlace
  frequentedBy: string
  safePlace: string
}

const validationSchema = Yup.object({
  place: Yup.object().required(),
  rate: Yup.number()
    .required('Este campo é obrigatório.')
    .typeError('Este campo é obrigatório.')
    .min(1, 'Você precisa atribuir uma nota.'),
  comment: Yup.string()
    .when('rate', {
      is: (rate: number) => rate < 3,
      then: Yup.string().required(
        'Campo obrigatório em caso de notas abaixo de 3.'
      ),
    })
    .when('safePlace', {
      is: (safePlace: string) => safePlace === 'false',
      then: Yup.string().required(
        'Campo obrigatório caso você não se sinta seguro nesse local.'
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
      const {
        place,
        frequentedBy: formFrequentedBy,
        safePlace: formSafePlace,
        ...rating
      } = values
      const rate = Number(rating.rate)
      const isFrequentedBy =
        formFrequentedBy === 'false'
          ? false
          : formFrequentedBy === 'true'
          ? true
          : null
      const isSafePlace =
        formSafePlace === 'false'
          ? false
          : formSafePlace === 'true'
          ? true
          : null

      db.collection('places')
        .where('position', '==', values.place.position)
        .get()
        .then((snap) => {
          const [doc] = snap.docs
          if (doc && doc.exists) {
            const {
              id,
              totalRatings = 0,
              ratingsQty = 0,
              safePlace = 0,
              unsafePlace = 0,
              frequentedBy = 0,
              notFrequentedBy = 0,
              rateDetails: {
                good = 0,
                bad = 0,
                excellent = 0,
                horrible = 0,
                neutral = 0,
              },
            } = doc.data() as RatedPlace

            updatePlace({
              id,
              totalRatings: totalRatings + rate,
              averageRating: (totalRatings + rate) / (ratingsQty + 1),
              ratingsQty: ratingsQty + 1,
              safePlace: isSafePlace === true ? safePlace + 1 : safePlace,
              frequentedBy:
                isFrequentedBy === true ? frequentedBy + 1 : frequentedBy,
              unsafePlace:
                isSafePlace === false ? unsafePlace + 1 : unsafePlace,
              notFrequentedBy:
                isFrequentedBy === false
                  ? notFrequentedBy + 1
                  : notFrequentedBy,
              rateDetails: {
                horrible: rate === 1 ? horrible + 1 : horrible,
                bad: rate === 2 ? bad + 1 : bad,
                neutral: rate === 3 ? neutral + 1 : neutral,
                good: rate === 4 ? good + 1 : good,
                excellent: rate === 5 ? excellent + 1 : excellent,
              },
            })

            const uuid = v4()
            addRating({
              ...rating,
              safePlace: isSafePlace ? true : false,
              frequentedBy: isFrequentedBy ? true : false,
              placeId: id,
              rate,
              user,
              like: 0,
              id: uuid,
            })
          } else {
            const placeId = v4()

            addPlace({
              ...place,
              id: placeId,
              totalRatings: rate,
              averageRating: rate,
              ratingsQty: 1,
              safePlace: isSafePlace === true ? 1 : 0,
              frequentedBy: isFrequentedBy === true ? 1 : 0,
              unsafePlace: isSafePlace === false ? 1 : 0,
              notFrequentedBy: isFrequentedBy === false ? 1 : 0,
              rateDetails: {
                horrible: rate === 1 ? 1 : 0,
                bad: rate === 2 ? 1 : 0,
                neutral: rate === 3 ? 1 : 0,
                good: rate === 4 ? 1 : 0,
                excellent: rate === 5 ? 1 : 0,
              },
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

              addRating({
                ...rating,
                safePlace: isSafePlace ? true : false,
                frequentedBy: isFrequentedBy ? true : false,
                placeId,
                rate,
                user,
                like: 0,
                id: ratingId,
              })
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
          <Box height="calc(40vh - 56px)">
            <Map
              height="40vh"
              paddingTop="0px"
              onOpenDetails={onOpenDetails}
              searchedItem={searchedItem}
              setCurrentItem={setCurrentItem}
            />
          </Box>
          <Box>
            <Formik
              enableReinitialize
              initialValues={
                {
                  comment: '',
                  safePlace: 'false',
                  frequentedBy: 'false',
                  place: currentItem,
                  rate: 0,
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
                      <CheckboxSingleControl
                        name="anonymous"
                        sx={{ '> label > span': { fontSize: '14px' } }}
                      >
                        Responder anonimamente
                      </CheckboxSingleControl>
                      <FormRating name="rate" />
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
                      ;
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
