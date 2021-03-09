import * as React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import { Layout } from '../components/Layout'
import {
  Box,
  CloseButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
const RatingsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Layout onOpenSearch={onOpen}>
      <title>Ratings</title>

      <h1 style={headingStyles}>Ratings</h1>
      <p style={paragraphStyles}>
        <Link to="/">Go home</Link>.
      </p>
      {children}
      {isMobile ? (
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 10, margin: 0 }}>
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
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input placeholder="Buscar local LGBT-Friendly" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Layout>
  )
}

export default RatingsPage
