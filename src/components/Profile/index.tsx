import React, { useCallback } from 'react'
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
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'

import {
  InputControl,
  NumberInputControl,
  SelectControl,
} from 'formik-chakra-ui'
import { useAuth, User } from '../../contexts/firebase'
import { ProfileDropzone } from './components/Dropzone'
import { useMediaQueryContext } from '../../contexts'

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
export function Profile() {
  const { user, logout, setUser, firebase } = useAuth()
  const toast = useCallback(createStandaloneToast(), [])
  const { desktop } = useMediaQueryContext()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>()

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
      console.log(values)
      db.collection('users')
        .doc(id)
        .update(values)
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
        logout()
      })
      .catch(() => {
        errorDeleting()
      })
  }, [])

  return !user ? (
    <Center h="100%" w="100%">
      <Spinner size="xl" />
    </Center>
  ) : (
    <Formik onSubmit={handleSubmit} initialValues={user}>
      {({ isSubmitting }) => (
        <Flex justifyContent="center" width="100%" overflowY="scroll">
          <Box paddingY="6" maxWidth="600px">
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
                  <option value="another-orientation">Outros</option>
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
                  <option value="cis">Cisgênero</option>
                  <option value="trans">Transgênero</option>
                  <option value="non-binary">Não-binário</option>
                  <option value="do-not-know">Não sei responder</option>
                  <option value="prefer-not-to-answer">
                    Prefiro não responder
                  </option>
                  <option value="another-gender">Outros</option>
                </SelectControl>
                <InputControl
                  sx={labelStyle}
                  name="pronoun"
                  helperText="(Ele/Dele; Ela/Dela; Eles/Deles)"
                  label="Pronome"
                />
                <NumberInputControl sx={labelStyle} name="age" label="Idade" />
              </Stack>
              <Stack marginTop="6" direction="row" width="100%">
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