import React, { useMemo, useState, useEffect } from 'react'
import { useField } from 'formik'
import { useDropzone } from 'react-dropzone'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import type { User } from '../../../contexts/firebase'

interface Props {
  name: string
  user?: User
}

export function ProfileDropzone(props: Props) {
  const { user, name } = props
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>()

  const {
    getRootProps,
    getInputProps,
    acceptedFiles: [file],
  } = useDropzone({ accept: 'image/*', maxFiles: 1 })

  const imageUrl = useMemo(() => {
    if (!file) return user?.photo ?? ''

    return imageFile
  }, [imageFile, user])

  useEffect(() => {
    if (!file) return
    const reader = new FileReader()

    reader.onloadend = () => {
      setImageFile(reader.result)
    }

    reader.readAsDataURL(file)
  }, [file])

  const [, , helpers] = useField({ name })

  useEffect(() => {
    helpers.setValue(imageUrl)
  }, [imageUrl])

  return (
    <Flex
      justifyContent="center"
      direction="column"
      align="center"
      cursor="pointer"
      {...getRootProps()}
    >
      <Box as={Avatar} size="xl" src={imageUrl}>
        <input {...getInputProps()} />
      </Box>
      <Text fontSize="sm" fontWeight="bold" color="blue.600">
        Mudar foto de perfil
      </Text>
    </Flex>
  )
}
