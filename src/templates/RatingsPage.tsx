import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Box, useDisclosure } from '@chakra-ui/react'

import { Search } from '../components/Search'

import { HereItem } from '../hooks/useHere'

// markup
const RatingsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [_, setItem] = React.useState<HereItem>({} as HereItem)

  return (
    <Layout onOpenSearch={onOpen}>
      <Box position="relative" height="40vh"></Box>
      {children}
      <Search
        isSearchOpen={isOpen}
        onCloseSearch={onClose}
        setSearchedItem={setItem}
      />
    </Layout>
  )
}

export default RatingsPage
