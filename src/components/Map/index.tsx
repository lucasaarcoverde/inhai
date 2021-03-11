import React, { useEffect } from 'react'
import useHere, { HereItem } from '../../hooks/useHere'
import { getMarkerIcon } from './utils'

interface MapProps {
  item: HereItem
}

declare global {
  interface Window {
    H: any
  }
}

const CAMPINAGRANDE_GEOLOCATION = '-7.23072,-35.8817'

/** @todo
 * improve search. Now is static in campina grande
 * */
export const Map = React.memo(({ item }: MapProps) => {
  const mapRef = React.useRef(null)

  const defaultLocation = {
    lat: -7.223895099999999,
    lng: -35.8825037,
  }

  const currentLocation = defaultLocation

  useEffect(() => {
    if (!mapRef.current) return

    try {
      const { H, devicePixelRatio } = window as Window

      const client = new H.service.Platform({
        // app_id: process.env.GATSBY_HERE_APP_ID,
        apikey: process.env.GATSBY_HERE_KEY,
      })

      if (!client) return

      const defaultLayers = client.createDefaultLayers()

      const position = item.position ?? defaultLocation

      console.log('defaultLayers', defaultLayers)
      console.log('H', H)

      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: defaultLocation,
        zoom: 16,
        pixelRatio: 1,
      })

      return () => {
        map.dispose()
      }
    } catch (err) {
      console.error('Error instantiating Here client', err)
    }

    /* eslint-disable-next-line */
    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    /* eslint-disable-next-line */
    // var ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-BR')

    // const markerIcon = new H.map.Icon(getMarkerIcon())
    // const fixedMarker = new H.map.Marker(currentLocation, {
    //   icon: markerIcon,
    // })

    // map.addObject(fixedMarker)

    // console.log(item)

    // const marker = new H.map.Marker(position, {
    //   icon: markerIcon,
    // })

    // map.addObject(marker)
    // map.setCenter(position)

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
  }, [currentLocation, item]) // This will run this hook every time this ref is updated

  return (
    <div>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  )
})
