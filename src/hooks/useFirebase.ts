/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react'
import { useAuth } from '../contexts/firebase'
import { RatedPlace, Rating } from '../templates/RatingsPage'

export default () => {
  const { firebase, placesRef, infoRef, ratingsRef, citiesRef } = useAuth()

  const db = useMemo(() => firebase.firestore(), [firebase])

  const updatePlace = useCallback((place: Partial<RatedPlace>) => {
    return placesRef?.(db).doc(place.id).update(place)
  }, [])

  const addPlace = useCallback((place: RatedPlace) => {
    return placesRef?.(db)
      .doc(place.id)
      .set({
        ...place,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      })
  }, [])

  const updateRating = useCallback((rating: Partial<Rating>) => {
    return ratingsRef?.(db).doc(rating.id).update(rating)
  }, [])

  const addRating = useCallback((rating: Rating) => {
    return ratingsRef?.(db)
      .doc(rating.id)
      .set({
        ...rating,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      })
  }, [])

  const addCity = useCallback((id: string) => {
    return citiesRef?.(db)
      .doc(id)
      .set({ created: firebase.firestore.Timestamp.fromDate(new Date()) })
  }, [])

  const updateInfo = useCallback((info: any) => {
    return infoRef?.(db).doc('app-information').update(info)
  }, [])

  return {
    db,
    updatePlace,
    addPlace,
    addRating,
    updateRating,
    addCity,
    updateInfo,
  }
}
