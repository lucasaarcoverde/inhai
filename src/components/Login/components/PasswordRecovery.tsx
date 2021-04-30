import { EmailIcon } from '@chakra-ui/icons'
import * as Sentry from '@sentry/gatsby'
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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import type { FormikHelpers } from 'formik'
import { Field, Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/firebase'

const recoveryPasswordSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Email inválido.')
    .required('Email é obrigatório'),
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
        .catch((err) => {
          if (err.code === 'auth/user-not-found') {
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

          Sentry.captureException(err)
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
        <ModalCloseButton />
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
