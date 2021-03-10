import * as React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Layout } from '../components/Layout'
import { useDisclosure } from '@chakra-ui/react'
import { Search } from '../components/Search'

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}

// markup
const MapPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Layout onOpenSearch={onOpen}>
        <title>Map</title>
        {/* <Layout> */}
        <h1 style={headingStyles}>Map Test</h1>
        <p style={paragraphStyles}>
          <Link to="/">Go home</Link>.
        </p>
        {children}
        <Search isSearchOpen={isOpen} onCloseSearch={onClose} />
      </Layout>
    </React.Fragment>
  )
}

export default MapPage
