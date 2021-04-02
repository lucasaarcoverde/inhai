import React from 'react'

import { Flex, FlexProps, Icon, Link, Stack } from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai'

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
      height="48px"
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
