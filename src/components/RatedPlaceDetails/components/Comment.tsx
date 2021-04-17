import React, { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  createStandaloneToast,
  IconButton,
} from '@chakra-ui/react'
import type { FormikHelpers } from 'formik'
import { Form, Formik } from 'formik'
import { CheckboxSingleControl } from 'formik-chakra-ui'
import { RiStarSFill } from 'react-icons/ri'
import { AiTwotoneFlag } from 'react-icons/ai'

import useFirebase from '../../../hooks/useFirebase'
import { useAuth } from '../../../contexts/firebase'
import { useVerified } from '../../../contexts/verified'
import type { RatedPlace, Rating } from '../../../templates/RatingsPage'

export function Comment(props: CommentProps) {
  const { rating, place } = props

  const {
    user,
    id,
    reports = [],
    comment,
    anonymous = true,
    rate,
    createdAt,
  } = rating

  const toast = useCallback(createStandaloneToast(), [])
  const [reportedBy, setReportedBy] = useState<string[]>([])

  const { firebase, user: currentUser } = useAuth()
  const { updatePlaceRating } = useFirebase()

  const photo = anonymous ? '' : user?.photo
  const name = anonymous ? 'anônimo' : user?.displayName
  const { verified } = useVerified()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleReport = useCallback(
    (values: FormReport, actions: FormikHelpers<FormReport>) => {
      const db = firebase.firestore()

      if (!currentUser) return

      const currentUserId = currentUser.id

      if (reportedBy.includes(currentUserId)) {
        toast({
          description: 'Você já denunciou essa avaliação.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        actions.setSubmitting(false)
        actions.resetForm()
        setTimeout(() => onClose(), 200)

        return
      }

      const updatedReportsBy = [...reportedBy, currentUserId]

      db.collection('ratings')
        .doc(id)
        .update({
          reportedBy: updatedReportsBy,
          reports: [...reports, { ...values, userId: currentUserId }],
        })
        .then(() => {
          toast({
            description: 'Denúncia realizada',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          setReportedBy(updatedReportsBy)
          actions.setSubmitting(false)
          actions.resetForm()
          onClose()
        })
        .catch(() => {
          toast({
            title: 'Falha ao realizar denúncia',
            description: 'Tente novamente.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          actions.setSubmitting(false)
          onClose()
        })
    },
    [firebase, id, reportedBy, reports, currentUser, onClose]
  )

  useEffect(() => {
    if (!rating.reportedBy) return
    setReportedBy(rating.reportedBy)
  }, [rating?.reportedBy])

  useEffect(() => {
    if (!reportedBy || reportedBy.length <= 50) return

    const db = firebase.firestore()

    db.collection('ratings')
      .doc(rating.id)
      .get()
      .then((doc) => {
        if (!doc.exists) return

        const ratingData = doc.data() as Rating

        if (ratingData?.visible !== false) {
          db.collection('ratings')
            .doc(ratingData.id)
            .update({ visible: false })
            .then(() => {
              updatePlaceRating(place, rating, false)
            })
        }
      })
  }, [reportedBy, rating, place, updatePlaceRating])

  return (
    <Stack
      fontSize="xs"
      direction="column"
      spacing={2}
      width="100%"
      justifyContent="center"
    >
      <HStack spacing="2">
        <Avatar size="sm" src={photo} alt={name} />
        <Text fontSize="xs">{name}</Text>
      </HStack>
      <Flex justifyContent="space-between">
        <HStack align="center" spacing={2}>
          <Flex color="yellow.400">
            {Array.from({ length: rate }, (_, index) => {
              return (
                <Icon
                  as={RiStarSFill}
                  key={`rating-star-${index}`}
                  boxSize="18px"
                />
              )
            })}
          </Flex>
          {createdAt && (
            <Text fontSize="x-small" color="gray.500">
              Avaliado em {createdAt.toDate().toLocaleDateString('pt-BR')}
            </Text>
          )}
        </HStack>
        <IconButton
          aria-label="Denunciar local"
          onClick={() => {
            if (!verified) {
              toast({
                description: 'Verifique seu e-mail para realizar uma denúncia.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top',
              })

              return
            }

            onOpen()
          }}
          icon={<Icon as={AiTwotoneFlag} />}
          variant="ghost"
          colorScheme="blue"
          size="xs"
        />
        <Modal size="xs" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Denunciar Comentário</ModalHeader>
            <ModalCloseButton />
            <Formik
              enableReinitialize
              initialValues={{
                notRelated: false,
                aggressive: false,
              }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true)
                if (values.aggressive || values.notRelated) {
                  handleReport(values, actions)
                } else {
                  actions.setSubmitting(false)
                }
              }}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <ModalBody>
                      <Stack spacing="2">
                        <Text fontSize="xs" fontWeight="bold">
                          Escolha pelo menos uma das opções
                        </Text>
                        <CheckboxSingleControl
                          sx={{ '> label > span': { fontSize: 'xs' } }}
                          name="notRelated"
                        >
                          Não possui relação com o intuito do aplicativo.
                        </CheckboxSingleControl>
                        <CheckboxSingleControl
                          sx={{ '> label > span': { fontSize: 'xs' } }}
                          name="aggressive"
                        >
                          Comentário ofensivo.
                        </CheckboxSingleControl>
                      </Stack>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        isLoading={formikProps.isSubmitting}
                        type="submit"
                        colorScheme="teal"
                        variant="ghost"
                        isDisabled={
                          !formikProps.values.notRelated &&
                          !formikProps.values.aggressive
                        }
                      >
                        Realizar denúncia
                      </Button>
                    </ModalFooter>
                  </Form>
                )
              }}
            </Formik>
          </ModalContent>
        </Modal>
      </Flex>
      {comment && <Text fontWeight="normal">{comment}</Text>}
    </Stack>
  )
}

export interface CommentProps {
  rating: Rating
  place: RatedPlace
}

interface FormReport {
  aggressive: boolean
  notRelated: boolean
}
