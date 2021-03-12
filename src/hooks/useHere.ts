/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CAMPINAGRANDE_GEOLOCATION = '-7.23072,-35.8817'

export type HereItem = {
  title: string
  address: {
    label: string
    state: string
    stateCode: string
    houseNumber: string
    city: string
    district: string
    street: string
    postalCode: string
  }
  position: {
    lat: number
    lng: number
  }
}

type HereDiscoverReturn = {
  items: HereItem[]
}

export default () => {
  const hereClient = useRef()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      const { H } = window as Window
      try {
        hereClient.current = new H.service.Platform({
          app_id: process.env.GATSBY_HERE_APP_ID,
          apikey: process.env.GATSBY_HERE_KEY,
        })
      } catch (err) {
        console.error('Error instantiating Here client', err)
      }
    }
  }, [loading])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [])

  const discoverAddress = useCallback(
    async ({
      q,
      at,
      limit = 10,
      inParam,
    }: {
      q: string
      limit?: number
      inParam?: string
      at?: string
    }) => {
      if (!hereClient.current) return Promise.reject()

      const client = hereClient.current as any

      return new Promise<HereDiscoverReturn>((resolve, reject) => {
        client.getSearchService().discover(
          {
            at: at ?? CAMPINAGRANDE_GEOLOCATION,
            limit,
            q,
            in: inParam ?? 'countryCode:BRA',
          },
          (data: HereDiscoverReturn) => resolve(data),
          (error: any) => {
            console.log(error)
            reject(error)
          }
        )
      })
    },
    []
  )

  return {
    discoverAddress,
    client: hereClient.current as any,
  }
}
