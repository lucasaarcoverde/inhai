import * as React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Layout } from '../components/Layout'
import {
  Box,
  CloseButton,
  Input,
  Slide,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { isMobile } from 'react-device-detect'

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
        {isMobile && (
          <Slide
            direction="bottom"
            in={isOpen}
            style={{ zIndex: 10, margin: 0 }}
          >
            <Box
              h="100vh"
              paddingX="4"
              paddingY="2"
              bg="white"
              rounded="md"
              shadow="md"
            >
              <Stack spacing="2">
                <CloseButton onClick={onClose} />
                <Input placeholder="Buscar local LGBT-Friendly" />
              </Stack>
            </Box>
          </Slide>
        )}
      </Layout>
    </React.Fragment>
  )
}

export default MapPage
