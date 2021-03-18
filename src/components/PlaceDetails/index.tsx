import { LinkIcon, PhoneIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import { SiTwitter, SiFacebook } from 'react-icons/si'
import React from 'react'
import { HereItem } from '../../hooks/useHere'

export interface PlaceDetailsProps {
  item: HereItem
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

  const { site, facebook, twitter } = getUrls(contacts?.[0]?.www)

  return (
    <Modal isOpen={isDetailsOpen} onClose={onCloseDetails} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Text fontSize="sm">{label}</Text>
            {phone && (
              <HStack spacing="1">
                <Center>
                  <PhoneIcon />
                </Center>
                <Text size="sm">{phone}</Text>
              </HStack>
            )}

            <HStack spacing={2}>
              {!!site && (
                <>
                  <Button
                    leftIcon={<LinkIcon />}
                    size="sm"
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
                  size="sm"
                  onClick={() => window.open(facebook, '_blank')}
                />
              )}
              {!!twitter && (
                <IconButton
                  aria-label="twitter button"
                  icon={<SiTwitter />}
                  colorScheme="twitter"
                  size="sm"
                  onClick={() => window.open(twitter, '_blank')}
                />
              )}
            </HStack>
          </Stack>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Wrap>
            {firstCategory && (
              <WrapItem>
                <Badge
                  variant="solid"
                  colorScheme={getPalettes(firstCategory.name)}
                >
                  {firstCategory.name}
                </Badge>
              </WrapItem>
            )}
            {secondCategory && (
              <WrapItem>
                <Badge
                  variant="solid"
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