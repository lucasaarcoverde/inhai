import React from 'react'

import {
  Avatar,
  Button,
  Flex,
  FlexProps,
  Grid,
  Icon,
  IconButton,
  Link,
  Stack,
} from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { FiBell } from 'react-icons/fi'
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
          href="mailto: lucasaarcoverde@gmail.com"
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

export const MobileFooter = (props: { photo?: string }) => {
  const { photo } = props

  const { pathname } = useLocation()

  const map = pathname === '/app'
  const profile = pathname === '/app/profile'
  const about = pathname === '/app/about-us'
  const announcements = pathname === '/app/announcements'

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
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
        aria-label="Página de informações"
        variant="ghost"
        icon={<Icon as={BiHelpCircle} boxSize={about ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!about) navigate('/app/about-us')
        }}
      />
      <IconButton
        variant="ghost"
        aria-label="Página do mapa LGBTI+ friendly"
        icon={<SearchIcon boxSize={map ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!map) navigate('/app')
        }}
      />
      <IconButton
        variant="ghost"
        aria-label="Página do mapa LGBTI+ friendly"
        icon={<Icon as={FiBell} boxSize={announcements ? '7' : '6'} />}
        colorScheme="teal"
        onClick={() => {
          if (!announcements) navigate('/app/announcements')
        }}
      />
      <Button
        variant="ghost"
        aria-label="Página do perfil"
        colorScheme="teal"
        onClick={() => {
          if (!profile) navigate('/app/profile')
        }}
      >
        <Avatar size={profile ? 'sm' : 'xs'} src={photo} />
      </Button>
    </Grid>
  )
}
