import { Box, Center, Fade, Spinner } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import useGeolocation from '@rooks/use-geolocation'

import { useMediaQuery } from '../../contexts'
import { useAuth } from '../../contexts/firebase'
import type { HereItem } from '../../hooks/useHere'
import type { RatedPlace } from '../../templates/RatingsPage'
import { getPositiveMarkerIcon, getNegativeMarkerIcon } from './utils'

interface MapProps extends BoxProps {
  searchedItem: HereItem
  setCurrentItem: React.Dispatch<React.SetStateAction<RatedPlace>>
  onOpenDetails: () => void
  items?: RatedPlace[]
}

declare global {
  interface Window {
    H: any
  }
}

export const Map = ({
  searchedItem,
  setCurrentItem,
  onOpenDetails,
  items = [],
  ...boxProps
}: MapProps) => {
  const mapRef = React.useRef(null)
  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  const geoObj = useGeolocation()

  const [mapOpen, setMapOpen] = useState(false)
  const [initialLocation, setInitialLocation] = useState(defaultLocation)
  const { desktop } = useMediaQuery()

  const { pathname } = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    if (!geoObj?.lat || !geoObj?.lng) return
    const { lat, lng } = geoObj

    setInitialLocation({ lat, lng })
  }, [geoObj])

  useLayoutEffect(() => {
    if (!mapRef.current) return

    if (!window) return

    const { H, devicePixelRatio } = window as Window

    if (!H) return

    const client = new H.service.Platform({
      apikey: process.env.GATSBY_HERE_KEY,
    })

    const defaultLayers = client.createDefaultLayers()

    const mapLayer = defaultLayers.raster.normal.map

    const map = new H.Map(mapRef.current, mapLayer, {
      center: initialLocation,
      zoom: 15,
      pixelRatio: devicePixelRatio ?? 1,
    })

    window.addEventListener('resize', () => map.getViewPort().resize())

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    const ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR')

    const positiveMarkerIcon = new H.map.Icon(getPositiveMarkerIcon())
    const negativeMarkerIcon = new H.map.Icon(getNegativeMarkerIcon())

    if (!map) return

    map.addEventListener(
      'pointermove',
      (event: MouseEvent) => {
        const viewPort = map.getViewPort()
        const { element } = viewPort

        if (event.target instanceof H.map.Marker) {
          if (!element) return
          element.style.cursor = 'pointer'
        } else {
          element.style.cursor = 'auto'
        }
      },
      false
    )

    map.addEventListener(
      'tap',
      (event: any) => {
        if (!event) return

        if (!(event.target instanceof H.map.Marker)) return

        const data = event?.target?.getData()

        setCurrentItem(data as RatedPlace)
        setTimeout(onOpenDetails, 50)
      },
      false
    )

    const markers =
      items?.map((item) => {
        const { averageRating, position } = item
        const marker = new H.map.Marker(position, {
          icon: averageRating >= 3.5 ? positiveMarkerIcon : negativeMarkerIcon,
        })

        marker.setData(item)

        return marker
      }) ?? []

    if (searchedItem?.position) {
      const marker = new H.map.Marker(searchedItem.position, {
        icon: positiveMarkerIcon,
        zIndex: 1,
      })

      marker.setData(searchedItem)

      markers.push(marker)

      map.setCenter(searchedItem.position)
    }

    const container = new H.map.Group({
      objects: markers,
    })

    map.addObject(container)

    return () => {
      map.dispose()
    }
  }, [window, searchedItem, items, initialLocation])

  useLayoutEffect(() => {
    if (!window) return

    const loadingTimer = setTimeout(() => setMapOpen(true), 600)

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [window])

  return (
    <Box
      position="relative"
      width="100%"
      height={desktop ? 'calc(100vh - 56px)' : 'calc(100vh - 112px)'}
      maxHeight="-webkit-fill-available"
      {...boxProps}
    >
      {(!mapOpen || !user) && (
        <Center
          height={pathname.includes('ratings') ? 'calc(40vh - 56px)' : '100%'}
          width="100%"
          padding={1}
        >
          <Spinner size="xl" color="teal.500" />
        </Center>
      )}
      <Fade in={mapOpen}>
        <Box
          position="absolute"
          top="0"
          ref={mapRef}
          height="100%"
          width="100%"
          {...boxProps}
        />
      </Fade>
    </Box>
  )
}
