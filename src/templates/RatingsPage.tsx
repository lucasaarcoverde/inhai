import * as React from 'react'
import type { RouteComponentProps } from '@reach/router'
import * as Yup from 'yup'
import type { FlexProps } from '@chakra-ui/react'
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
  Grid,
} from '@chakra-ui/react'
import { v4 } from 'uuid'
import { useCallback, useState } from 'react'
import type { FormikHelpers } from 'formik'
import { Form, Formik, useField } from 'formik'
import { SearchIcon } from '@chakra-ui/icons'
import {
  CheckboxSingleControl,
  RadioGroupControl,
  TextareaControl,
} from 'formik-chakra-ui'
import firebase from 'firebase/app'

import { Search } from '../components/Search'
import type { HereItem } from '../hooks/useHere'
import { Map, PlaceDetails, Sidebar } from '../components'
import type { User, Timestamp } from '../contexts/firebase'
import { useAuth } from '../contexts/firebase'
import { useMediaQuery } from '../contexts'
import { FormRating } from '../components/FormRating'
import useFirebase from '../hooks/useFirebase'

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
  term: boolean
  reports: Report[]
  reportedBy: string[]
  createdAt: Timestamp
  visible?: boolean
}

export interface Report {
  notRelated: boolean
  aggressive: boolean
  userId: string
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
    .trim()
    .when('rate', {
      is: (rate: number) => rate <= 3,
      then: Yup.string()
        .trim()
        .required('Campo obrigatório em caso de nota menor ou igual a 3.'),
    })
    .when('safePlace', {
      is: (safePlace: string) => safePlace === 'false',
      then: Yup.string()
        .trim()
        .required(
          'Campo obrigatório caso você não se sinta seguro nesse local.'
        ),
    }),
  term: Yup.boolean().isTrue('Campo obrigatório.'),
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
  const { desktop } = useMediaQuery()
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

  const { user } = useAuth()
  const {
    addRating,
    addPlace,
    addCity,
    updatePlaceRating,
    updateInfo,
    db,
  } = useFirebase()

  const [searchedItem, setSearchedItem] = useState<HereItem>({} as HereItem)

  React.useEffect(() => {
    if (window) {
      const currentPlace = window.localStorage.getItem('rate-place')

      if (currentPlace) {
        window.localStorage.removeItem('rate-place')
        setSearchedItem(JSON.parse(currentPlace))
      }
    }
  }, [])

  const [currentItem, setCurrentItem] = useState<RatedPlace>({} as RatedPlace)

  const handleSubmit = useCallback(
    (values: RatingForm, actions: FormikHelpers<RatingForm>) => {
      const {
        place,
        frequentedBy: formFrequentedBy,
        safePlace: formSafePlace,
        ...restValues
      } = values

      const rate = Number(restValues.rate)
      const isFrequentedBy = formFrequentedBy === 'true'

      const isSafePlace = formSafePlace === 'true'

      const uuid = v4()

      const rating = {
        ...restValues,
        safePlace: isSafePlace,
        frequentedBy: isFrequentedBy,
        rate,
        user,
        like: 0,
        id: uuid,
        visible: true,
      }

      db.collection('places')
        .where('position', '==', values.place.position)
        .get()
        .then((snap) => {
          const [doc] = snap.docs

          if (doc?.exists) {
            const ratedPlace = doc.data() as RatedPlace

            updatePlaceRating(ratedPlace, rating)?.then(() =>
              addRating({ ...rating, placeId: ratedPlace.id })
            )
          } else {
            const placeId = v4()

            addPlace({ ...place, id: placeId }, rating)?.then(() => {
              addRating({
                ...rating,
                placeId,
              })

              updateInfo({
                places: firebase.firestore.FieldValue.increment(1),
              })

              db.collection('cities')
                .doc(place.address.city)
                .get()
                .then((cityDoc) => {
                  if (!cityDoc.exists) {
                    updateInfo({
                      cities: firebase.firestore.FieldValue.increment(1),
                    })
                    addCity(place.address.city)
                  }
                })
            })
          }
        })
        .then(() => {
          actions.resetForm()
          setSearchedItem({} as RatedPlace)
          setCurrentItem({} as RatedPlace)
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

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 112px)', overflowY: 'scroll' }
    : {}

  return (
    <Grid templateColumns={desktop ? '1fr 2fr 1fr' : '1fr'}>
      {desktop && <Sidebar />}
      <Flex direction="column" {...layoutProps}>
        <Box>
          <Map
            height="calc(40vh - 56px)"
            width={desktop ? '100%' : '100vw'}
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
                place: {},
                rate: 0,
                term: false,
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
                  <PlaceField onOpenSearch={onOpenSearch} item={searchedItem} />
                  <Divider />
                  <Stack
                    spacing={2}
                    paddingX="6"
                    paddingTop="3"
                    paddingBottom="6"
                  >
                    <CheckboxSingleControl
                      name="anonymous"
                      sx={{ '> label > span': { fontSize: '14px' } }}
                    >
                      Exibir avaliação anonimamente
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
                      experiência e é minha opinião sincera sobre este local e
                      que não possuo nenhuma relação pessoal ou comercial com
                      esse estabelecimento, não tendo recebido incentivo ou
                      pagamento algum do estabelecimento para escrevê-la.
                    </CheckboxSingleControl>
                    <Button
                      size="sm"
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
      <Search
        isSearchOpen={isSearchOpen}
        onCloseSearch={onCloseSearch}
        setSearchedItem={setSearchedItem}
      />
      <PlaceDetails
        isDetailsOpen={isDetailsOpen}
        onCloseDetails={onCloseDetails}
        item={currentItem}
      />
      {children}
    </Grid>
  )
}

export default RatingsPage

function PlaceField(props: PlaceFieldProps) {
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
