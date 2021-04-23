import React, { useCallback } from 'react'
import type { FlexProps } from '@chakra-ui/react'
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
  Alert,
  AlertIcon,
  Link,
  Text,
} from '@chakra-ui/react'
import type { FormikHelpers } from 'formik'
import { Form, Formik } from 'formik'
import {
  CheckboxSingleControl,
  InputControl,
  SelectControl,
} from 'formik-chakra-ui'
import * as Yup from 'yup'

import type { User } from '../../contexts/firebase'
import { useAuth } from '../../contexts/firebase'
import { ProfileDropzone } from './components/Dropzone'
import { useMediaQuery } from '../../contexts'
import useFirebase from '../../hooks/useFirebase'
import { useVerified } from '../../contexts/verified'

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Nome é obrigatório'),
  displayName: Yup.string().trim().required('Nome de usuário é obrigatório'),
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

type FormUser = User

export function Profile(props: FlexProps) {
  const { user, logout, setUser, firebase } = useAuth()
  const toast = useCallback(createStandaloneToast(), [])
  const { desktop } = useMediaQuery()
  const { updateInfo } = useFirebase()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { verified } = useVerified()

  const cancelRef = React.useRef<HTMLButtonElement>()

  const verifyEmail = useCallback(() => {
    const { currentUser } = firebase.auth()

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
    (values: FormUser, actions: FormikHelpers<FormUser>) => {
      const { lgbtphobia, afraid, ...restUser } = values
      const { id = 'anon' } = user ?? {}
      const db = firebase.firestore()

      db.collection('users')
        .doc(id)
        .update({
          ...restUser,
          age: Number(values.age),
          lgbtphobia,
          afraid,
        })
        .then(() => {
          successSaving()
          setUser({
            ...restUser,
            lgbtphobia,
            afraid,
          })
        })
        .catch(() => errorSaving())
        .finally(() => {
          actions.setSubmitting(false)
        })
    },
    [user, setUser, firebase]
  )

  const handleUserDelete = useCallback((deleteUser: User) => {
    const { id } = deleteUser
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
      initialValues={
        ({
          ...user,
          lgbtphobia: !!user?.lgbtphobia,
          afraid: !!user?.afraid,
        } as unknown) as FormUser
      }
    >
      {({ isSubmitting }) => {
        return (
          <Flex paddingY="6" justifyContent="center" width="100%" {...props}>
            <Box maxWidth="600px" paddingX="4">
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
                  {!verified && (
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
                      <option key={`profile-age-${index}`} value={index + 16}>
                        {index + 16}
                      </option>
                    ))}
                  </SelectControl>
                  <Stack paddingTop="4" spacing="2">
                    <CheckboxSingleControl
                      name="lgbtphobia"
                      sx={{
                        '> label > span': { fontSize: '12px' },
                      }}
                    >
                      Já sofri LGBTfobia ou conheço alguém que sofreu.
                    </CheckboxSingleControl>
                    <CheckboxSingleControl
                      name="afraid"
                      sx={{
                        '> label > span': { fontSize: '12px' },
                      }}
                    >
                      Já tive receio, ou medo, de sair para algum local apenas
                      por ser da comunidade.
                    </CheckboxSingleControl>
                  </Stack>
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
              <Box padding="6">
                <Text fontSize="xs" fontWeight="normal">
                  Não se sentiu representade?{' '}
                  <Link
                    href="mailto: inhaiapp@gmail.com?subject=Representatividade Inhaí"
                    fontWeight="bold"
                    color="blue.600"
                  >
                    Entre em contato
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
        )
      }}
    </Formik>
  )
}
