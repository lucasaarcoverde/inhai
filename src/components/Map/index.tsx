import { LinkIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  useDisclosure,
  Text,
  ModalFooter,
  WrapItem,
  Wrap,
  Center,
  Button,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { SiTwitter, SiFacebook } from 'react-icons/si'
import React, { Fragment, useEffect, useState } from 'react'
import { HereItem } from '../../hooks/useHere'
import { getMarkerIcon } from './utils'

interface MapProps {
  item: HereItem
}

declare global {
  interface Window {
    H: any
  }
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

const defaultItem = {
  title: '',
  address: { label: '' },
  categories: [{ name: '' }, { name: '' }],
  contacts: [{ phone: [{ value: '' }], www: [{ value: '' }] }],
} as HereItem

export const Map = React.memo(({ item }: MapProps) => {
  const mapRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentItem, setCurrentItem] = useState<HereItem>(defaultItem)

  const {
    title = '',
    address: { label = '' },
    categories,
    contacts,
  } = currentItem

  const primaryCategory = categories?.[0]
  const secondaryCategory = categories?.[1]
  const primaryPhone = contacts?.[0]?.phone?.[0].value

  const { site, facebook, twitter } = getUrls(contacts?.[0]?.www)

  const [loading, setLoading] = useState(true)
  const [windowLoading, setWindowLoading] = useState(true)

  const [mapOpen, setMapOpen] = useState(false)

  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  useEffect(() => {
    if (!mapRef.current) return

    if (!windowLoading) {
      const { H, devicePixelRatio } = window as Window
      const client = new H.service.Platform({
        app_id: process.env.GATSBY_HERE_APP_ID,
        apikey: process.env.GATSBY_HERE_KEY,
      })
      const defaultLayers = client.createDefaultLayers()

      const position = item.position ?? defaultLocation

      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: defaultLocation,
        zoom: 16,
        pixelRatio: devicePixelRatio ?? 1,
      })

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
      var ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR')

      const markerIcon = new H.map.Icon(getMarkerIcon())
      const fixedMarker = new H.map.Marker(defaultLocation, {
        icon: markerIcon,
      })

      fixedMarker.setData({
        title: 'Bar do Nilson',
        address: { label: 'Rua teste, perto do pp' },
        categories: [
          { name: 'Bar ou Pub', id: '1' },
          { name: 'Test categoria', id: '2' },
        ],
        contacts: [
          {
            phone: [{ value: '8329318738' }],
            www: [
              { value: 'inhai.app' },
              { value: 'facebook.com/inhai.app' },
              { value: 'twitter.com/inhai.app' },
            ],
          },
        ],
      })

      const container = new H.map.Group({
        objects: [fixedMarker],
      })

      fixedMarker.addEventListener('tap', (evt: any) => {
        if (!evt) return
        const data = evt.target.getData()
        setCurrentItem(data as HereItem)

        map.getViewModel().setLookAtData({
          zoom: 16,
        })
        map.setCenter(data.position)

        setTimeout(onOpen, 50)
      })

      if (item) {
        console.log('item', item)

        const marker = new H.map.Marker(position, {
          icon: markerIcon,
        })

        marker.setData(item)

        const container = new H.map.Group({
          objects: [fixedMarker, marker],
        })

        marker.addEventListener('tap', (evt: any) => {
          if (!evt) return
          const data = evt.target.getData() as HereItem
          setCurrentItem(data)
          map.getViewModel().setLookAtData({
            zoom: 16,
          })
          map.setCenter(data.position)

          setTimeout(onOpen, 50)
        })
        map.addObject(container)
      } else {
        map.addObject(container)
      }

      map.setCenter(position)

      window.addEventListener('resize', () => map.getViewPort().resize())

      return () => {
        map.dispose()
      }
    }

    return
  }, [windowLoading, item])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
        setMapOpen(true)
      }, 3000)
    }

    if (windowLoading) {
      setTimeout(() => {
        setWindowLoading(false)
      }, 1000)
    }
  }, [])

  return (
    <Box width="100%" height="95vh">
      {loading && (
        <Box height="100%" width="100%" padding={1}>
          <Skeleton height="100%" />
        </Box>
      )}
      <Fade in={mapOpen}>
        <Box ref={mapRef} height="100vh" width="100%" />
      </Fade>
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text fontSize="sm">{label}</Text>
              {primaryPhone && (
                <HStack spacing="1">
                  <Center>
                    <PhoneIcon />
                  </Center>
                  <Text size="sm">{primaryPhone}</Text>
                </HStack>
              )}

              <HStack spacing={2}>
                {!!site && (
                  <>
                    <Button
                      leftIcon={<LinkIcon />}
                      size="sm"
                      variant="outline"
                      onClick={() => console.log(site)}
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
                    size="sm"
                    onClick={() => console.log(facebook)}
                  />
                )}
                {!!twitter && (
                  <IconButton
                    aria-label="twitter button"
                    icon={<SiTwitter />}
                    colorScheme="twitter"
                    size="sm"
                    onClick={() => console.log(twitter)}
                  />
                )}
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="flex-start">
            <Wrap>
              {primaryCategory && (
                <WrapItem>
                  <Badge
                    variant="solid"
                    colorScheme={getPalettes(primaryCategory.name)}
                  >
                    {primaryCategory.name}
                  </Badge>
                </WrapItem>
              )}
              {secondaryCategory && (
                <WrapItem>
                  <Badge
                    variant="solid"
                    colorScheme={getPalettes(secondaryCategory.name)}
                  >
                    {secondaryCategory.name}
                  </Badge>
                </WrapItem>
              )}
            </Wrap>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
})

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
