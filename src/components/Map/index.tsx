import { Box, BoxProps, Fade, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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

  const [loading, setLoading] = useState(true)
  const [windowLoading, setWindowLoading] = useState(true)
  const [mapOpen, setMapOpen] = useState(false)

  const { items } = useMap()

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

      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: defaultLocation,
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
  }, [windowLoading, searchedItem, items])

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

  return (
    <Box width="100%" maxHeight="-webkit-fill-available">
      {loading && (
        <Box height="100%" width="100%" padding={1}>
          <Skeleton height="100%" width="100%" />
        </Box>
      )}
      <Fade in={mapOpen}>
        <Box ref={mapRef} height="95vh" width="100%" {...boxProps} />
      </Fade>
    </Box>
  )
}
