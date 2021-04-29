import { Center, Text, Grid } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'

import { useAuth } from '../../../contexts/firebase'

export interface LGBTFlagProps {
  places: number
  ratings: number
  users: number
}

export function LGBTFlag(props: LGBTFlagProps) {
  const { ratings, places, users } = props

  const [sexualOrientation, setSexualOrientation] = useState<number>(0)
  const [genderIdentity, setGenderIdentity] = useState<number>(0)
  const [lgbtphobia, setLgbtphobia] = useState<number>(0)
  const { firebase } = useAuth()

  useEffect(() => {
    const db = firebase.firestore()
    let cancelled = false

    db.collection('users')
      .where('sexualOrientation', '==', 'do-not-know')
      .get()
      .then((snap) => {
        if (!cancelled) setSexualOrientation(snap.size)
      })

    db.collection('users')
      .where('genderIdentity', '==', 'do-not-know')
      .get()
      .then((snap) => {
        if (!cancelled) setGenderIdentity(snap.size)
      })

    db.collection('users')
      .where('lgbtphobia', '==', true)
      .get()
      .then((snap) => {
        if (!cancelled) setLgbtphobia(snap.size)
      })

    return () => {
      cancelled = true
    }
  }, [firebase])

  const loading =
    !lgbtphobia &&
    !genderIdentity &&
    !users &&
    !ratings &&
    !places &&
    !users &&
    !sexualOrientation

  return loading ? (
    <Grid templateColumns="1fr" templateRows="repeat(6, 80px)">
      <FlagItem color="red" />
      <FlagItem color="orange" />
      <FlagItem color="yellow" />
      <FlagItem color="green" />
      <FlagItem color="blue" />
      <FlagItem color="purple" />
    </Grid>
  ) : (
    <Grid templateColumns="1fr" templateRows="repeat(6, 80px)">
      <FlagItem color="red">{ratings} avaliações</FlagItem>
      <FlagItem color="orange">{places} locais</FlagItem>
      <FlagItem color="yellow">{users} usuários ativos</FlagItem>
      <FlagItem color="green">
        {((lgbtphobia * 100) / users).toFixed(2)}% já sofreram LGBTfobia ou
        conhecem alguém que sofreu
      </FlagItem>
      <FlagItem color="blue">
        {((genderIdentity * 100) / users).toFixed(2)}% não sabem identificar seu
        gênero.
      </FlagItem>
      <FlagItem color="purple">
        {((sexualOrientation * 100) / users).toFixed(2)}% não sabem sua
        orientação sexual.
      </FlagItem>
    </Grid>
  )
}

interface FlagItemProps {
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'orange'
  children?: ReactNode
}
function FlagItem(props: FlagItemProps) {
  const { color, children } = props

  return (
    <Center bg={`${color}.200`} paddingX="4">
      <Text
        fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
        color={`${color}.800`}
        fontWeight="bold"
        textAlign="center"
      >
        {children}
      </Text>
    </Center>
  )
}
