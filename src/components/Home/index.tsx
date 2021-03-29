export * from './components'

import React from 'react'

import { Stack } from '@chakra-ui/react'
import { Profile, Ratings, Search } from './components'

export function Home() {
  return (
    <Stack overflowY="scroll" spacing={4} padding={6}>
      <Search />
      <Ratings />
      <Profile />
    </Stack>
  )
}
