import { PhoneIcon } from '@chakra-ui/icons'
import {
  Badge,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  ModalFooter,
  WrapItem,
  Wrap,
  Center,
  Button,
  IconButton,
  HStack,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { SiTwitter, SiFacebook } from 'react-icons/si'
import React, { useMemo } from 'react'
import { useMediaQuery } from '../../contexts'
import { RatedPlace } from '../../templates/RatingsPage'
export interface PlaceDetailsProps {
  item: RatedPlace
  isDetailsOpen: boolean
  onCloseDetails: () => void
}

export function PlaceDetails(props: PlaceDetailsProps) {
  const { isDetailsOpen, onCloseDetails, item } = props
  const { title = '', address, categories, contacts } = item

  const label = address?.label
  const firstCategory = categories?.[0]
  const secondCategory = categories?.[1]
  const phone = contacts?.[0]?.phone?.[0].value

  const { mobile } = useMediaQuery()
  const { site, facebook, twitter } = useMemo(
    () => getUrls(contacts?.[0]?.www),
    [contacts]
  )

  return (
    <Modal
      isOpen={isDetailsOpen}
      onClose={onCloseDetails}
      size={mobile ? 'xs' : 'sm'}
    >
      <ModalOverlay />
      <ModalContent overflowY="hidden">
        <ModalHeader isTruncated>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingY="0">
          <Stack spacing="3">
            <Stack spacing="2">
              <Flex align="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Informações do Local
                </Text>
              </Flex>
              <Divider />
              <Stack spacing="2">
                <Text fontSize="sm">{label}</Text>
                <HStack spacing={2}>
                  {phone && (
                    <HStack spacing="1">
                      <Center>
                        <PhoneIcon size="xs" />
                      </Center>
                      <Text fontSize="xs">{phone}</Text>
                    </HStack>
                  )}

                  {!!site && (
                    <>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => window.open(site, '_blank')}
                      >
                        Visite o site
                      </Button>
                    </>
                  )}
                  {!!facebook && (
                    <IconButton
                      aria-label="facebook button"
                      icon={<SiFacebook />}
                      colorScheme="facebook"
                      size="xs"
                      onClick={() => window.open(facebook, '_blank')}
                    />
                  )}
                  {!!twitter && (
                    <IconButton
                      aria-label="twitter button"
                      icon={<SiTwitter />}
                      colorScheme="twitter"
                      size="xs"
                      onClick={() => window.open(twitter, '_blank')}
                    />
                  )}
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Wrap>
            {firstCategory && (
              <WrapItem>
                <Badge
                  variant="subtle"
                  colorScheme={getPalettes(firstCategory.name)}
                >
                  {firstCategory.name}
                </Badge>
              </WrapItem>
            )}
            {secondCategory && (
              <WrapItem>
                <Badge
                  variant="subtle"
                  colorScheme={getPalettes(secondCategory.name)}
                >
                  {secondCategory.name}
                </Badge>
              </WrapItem>
            )}
          </Wrap>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function getPalettes(category: string) {
  switch (category.toLowerCase()) {
    case 'bar ou pub':
      return 'purple'
    case 'restaurante':
      return 'pink'
    case 'ginásio ou health club':
      return 'yellow'
    case 'padaria':
      return 'orange'
    case 'comida rápida':
      return 'red'
    default:
      return 'blue'
  }
}

function getUrls(contacts: { value: string }[] = []) {
  const site =
    contacts.filter(
      ({ value }) => !value.includes('twitter') && !value.includes('facebook')
    )?.[0]?.value ?? ''

  const twitter =
    contacts.filter(({ value }) => value.includes('twitter'))?.[0]?.value ?? ''

  const facebook =
    contacts.filter(({ value }) => value.includes('facebook'))?.[0]?.value ?? ''

  return { site, twitter, facebook }
}
