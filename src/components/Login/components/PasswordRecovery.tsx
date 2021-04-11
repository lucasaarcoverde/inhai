import { EmailIcon } from '@chakra-ui/icons'
import {
  Button,
  createStandaloneToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'
import { useAuth } from '../../../contexts/firebase'

const recoveryPasswordSchema = Yup.object({
  email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
})

export function PasswordRecovery(props: PasswordRecoveryProps) {
  const { open, handleClose } = props
  const { firebase } = useAuth()
  const toast = useCallback(createStandaloneToast(), [])

  const handleSubmit = useCallback(
    (values: { email: string }, actions: FormikHelpers<{ email: string }>) => {
      firebase
        .auth()
        .sendPasswordResetEmail(values.email)
        .then(() => {
          toast({
            title: 'Recuperação de Senha',
            description: 'Email enviado.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          handleClose()
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            toast({
              title: 'Recuperação de Senha',
              description: 'Email inválido, tente novamente.',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
          } else {
            toast({
              title: 'Recuperação de Senha',
              description: 'Falha ao enviar email, tente novamente.',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
          }
        })
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [firebase]
  )

  return (
    <Modal isOpen={open} onClose={handleClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="teal.500">Recuperar senha</ModalHeader>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={recoveryPasswordSchema}
          initialValues={{ email: '' }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <Field name="email">
                  {({ field, form }: any) => {
                    return (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel
                          htmlFor="email"
                          color="gray.400"
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          Email
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<EmailIcon color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="email"
                            inputMode="email"
                            placeholder="Email"
                            variant="flushed"
                            aria-describedby="email-helper"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )
                  }}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  mr={3}
                  onClick={handleClose}
                >
                  Fechar
                </Button>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Enviar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

interface PasswordRecoveryProps {
  open: boolean
  handleClose: () => void
}
