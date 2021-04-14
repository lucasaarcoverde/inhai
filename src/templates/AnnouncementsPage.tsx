import React from 'react'
import { Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'
import { BadRatedPlace } from '../components/icons/BadRatedPlace'
import { InfoOutlineIcon } from '@chakra-ui/icons'

function AnnouncementsPage(
  props: React.PropsWithChildren<RouteComponentProps>
) {
  const { children } = props
  return (
    <Stack
      spacing="3"
      width="100vw"
      paddingY="4"
      bg="gray.50"
      height="calc(100vh - 112px)"
    >
      {children}
      <HStack width="100vw" bg="white" shadow="sm" padding="4">
        <Flex
          align="center"
          justifyContent="center"
          width="80px"
          height="100%"
          minWidth="80px"
          shadow="sm"
        >
          <BadRatedPlace boxSize="10" />
        </Flex>
        <Stack>
          <Stack spacing="1">
            <Text fontSize="xs">{new Date().toLocaleDateString('pt-BR')}</Text>
            <Heading fontSize="sm">
              Visualize no mapa locais com nota baixa!
            </Heading>
          </Stack>
          <Text fontSize="xs">
            Compartilhe sua experiência, lembrando sempre de fazer críticas
            construtivas. O intuito não é incentivar o ódio, mas sim a mudança
            nesses locais.
          </Text>
        </Stack>
      </HStack>

      <HStack width="100vw" bg="white" shadow="sm" padding="4">
        <Flex
          align="center"
          justifyContent="center"
          height="100%"
          width="80px"
          minWidth="80px"
          shadow="sm"
        >
          <InfoOutlineIcon color="teal.500" boxSize="8" />
        </Flex>
        <Stack>
          <Stack spacing="1">
            <Text fontSize="xs">{new Date().toLocaleDateString('pt-BR')}</Text>
            <Heading fontSize="sm">
              Utilize filtros para facilitar a visualização no mapa
            </Heading>
          </Stack>
          <Text fontSize="xs">
            Dessa forma buscar pelo local que você deseja se torna bem mais
            simples!
          </Text>
        </Stack>
      </HStack>
    </Stack>
  )
}

export default AnnouncementsPage
