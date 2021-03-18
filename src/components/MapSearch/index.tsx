import { Box, Fade, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HereItem } from '../../hooks/useHere'
import { getMarkerIcon } from './utils'

interface MapProps {
  searchedItem: HereItem
  setCurrentItem: React.Dispatch<React.SetStateAction<HereItem>>
  onOpenDetails: () => void
}

declare global {
  interface Window {
    H: any
  }
}

export const MapSearch = ({
  searchedItem,
  setCurrentItem,
  onOpenDetails,
}: MapProps) => {
  const mapRef = React.useRef(null)

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

      const position = searchedItem?.position ?? defaultLocation

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

        setTimeout(onOpenDetails, 50)
      })

      if (searchedItem) {
        console.log('item', searchedItem)

        const marker = new H.map.Marker(position, {
          icon: markerIcon,
        })

        marker.setData(searchedItem)

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

          setTimeout(onOpenDetails, 50)
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
  }, [windowLoading, searchedItem])

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
        <Box
          ref={mapRef}
          height="100vh"
          maxHeight="-webkit-fill-available"
          width="100%"
        />
      </Fade>
    </Box>
  )
}
