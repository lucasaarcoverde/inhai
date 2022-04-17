import { useRef, useState, useEffect } from 'react'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVjYXNhbiIsImEiOiJjbDF5YTExZjYwYXl1M2NuM2V4M3kxa25oIn0.zu_NQpO3KzpynI-9GdXFeg'

export function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/lucasan/cl1yaic41004715oa5elttel3',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  return (
    <div>
      <div ref={mapContainer} className="h-96" />
    </div>
  )
}
