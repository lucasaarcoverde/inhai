import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
  Text,
  Textarea,
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
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  useField,
} from 'formik'
import { useAuth } from '../contexts/firebase'
import { useMediaQueryContext } from '../contexts'
import { SearchIcon } from '@chakra-ui/icons'

interface Rating {
  comment: string
  safePlace: boolean
  frequentedBy: boolean
  friendly: number
  place: HereItem
}

interface RatedPlace extends HereItem {
  ratings: Rating[]
}

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

  const [currentItem, setCurrentItem] = useState<HereItem>({} as HereItem)

  function validateField(value: string, message: string) {
    return !value ? message : undefined
  }

  const handleSubmit = useCallback(
    (values: Rating, actions: FormikHelpers<Rating>) => {
      const { place, ...rating } = values
      const { id: userId = 'anon' } = user ?? {}
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
                ratings: [...ratings, { ...rating, placeId: id, userId }],
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
                ratings: [{ ...rating, placeId: uuid, userId }],
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
        <Flex
          direction="column"
          width="100%"
          maxHeight="-webkit-fill-available"
          overflowY="scroll"
        >
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
                  friendly: 3,
                  place: {},
                } as Rating
              }
              onSubmit={handleSubmit}
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
                      <Field
                        name="friendly"
                        validate={(value: string) =>
                          validateField(value, 'Este campo é obrigatório!')
                        }
                      >
                        {({
                          field,
                          form: { errors, touched },
                        }: FieldProps<string>) => {
                          return (
                            <FormControl
                              isInvalid={
                                !!errors.friendly && !!touched.friendly
                              }
                              isRequired
                            >
                              <FormLabel
                                htmlFor="friendly-select"
                                color="gray.400"
                                fontSize="xs"
                                fontWeight="semibold"
                              >
                                De 1 (péssimo) a 5 (ótimo) o quanto esse local é
                                LGBTQI+ friendly?
                              </FormLabel>
                              <Select
                                {...field}
                                id="friendly-select"
                                maxWidth={400}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </Select>
                              <FormErrorMessage>
                                {errors.friendly}
                              </FormErrorMessage>
                            </FormControl>
                          )
                        }}
                      </Field>
                      <Field name="comment">
                        {({ field }: FieldProps<string>) => (
                          <FormControl>
                            <FormLabel
                              htmlFor="comments"
                              color="gray.400"
                              fontSize="xs"
                              fontWeight="semibold"
                            >
                              Comentários
                            </FormLabel>
                            <Textarea
                              {...field}
                              id="comment"
                              variant="outline"
                              aria-describedby="comments-helper"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <FormControl>
                        <Stack direction="row" spacing={1}>
                          <FormLabel
                            htmlFor="group"
                            color="gray.400"
                            fontSize="xs"
                            fontWeight="semibold"
                            marginX={0}
                          >
                            Assinale as opções que você concorda.
                          </FormLabel>
                        </Stack>
                        <Stack>
                          <Field type="checkbox" name="safePlace">
                            {({ field }: FieldProps) => (
                              <Checkbox {...field}>
                                Me sinto seguro nesse local.
                              </Checkbox>
                            )}
                          </Field>
                          <Field type="checkbox" name="frequentedBy">
                            {({
                              field: { value, onChange, ...rest },
                            }: FieldProps) => {
                              return (
                                <Checkbox
                                  checked={value}
                                  onChange={(e) => onChange(e)}
                                  {...rest}
                                >
                                  Esse local é frequentado pela comunidade
                                  LGBTQI+.
                                </Checkbox>
                              )
                            }}
                          </Field>
                        </Stack>
                      </FormControl>
                      <Button
                        isLoading={props.isSubmitting}
                        type="submit"
                        colorScheme="teal"
                        disabled={!searchedItem?.title}
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
