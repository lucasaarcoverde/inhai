import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Spinner,
  Flex,
  Stack,
  Center,
  Box,
  createStandaloneToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  FlexProps,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'

import { InputControl, SelectControl } from 'formik-chakra-ui'
import { useAuth, User } from '../../contexts/firebase'
import { ProfileDropzone } from './components/Dropzone'
import { useMediaQuery } from '../../contexts'
import * as Yup from 'yup'
import useFirebase from '../../hooks/useFirebase'

const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  displayName: Yup.string().required('Nome de usuário é obrigatório'),
})

const labelStyle = {
  label: {
    fontSize: 'xs',
    fontWeight: 'semibold',
  },
  ':disabled': {
    label: {
      fontSize: 'xs',
      fontWeight: 'semibold',
    },
  },
}
export function Profile(props: FlexProps) {
  const [emailVerified, setEmailVerified] = useState(true)

  const { user, logout, setUser, firebase } = useAuth()
  const toast = useCallback(createStandaloneToast(), [])
  const { desktop } = useMediaQuery()
  const { updateInfo } = useFirebase()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const cancelRef = React.useRef<HTMLButtonElement>()

  useEffect(() => {
    const currentUser = firebase.auth().currentUser

    if (!currentUser) return

    setEmailVerified(currentUser.emailVerified)
  }, [])

  const verifyEmail = useCallback(() => {
    const currentUser = firebase.auth().currentUser

    if (!currentUser) return

    currentUser
      .sendEmailVerification()
      .then(() => {
        toast({
          title: 'Verificação de email',
          description: 'Enviamos um email para você.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
      .catch(() => {
        toast({
          title: 'Verificação de email',
          description: 'Falha ao enviar email de verificação, tente novamente.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
  }, [firebase])

  const successSaving = useCallback(
    () =>
      toast({
        title: 'Mudanças salvas.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const errorSaving = useCallback(
    () =>
      toast({
        title: 'Erro ao salvar.',
        description: 'Tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const successDeleting = useCallback(
    () =>
      toast({
        title: 'Usuário deletado.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const errorDeleting = useCallback(
    () =>
      toast({
        title: 'Erro ao deletar.',
        description: 'Tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: desktop ? 'bottom-right' : 'top',
      }),
    [toast, desktop]
  )

  const handleSubmit = useCallback(
    (values: User, actions: FormikHelpers<User>) => {
      const { id = 'anon' } = user ?? {}
      const db = firebase.firestore()
      db.collection('users')
        .doc(id)
        .update({ ...values, age: Number(values.age) })
        .then(() => {
          successSaving()
          setUser(values)
        })
        .catch(() => errorSaving())
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [user, setUser, firebase]
  )

  const handleUserDelete = useCallback((user: User) => {
    const { id } = user
    const db = firebase.firestore()

    db.collection('users')
      .doc(id)
      .delete()
      .then(() => {
        successDeleting()
        updateInfo({
          users: firebase.firestore.FieldValue.increment(-1),
        })
        logout()
      })
      .catch(() => {
        errorDeleting()
      })
  }, [])

  return !user ? (
    <Center h="100%" w="100%" {...props}>
      <Spinner size="xl" />
    </Center>
  ) : (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={user}
    >
      {({ isSubmitting }) => (
        <Flex paddingY="6" justifyContent="center" width="100%" {...props}>
          <Box maxWidth="600px">
            <Form>
              <Stack justifyContent="center" align="center">
                <ProfileDropzone name="photo" user={user} />
                <InputControl
                  sx={labelStyle}
                  name="name"
                  label="Nome"
                  isRequired
                />
                <InputControl
                  sx={labelStyle}
                  isRequired
                  name="displayName"
                  label="Nome de usuário"
                />
                <InputControl
                  isDisabled
                  sx={{ label: { fontSize: 'xs' } }}
                  name="email"
                  label="Email"
                  isRequired
                />
                {!emailVerified && (
                  <Alert
                    minHeight="32px"
                    fontSize="xs"
                    variant="top-accent"
                    status="warning"
                  >
                    <AlertIcon boxSize="4" />
                    Seu e-mail ainda não foi verificado.{' '}
                    <Button
                      variant="link"
                      size="xs"
                      fontSize="xs"
                      color="blue.600"
                      onClick={verifyEmail}
                    >
                      Verificar
                    </Button>
                  </Alert>
                )}
                <SelectControl
                  sx={labelStyle}
                  name="sexualOrientation"
                  label="Orientação Sexual"
                  selectProps={{
                    placeholder: 'Selecione uma opção',
                    cursor: 'pointer',
                  }}
                >
                  <option value="lesbian">Lésbica</option>
                  <option value="gay">Gay</option>
                  <option value="bi">Bissexual</option>
                  <option value="straight">Heterossexual</option>
                  <option value="pan">Pansexual</option>
                  <option value="asexual">Assexual</option>
                  <option value="do-not-know">Não sei responder</option>
                  <option value="prefer-not-to-answer">
                    Prefiro não responder
                  </option>
                  <option value="other-orientation">Outros</option>
                </SelectControl>
                <SelectControl
                  sx={labelStyle}
                  name="genderIdentity"
                  label="Identidade de Gênero"
                  selectProps={{
                    placeholder: 'Selecione uma opção',
                    cursor: 'pointer',
                  }}
                >
                  <option value="cis-woman">Mulher cis</option>
                  <option value="cis-man">Homem cis</option>
                  <option value="trans-woman">Mulher trans</option>
                  <option value="trans-man">Homem trans</option>
                  <option value="non-binary">Não-binário</option>
                  <option value="do-not-know">Não sei responder</option>
                  <option value="prefer-not-to-answer">
                    Prefiro não responder
                  </option>
                  <option value="other-gender">Outros</option>
                </SelectControl>
                <SelectControl
                  sx={labelStyle}
                  name="pronoun"
                  label="Pronome"
                  selectProps={{
                    placeholder: 'Selecione uma opção',
                    cursor: 'pointer',
                  }}
                >
                  <option value="he/him">Ele/Dele</option>
                  <option value="she/her">Ela/Dela</option>
                  <option value="They/Them">Eles/Deles</option>
                  <option value="other-pronoun">Outros</option>
                </SelectControl>
                <SelectControl
                  sx={labelStyle}
                  name="age"
                  label="Idade"
                  selectProps={{
                    placeholder: 'Selecione uma idade',
                    cursor: 'pointer',
                  }}
                >
                  {Array.from({ length: 100 }, (_, index) => (
                    <option key={index} value={index + 16}>
                      {index + 16}
                    </option>
                  ))}
                </SelectControl>
              </Stack>
              <Stack direction="row" width="100%" paddingTop="6">
                <Button
                  onClick={onOpen}
                  colorScheme="red"
                  width="50%"
                  variant="outline"
                >
                  Desativar
                </Button>
                <AlertDialog
                  size="xs"
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef as any}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Deletar usuário
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Você tem certeza? Essa ação não poderá ser desfeita.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef as any} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleUserDelete(user)}
                          ml={3}
                        >
                          Deletar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <Button
                  isLoading={isSubmitting}
                  minWidth="150px"
                  colorScheme="teal"
                  type="submit"
                >
                  Salvar
                </Button>
              </Stack>
            </Form>
          </Box>
        </Flex>
      )}
    </Formik>
  )
}
