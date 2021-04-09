import { Box, BoxProps, Fade, Skeleton, useColorMode } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/firebase'
import { useMap } from '../../contexts/map'
import { HereItem } from '../../hooks/useHere'
import { RatedPlace } from '../../templates/RatingsPage'
import { getMarkerIcon } from './utils'

interface MapProps extends BoxProps {
  searchedItem: HereItem
  setCurrentItem: React.Dispatch<React.SetStateAction<RatedPlace>>
  onOpenDetails: () => void
  items?: HereItem[]
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
  ...boxProps
}: MapProps) => {
  const mapRef = React.useRef(null)
  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  const { colorMode } = useColorMode()

  const [loading, setLoading] = useState(true)
  const [windowLoading, setWindowLoading] = useState(true)
  const [mapOpen, setMapOpen] = useState(false)
  const { user } = useAuth()
  const [initialLocation, setInitialLocation] = useState(defaultLocation)
  const { items } = useMap()

  useEffect(() => {
    if (!user) return

    if (user?.currentLocation) setInitialLocation(user.currentLocation)
  }, [user])

  useEffect(() => {
    if (!mapRef.current) return

    if (!windowLoading) {
      const { H, devicePixelRatio } = window as Window
      const client = new H.service.Platform({
        app_id: process.env.GATSBY_HERE_APP_ID,
        apikey: process.env.GATSBY_HERE_KEY,
      })
      const defaultLayers = client.createDefaultLayers()

      const mapLayer =
        colorMode === 'light'
          ? defaultLayers.raster.normal.map
          : defaultLayers.raster.normal.mapnight

      const map = new H.Map(mapRef.current, mapLayer, {
        center: initialLocation,
        zoom: 14,
        pixelRatio: devicePixelRatio ?? 1,
      })

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
      var ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR')

      const markerIcon = new H.map.Icon(getMarkerIcon())

      const markers =
        items?.map((item) => {
          const marker = new H.map.Marker(item.position, {
            icon: markerIcon,
          })

          marker.setData(item)

          marker.addEventListener('tap', (evt: any) => {
            if (!evt) return
            const data = evt.target.getData()

            setCurrentItem(data as RatedPlace)

            map.getViewModel().setLookAtData({
              position: data.position,
            })

            setTimeout(onOpenDetails, 50)
          })

          return marker
        }) ?? []

      if (searchedItem?.position) {
        const marker = new H.map.Marker(searchedItem.position, {
          icon: markerIcon,
        })

        marker.setData(searchedItem)

        marker.addEventListener('tap', (evt: any) => {
          if (!evt) return
          const data = evt.target.getData() as HereItem

          setCurrentItem(data as RatedPlace)
          map.getViewModel().setLookAtData({
            position: data.position,
          })

          setTimeout(onOpenDetails, 50)
        })

        markers.push(marker)

        map.setCenter(searchedItem.position)
      }

      const container = new H.map.Group({
        objects: markers,
      })

      map.addObject(container)

      window.addEventListener('resize', () => map.getViewPort().resize())

      return () => {
        map.dispose()
      }
    }

    return
  }, [windowLoading, searchedItem, items, colorMode, initialLocation])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
        setMapOpen(true)
      }, 1400)
    }

    if (windowLoading) {
      setTimeout(() => {
        setWindowLoading(false)
      }, 600)
    }
  }, [])

  const { pathname } = useLocation()

  return (
    <Box
      position="relative"
      width="100%"
      maxHeight="-webkit-fill-available"
      {...boxProps}
    >
      {loading && (
        <Box
          height={pathname.includes('ratings') ? 'calc(40vh - 56px)' : '100%'}
          width="100%"
          padding={1}
        >
          <Skeleton width="100%" height="100%" />
        </Box>
      )}
      <Fade in={mapOpen}>
        <Box
          position="absolute"
          paddingTop="56px"
          top="-56px"
          bottom="0"
          ref={mapRef}
          height="100vh"
          width="100%"
          {...boxProps}
        />
      </Fade>
    </Box>
  )
}
