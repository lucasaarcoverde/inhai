import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Divider,
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
  Link,
  Heading,
  Center,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'

import * as Yup from 'yup'
import { FcGoogle } from 'react-icons/fc'

import { navigate } from 'gatsby'
import { useAuth } from '../../contexts/firebase'
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { CgProfile } from 'react-icons/cg'
import { Formik, Form, Field } from 'formik'
import { v4 } from 'uuid'

export type Values = { name: string; email: string; password: string }

const signupValidationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório.'),
  email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório.'),
})

const signinValidationSchema = Yup.object({
  email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório.'),
})

export const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [signup, setSignup] = useState(false)
  const [error, setError] = useState(false)
  const { firebase, loginWithGoogle } = useAuth()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate('/app')
      }
    })
  }, [firebase])

  const handleEmailLogin = useCallback(async (values: Values) => {
    try {
      const { email, password } = values
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          const user = firebase
            .auth()
            .signInWithEmailAndPassword(email, password)

          if (user) {
            setError(false)
            navigate('/app/loading')
          } else {
            setError(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }, [])

  // Method for signing up and logging in.
  const handleEmailSignup = useCallback(async (values: Values) => {
    const { email, name, password } = values
    const db = firebase.firestore()

    const usersRef = db.collection('users')

    try {
      const { user } = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase.auth().createUserWithEmailAndPassword(email, password)
        })

      if (user) {
        const uuid = v4()

        const userDb = {
          name,
          email,
          displayName: name,
          id: uuid,
        }

        usersRef.doc(uuid).set(userDb)

        setError(false)
        navigate('/app/loading')
      } else {
        setError(true)
      }
    } catch (e) {
      console.log(e)
      setError(true)
    }
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
              {error && (
                <Text fontSize="sm" color="red.500">
                  Email ou Senha inválidos
                </Text>
              )}
              <Flex justify="center">
                <Text fontSize="xs" color="blackAlpha" fontWeight="semibold">
                  {signup ? 'Já possui uma conta?' : 'Novo no nosso app?'}{' '}
                  <Link
                    color="blue.600"
                    fontSize="xs"
                    cursor="pointer"
                    onClick={() => setSignup((prev) => !prev)}
                  >
                    {signup ? 'Entrar' : 'Registrar-se'}
                  </Link>
                </Text>
              </Flex>
            </Stack>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              isLoading={props.isSubmitting}
            >
              {signup ? 'Registrar' : 'Entrar'}
            </Button>
            <Stack direction="row" align="center" paddingX={4}>
              <Divider />
              <Text textColor="gray.300">ou</Text>
              <Divider />
            </Stack>
            <Button
              leftIcon={<Icon boxSize={6} as={FcGoogle} />}
              type="button"
              variant="ghost"
              size="lg"
              color="blackAlpha"
              onClick={() => {
                loginWithGoogle()
                navigate('/app/loading')
              }}
            >
              Entrar com Google
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
