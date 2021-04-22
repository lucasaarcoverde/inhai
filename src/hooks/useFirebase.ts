/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react'

import { useAuth } from '../contexts/firebase'
import type { RatedPlace, Rating } from '../templates/RatingsPage'

export default () => {
  const { firebase, collectionRef } = useAuth()

  const db = useMemo(() => firebase.firestore(), [firebase])

  const updatePlaceRating = useCallback(
    (place: RatedPlace, rating: Rating, increment = true) => {
      const placeRating = handlePlaceRating(place, rating, increment)

      return collectionRef?.(db, 'places').doc(place.id).update(placeRating)
    },
    []
  )

  const addPlace = useCallback((place: RatedPlace, rating: Rating) => {
    const placeRating = handlePlaceRating(
      {
        ...place,
        totalRatings: 0,
        averageRating: 0,
        ratingsQty: 0,
        safePlace: 0,
        frequentedBy: 0,
        unsafePlace: 0,
        notFrequentedBy: 0,
        rateDetails: {
          horrible: 0,
          bad: 0,
          neutral: 0,
          good: 0,
          excellent: 0,
        },
      },
      rating,
      true
    )

    return collectionRef?.(db, 'places')
      .doc(place.id)
      .set({
        ...place,
        ...placeRating,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
  }, [])

  const updateRatingInfo = useCallback((rating: Rating) => {
    const ratingDetail = {
      ratings: firebase.firestore.FieldValue.increment(1),
      positiveRatings: firebase.firestore.FieldValue.increment(
        rating.rate > 3 ? 1 : 0
      ),
      negativeRatings: firebase.firestore.FieldValue.increment(
        rating.rate <= 3 ? 1 : 0
      ),
      ratingsWithComment: firebase.firestore.FieldValue.increment(
        rating.comment ? 1 : 0
      ),
      anonymousRatings: firebase.firestore.FieldValue.increment(
        rating.anonymous ? 1 : 0
      ),
    }

    collectionRef?.(db, 'info').doc('app-information').update(ratingDetail)
  }, [])

  const addRating = useCallback((rating: Rating) => {
    return collectionRef?.(db, 'ratings')
      .doc(rating.id)
      .set({
        ...rating,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
  }, [])

  const addCity = useCallback((id: string) => {
    return collectionRef?.(db, 'cities')
      .doc(id)
      .set({ createdAt: firebase.firestore.Timestamp.fromDate(new Date()) })
  }, [])

  const updateInfo = useCallback((info: any) => {
    return collectionRef?.(db, 'info').doc('app-information').update(info)
  }, [])

  return {
    db,
    addPlace,
    addRating,
    addCity,
    updateInfo,
    updatePlaceRating,
    updateRatingInfo,
  }
}

const handlePlaceRating = (
  place: RatedPlace,
  rating: Rating,
  increment: boolean
) => {
  const { max } = Math
  const { horrible, bad, good, neutral, excellent } = place.rateDetails

  const unit = increment ? 1 : -1

  const totalRatings = increment
    ? place.totalRatings + rating.rate
    : max(0, place.totalRatings - rating.rate)

  const ratingsQty = place.ratingsQty + unit
  const averageRating = totalRatings / max(1, ratingsQty)

  return {
    totalRatings,
    ratingsQty,
    averageRating,
    safePlace: rating.safePlace
      ? max(0, place.safePlace + unit)
      : place.safePlace,
    frequentedBy: rating.frequentedBy
      ? max(0, place.frequentedBy + unit)
      : place.frequentedBy,
    unsafePlace: !rating.safePlace
      ? max(0, place.unsafePlace + unit)
      : place.unsafePlace,
    notFrequentedBy: !rating.frequentedBy
      ? max(0, place.notFrequentedBy + unit)
      : place.notFrequentedBy,
    rateDetails: {
      horrible: rating.rate === 1 ? max(0, horrible + unit) : horrible,
      bad: rating.rate === 2 ? max(0, bad + unit) : bad,
      neutral: rating.rate === 3 ? max(0, neutral + unit) : neutral,
      good: rating.rate === 4 ? max(0, good + unit) : good,
      excellent: rating.rate === 5 ? max(0, excellent + unit) : excellent,
    },
  }
}
