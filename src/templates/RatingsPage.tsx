import * as React from 'react'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import { Box, useDisclosure } from '@chakra-ui/react'

import { Search } from '../components/Search'
import { Map } from '../components/Map'
import { HereItem } from '../hooks/useHere'

// markup
const RatingsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [item, setItem] = React.useState<HereItem>({} as HereItem)

  return (
    <Layout onOpenSearch={onOpen}>
      <Box position="relative" height="40vh">
        <Map item={item} />
      </Box>
      {children}
      <Search isSearchOpen={isOpen} onCloseSearch={onClose} setItem={setItem} />
    </Layout>
  )
}

export default RatingsPage
