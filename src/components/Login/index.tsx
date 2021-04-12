import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Heading,
  Center,
  FormErrorMessage,
  FormLabel,
  useDisclosure,
  createStandaloneToast,
  HStack,
} from '@chakra-ui/react'

import * as Yup from 'yup'
import { FcGoogle } from 'react-icons/fc'
import { CgProfile } from 'react-icons/cg'
import { navigate } from 'gatsby'
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { useAuth } from '../../contexts/firebase'
import { Formik, Form, Field } from 'formik'
import useFirebase from '../../hooks/useFirebase'
import { PasswordRecovery } from './components/PasswordRecovery'

export type Values = { name: string; email: string; password: string }

const signupValidationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório.'),
  email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatório.')
    .min(6, 'Sua senha deve ter no mínimo 6 caracteres.'),
})

const signinValidationSchema = Yup.object({
  email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório.'),
})

export const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [signup, setSignup] = useState(false)

  const toast = useCallback(createStandaloneToast(), [])
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { firebase, loginWithGoogle } = useAuth()
  const { updateInfo } = useFirebase()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate('/app')
      }
    })
  }, [firebase])

  const handleEmailLogin = useCallback(async (values: Values) => {
    const { email, password } = values
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigate('/app/loading')
          })
          .catch(() => {
            toast({
              title: 'Erro ao entrar.',
              description: 'Email ou senha inválidos.',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
          })
      })
  }, [])

  // Method for signing up and logging in.
  const handleEmailSignup = useCallback(async (values: Values) => {
    const { email, name, password } = values
    const db = firebase.firestore()

    const usersRef = db.collection('users')

    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user
            if (!user) return

            const userDb = {
              name,
              email,
              displayName: name,
              id: user.uid,
              newUser: true,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            }

            usersRef.doc(user.uid).set(userDb)

            user.sendEmailVerification().then(() => {
              toast({
                title: 'Verificação de email',
                description: 'Enviamos um email para você.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
              })
            })

            updateInfo({
              users: firebase.firestore.FieldValue.increment(1),
            })
            navigate('/app/loading')
          })
          .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
              toast({
                title: 'Erro ao criar conta.',
                description: 'Esse email já está em uso.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
              })
            } else {
              console.log(err)
              toast({
                title: 'Erro ao criar conta.',
                description: 'Email ou senha inválidos.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
              })
            }
          })
      })
  }, [])

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values, actions) => {
        console.log('submit')
        if (signup) {
          handleEmailSignup(values)
        } else {
          handleEmailLogin(values)
        }
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 1000)
      }}
      validationSchema={
        signup ? signupValidationSchema : signinValidationSchema
      }
    >
      {(props) => (
        <Form>
          <Stack spacing={6}>
            <Center padding={6}>
              <Heading color="teal.500">Inhaí</Heading>
            </Center>
            <Stack>
              {signup && (
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      isRequired
                    >
                      <FormLabel
                        htmlFor="name"
                        color="gray.400"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Nome
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<Icon as={CgProfile} color="gray.300" />}
                        />
                        <Input
                          {...field}
                          id="name"
                          placeholder="Nome"
                          variant="flushed"
                          aria-describedby="name-helper"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}
              <Field name="email">
                {({ field, form }: any) => (
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
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    isRequired
                  >
                    <FormLabel
                      htmlFor="password"
                      color="gray.400"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Senha
                    </FormLabel>
                    <InputGroup size="md">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<LockIcon color="gray.300" />}
                      />
                      <Input
                        {...field}
                        variant="flushed"
                        pr="4.5rem"
                        type={passwordShown ? 'text' : 'password'}
                        placeholder="Insira sua senha"
                        id="password"
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          aria-label="password-button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setPasswordShown((prev) => !prev)}
                          icon={passwordShown ? <ViewIcon /> : <ViewOffIcon />}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {!signup && (
                <Flex justify="flex-end">
                  <Button
                    variant="link"
                    size="xs"
                    color="blue.600"
                    onClick={onOpen}
                  >
                    Esqueci a senha
                  </Button>
                  <PasswordRecovery open={isOpen} handleClose={onClose} />
                </Flex>
              )}
            </Stack>

            <Stack spacing="2">
              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                isLoading={props.isSubmitting}
              >
                {signup ? 'Registrar' : 'Entrar'}
              </Button>
              <Flex justify="center">
                <Text fontSize="xs" color="blackAlpha" fontWeight="semibold">
                  {signup ? 'Já possui uma conta?' : 'Novo no Inhaí?'}{' '}
                  <Button
                    variant="link"
                    size="xs"
                    color="blue.600"
                    onClick={() => setSignup((prev) => !prev)}
                  >
                    {signup ? 'Entrar' : 'Registrar-se'}
                  </Button>
                </Text>
              </Flex>
            </Stack>
            <HStack spacing="2" justifyContent="center">
              <Text minWidth="100px" textColor="gray.500" fontSize="sm">
                ou entre com:
              </Text>
              <IconButton
                icon={<Icon boxSize={6} as={FcGoogle} />}
                shadow="md"
                colorScheme="whiteAlpha"
                size="md"
                borderRadius="full"
                onClick={() => {
                  loginWithGoogle()
                  navigate('/loading')
                }}
                aria-label="Entrar com google"
              />
            </HStack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
