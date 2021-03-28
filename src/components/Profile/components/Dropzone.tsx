import React, { useMemo, useState } from 'react'

import { useField } from 'formik'
import { useDropzone } from 'react-dropzone'
import { Avatar, Box } from '@chakra-ui/react'
import { User } from '../../../contexts/firebase'
import { useEffect } from 'react'

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
    var reader = new FileReader()
    reader.onloadend = function () {
      setImageFile(reader.result)
    }

    reader.readAsDataURL(file)
  }, [file])

  const [, , helpers] = useField({ name })

  useEffect(() => {
    helpers.setValue(imageUrl)
  }, [imageUrl])

  return (
    <Box as={Avatar} size="xl" src={imageUrl} {...getRootProps()}>
      <input {...getInputProps()} />
    </Box>
  )
}
