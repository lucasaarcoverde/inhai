import { PhoneIcon } from '@chakra-ui/icons'
import {
  Badge,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  ModalFooter,
  WrapItem,
  Wrap,
  Center,
  Button,
  IconButton,
  HStack,
  Divider,
  Flex,
  Icon,
  Skeleton,
} from '@chakra-ui/react'
import { SiTwitter, SiFacebook } from 'react-icons/si'
import React, { useEffect, useMemo, useState } from 'react'
import { useMediaQueryContext } from '../../contexts'
import { RatedPlace, Rating } from '../../templates/RatingsPage'
import { CommentList } from './components/CommentList'
import { RiStarSFill } from 'react-icons/ri'
import { useAuth } from '../../contexts/firebase'
export interface PlaceDetailsProps {
  item: RatedPlace
  isDetailsOpen: boolean
  onCloseDetails: () => void
}

export function PlaceDetails(props: PlaceDetailsProps) {
  const { isDetailsOpen, onCloseDetails, item } = props
  const [ratings, setRatings] = useState([] as Rating[])
  const [loading, setLoading] = useState(true)
  const { firebase } = useAuth()
  const { title = '', address, categories, contacts, averageRating } = item

  useEffect(() => {
    if (!item.id) return
    setLoading(true)
    console.log(loading)
    const db = firebase.firestore()
    db.collection('ratings')
      .where('placeId', '==', item.id)
      .limit(50)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const ratings =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as Rating
          }) ?? []

        setRatings(ratings as Rating[])
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 100)
      })
      .catch((e) => console.log(e))
  }, [item])

  const positiveRatings = useMemo(
    () => ratings.filter((rating) => rating.friendly >= 3 && rating.comment),
    [ratings]
  )

  const label = address?.label
  const firstCategory = categories?.[0]
  const secondCategory = categories?.[1]
  const phone = contacts?.[0]?.phone?.[0].value

  const { mobile } = useMediaQueryContext()
  const { site, facebook, twitter } = useMemo(
    () => getUrls(contacts?.[0]?.www),
    [contacts]
  )

  return (
    <Modal
      isOpen={isDetailsOpen}
      onClose={onCloseDetails}
      size={mobile ? 'xs' : 'sm'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflowY="hidden">
        <ModalHeader isTruncated>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingY="0">
          <Stack spacing="3">
            <Stack spacing="2">
              <Flex align="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Informações do Local
                </Text>
                {averageRating && (
                  <Stack align="center" direction="row" spacing={1}>
                    <Text fontSize="xs" fontWeight="sem">
                      {averageRating.toFixed(2)}
                    </Text>
                    <Icon as={RiStarSFill} boxSize="4" />
                  </Stack>
                )}
              </Flex>
              <Divider />
              <Stack spacing="2">
                <Text fontSize="sm">{label}</Text>
                <HStack spacing={2}>
                  {phone && (
                    <HStack spacing="1">
                      <Center>
                        <PhoneIcon size="xs" />
                      </Center>
                      <Text fontSize="xs">{phone}</Text>
                    </HStack>
                  )}

                  {!!site && (
                    <>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => window.open(site, '_blank')}
                      >
                        Visite o site
                      </Button>
                    </>
                  )}
                  {!!facebook && (
                    <IconButton
                      aria-label="facebook button"
                      icon={<SiFacebook />}
                      colorScheme="facebook"
                      size="xs"
                      onClick={() => window.open(facebook, '_blank')}
                    />
                  )}
                  {!!twitter && (
                    <IconButton
                      aria-label="twitter button"
                      icon={<SiTwitter />}
                      colorScheme="twitter"
                      size="xs"
                      onClick={() => window.open(twitter, '_blank')}
                    />
                  )}
                </HStack>
              </Stack>
            </Stack>
            {loading ? (
              <Stack spacing="2">
                <Skeleton height="14px" width="30%" />

                <Skeleton height="14px" width="100%" />
                <Skeleton height="14px" width="100%" />
              </Stack>
            ) : (
              positiveRatings.length > 0 && (
                <Stack spacing="2">
                  <Text fontWeight="bold" fontSize="sm">
                    Comentárioss
                  </Text>
                  <Divider />
                  <CommentList ratings={positiveRatings} />
                </Stack>
              )
            )}
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Wrap>
            {firstCategory && (
              <WrapItem>
                <Badge
                  variant="solid"
                  colorScheme={getPalettes(firstCategory.name)}
                >
                  {firstCategory.name}
                </Badge>
              </WrapItem>
            )}
            {secondCategory && (
              <WrapItem>
                <Badge
                  variant="solid"
                  colorScheme={getPalettes(secondCategory.name)}
                >
                  {secondCategory.name}
                </Badge>
              </WrapItem>
            )}
          </Wrap>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function getPalettes(category: string) {
  switch (category.toLowerCase()) {
    case 'bar ou pub':
      return 'purple'
    case 'restaurante':
      return 'pink'
    case 'ginásio ou health club':
      return 'yellow'
    case 'padaria':
      return 'orange'
    case 'comida rápida':
      return 'red'
    default:
      return 'blue'
  }
}

function getUrls(contacts: { value: string }[] = []) {
  const site =
    contacts.filter(
      ({ value }) => !value.includes('twitter') && !value.includes('facebook')
    )?.[0]?.value ?? ''

  const twitter =
    contacts.filter(({ value }) => value.includes('twitter'))?.[0]?.value ?? ''

  const facebook =
    contacts.filter(({ value }) => value.includes('facebook'))?.[0]?.value ?? ''

  return { site, twitter, facebook }
}
