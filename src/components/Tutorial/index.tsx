import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Text,
  Stack,
  Grid,
  Flex,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/firebase'
import useFirebase from '../../hooks/useFirebase'
import {
  Map,
  PlaceDetail,
  Profile,
  Rating,
  Search,
  Welcome,
} from './components'

export function Tutorial() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useAuth()
  const { db } = useFirebase()

  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!user) return

    if (user.newUser) onOpen()
  }, [user])

  const onCloseTutorial = useCallback(() => {
    db.collection('users')
      .doc(user?.id)
      .update({ newUser: false })
      .then(() => {
        onClose()
        if (user) setUser({ ...user, newUser: false })
      })
  }, [user, onClose])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          {step === 0 && user && <Welcome user={user} />}
          {step === 1 && <Map />}
          {step === 2 && <PlaceDetail />}
          {step === 3 && <Search />}
          {step === 4 && <Rating />}
          {step === 5 && <Profile />}

          {step === 0 ? (
            <ModalFooter>
              <Stack spacing="2" direction="row">
                <Button
                  size="sm"
                  colorScheme="teal"
                  variant="outline"
                  onClick={onCloseTutorial}
                >
                  Pular
                </Button>
                <Button size="sm" colorScheme="teal" onClick={() => setStep(1)}>
                  Começar
                </Button>
              </Stack>
            </ModalFooter>
          ) : (
            <ModalFooter>
              <Grid width="100%" gridTemplateColumns="1fr 1fr 1fr">
                {step <= 5 && (
                  <Flex align="center" justifyContent="flex-start">
                    <IconButton
                      size="sm"
                      aria-label="próximo"
                      icon={<ArrowBackIcon />}
                      variant="ghost"
                      onClick={() => setStep((prev) => prev - 1)}
                    />
                  </Flex>
                )}
                <Flex align="center" justifyContent="center">
                  {step < 5 && (
                    <Text color="gray.400" fontSize="14px">
                      {`(${step}/5)`}
                    </Text>
                  )}
                </Flex>

                <Flex align="center" justifyContent="flex-end">
                  {step < 5 ? (
                    <IconButton
                      size="sm"
                      aria-label="próximo"
                      icon={<ArrowForwardIcon />}
                      variant="ghost"
                      onClick={() => setStep((prev) => prev + 1)}
                    />
                  ) : (
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={onCloseTutorial}
                    >
                      Finalizar
                    </Button>
                  )}
                </Flex>
              </Grid>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
