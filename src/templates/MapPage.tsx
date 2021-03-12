import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Box, useDisclosure } from '@chakra-ui/react'

import { Search, Map, Layout } from '../components'
import { HereItem } from '../hooks/useHere'
import { useState } from 'react'

const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [item, setItem] = useState<HereItem>({} as HereItem)

  return (
    <React.Fragment>
      <Layout onOpenSearch={onOpen}>
        <title>Map</title>

        <Map item={item} />

        <Search
          isSearchOpen={isOpen}
          onCloseSearch={onClose}
          setItem={setItem}
        />
        {children}
      </Layout>
    </React.Fragment>
  )
}

export default MapPage
