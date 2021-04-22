import React from 'react'
import type { FlexProps } from '@chakra-ui/react'
import { Flex, Grid, Icon, IconButton, Link, Stack } from '@chakra-ui/react'
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMail,
  AiOutlineHome,
} from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { SearchIcon } from '@chakra-ui/icons'

export function Footer(props: FlexProps) {
  const { children, ...restProps } = props

  return (
    <Flex
      borderTop="solid"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      bg="white"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      height="64px"
      paddingBottom="4"
      {...restProps}
    >
      {children}
    </Flex>
  )
}

export function DefaultFooter(props: FlexProps) {
  return (
    <Footer justifyContent="center" align="center" {...props}>
      <Stack direction="row" spacing="3" color="gray.400">
        <Link
          href="mailto: inhaiapp@gmail.com?subject=Contato Inhaí"
          fontWeight="bold"
          target="_blank"
        >
          <Icon boxSize="6" as={AiFillMail} />
        </Link>
        <Link
          href="https://github.com/lucasaarcoverde"
          fontWeight="bold"
          target="_blank"
        >
          <Icon boxSize="6" as={AiFillGithub} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/lucasaarcoverde/"
          target="_blank"
        >
          <Icon boxSize="6" as={AiFillLinkedin} />
        </Link>
      </Stack>
    </Footer>
  )
}

export const MobileFooter = () => {
  const { pathname } = useLocation()

  const map = pathname === '/app/map'
  const home = pathname === '/app'
  const about = pathname === '/app/about'

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      position="fixed"
      zIndex="docked"
      bg="white"
      bottom="0"
      width="100vw"
      height="56px"
      alignContent="flex-start"
      borderTop="solid"
      borderTopWidth="1px"
      borderTopColor="gray.200"
    >
      <IconButton
        aria-label="Página principal"
        variant="ghost"
        icon={<Icon as={AiOutlineHome} boxSize={home ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!home) navigate('/app')
        }}
      />
      <IconButton
        variant="ghost"
        aria-label="Página do mapa LGBTI+ friendly"
        icon={<SearchIcon boxSize={map ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!map) navigate('/app/map')
        }}
      />
      <IconButton
        aria-label="Página de informações"
        variant="ghost"
        icon={<Icon as={BiHelpCircle} boxSize={about ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!about) navigate('/app/about')
        }}
      />
    </Grid>
  )
}
