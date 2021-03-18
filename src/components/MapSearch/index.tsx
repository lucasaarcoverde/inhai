import { Box, Fade, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/firebase'
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

  const [items, setItems] = useState<HereItem[]>()
  const { firebase } = useAuth()
  const [loading, setLoading] = useState(true)
  const [windowLoading, setWindowLoading] = useState(true)
  const [mapOpen, setMapOpen] = useState(false)

  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  useEffect(() => {
    if (items) return

    const db = firebase.firestore()

    db.collection('places')
      .where('positiveRating', '>=', 3)
      .get()
      .then((snap) => {
        const docs = snap.docs
        const mapItems =
          docs.map((doc) => {
            if (!doc.exists) return

            return doc.data() as HereItem
          }) ?? []

        console.log('map items', mapItems)
        setItems(mapItems as HereItem[])
      })
  }, [items])

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

            setCurrentItem(data as HereItem)

            map.setCenter(data.position)
            map.getViewModel().setLookAtData({
              zoom: 16,
              center: data.position,
            })

            setTimeout(onOpenDetails, 50)
          })

          return marker
        }) ?? []

      console.log('searchedItem', searchedItem)
      if (searchedItem?.position) {
        console.log('itemsss', searchedItem)

        const marker = new H.map.Marker(searchedItem.position, {
          icon: markerIcon,
        })

        marker.setData(searchedItem)

        const container = new H.map.Group({
          objects: [...markers, marker],
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
