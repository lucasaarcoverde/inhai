import { Box, Fade, Skeleton } from '@chakra-ui/react'
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

export const Map = React.memo(({ item }: MapProps) => {
  const mapRef = React.useRef(null)
  const [loading, setLoading] = useState(true)

  const [mapOpen, setMapOpen] = useState(false)

  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  useEffect(() => {
    if (!mapRef.current) return
    const timeout = loading ? 1000 : 0

    setTimeout(() => {
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

      map.addObject(fixedMarker)

      const marker = new H.map.Marker(position, {
        icon: markerIcon,
      })

      map.addObject(marker)
      map.setCenter(position)

      return () => {
        map.dispose()
      }
    }, timeout)

    return
  }, [item])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
        setMapOpen(true)
      }, 3000)
    }
  }, [])

  return (
    <Fragment>
      <Box>
        {loading && (
          <Box height="100%" width="100%" padding={1} position="absolute">
            <Skeleton height="100%" />
          </Box>
        )}
        <Fade in={mapOpen}>
          <Box ref={mapRef} height="100%" width="100%" position="absolute" />
        </Fade>
      </Box>
    </Fragment>
  )
})
