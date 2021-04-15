import React, { useMemo } from 'react'
import {
  HStack,
  Heading,
  Text,
  Divider,
  Wrap,
  Stack,
  Center,
  IconButton,
  Button,
  WrapItem,
  Badge,
  Icon,
  Link,
} from '@chakra-ui/react'
import { SiTwitter, SiFacebook } from 'react-icons/si'
import { FiMapPin } from 'react-icons/fi'

import { RatedPlace } from '../../../templates/RatingsPage'
import { PhoneIcon } from '@chakra-ui/icons'

export function PlaceCard(props: RatedPlace) {
  const { address, categories, contacts, title = '' } = props

  const {
    street,
    houseNumber,
    district,
    city,
    stateCode,
    postalCode,
    countryName,
  } = address ?? {}

  const label = address
    ? `${street}, ${houseNumber}, ${district}, ${city} - ${stateCode}, ${postalCode}, ${countryName}`
    : null

  const firstCategory = categories?.[0]
  const secondCategory = categories?.[1]
  const phone = contacts?.[0]?.phone?.[0].value

  const { site, facebook, twitter } = useMemo(
    () => getUrls(contacts?.[0]?.www),
    [contacts]
  )
  return (
    <Stack
      spacing="4"
      paddingX="4"
      paddingY="3"
      bg="white"
      shadow="sm"
      borderY="solid"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Heading fontSize="lg" color="teal.500">
        Sobre o Local
      </Heading>
      <Stack spacing="4">
        <Stack spacing="1">
          <HStack spacing="1">
            <Icon as={FiMapPin} />
            <Heading fontSize="sm">{title}</Heading>
          </HStack>
          <Text paddingLeft="20px" fontSize="sm">
            {label}
          </Text>
        </Stack>
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
        <Text fontSize="xs">
          Caso você seja proprietário desse estabelecimento e deseja se
          manifestar de alguma forma,{' '}
          <Link
            fontSize="xs"
            color="blue.600"
            href="mailto: inhaiapp@gmail.com?subject=Proprietário estabelecimento"
            fontWeight="bold"
            target="_blank"
          >
            clique aqui para entrar em contato
          </Link>
        </Text>
        <Divider />
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
      </Stack>
    </Stack>
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
      ({ value }) =>
        !value.includes('twitter') &&
        !value.includes('facebook') &&
        value.includes('http')
    )?.[0]?.value ?? ''

  const twitter =
    contacts.filter(
      ({ value }) => value.includes('twitter') && value.includes('http')
    )?.[0]?.value ?? ''

  const facebook =
    contacts.filter(
      ({ value }) => value.includes('facebook') && value.includes('http')
    )?.[0]?.value ?? ''

  return { site, twitter, facebook }
}
