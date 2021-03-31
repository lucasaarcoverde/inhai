export * from './components'

import React from 'react'

import { Stack } from '@chakra-ui/react'
import { Profile, Ratings, Search, Faq } from './components'

export function Home() {
  return (
    <Stack height="100%" align="center" width="100%" spacing={4} padding={6}>
      <Search />
      <Ratings />
      <Profile />
      <Faq />
    </Stack>
  )
}
