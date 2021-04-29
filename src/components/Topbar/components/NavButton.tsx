import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import React from 'react'

interface NavButtonProps extends ButtonProps {
  navigateUrl?: string
}

export function NavButton(props: NavButtonProps) {
  const { children, navigateUrl = '/app', leftIcon, ...buttonProps } = props
  const { pathname } = useLocation()

  return (
    <Button
      onClick={() => {
        if (pathname !== navigateUrl) {
          navigate(navigateUrl)
        }
      }}
      leftIcon={leftIcon}
      variant="ghost"
      size="sm"
      width="100%"
      color={navigateUrl === pathname ? 'teal.500' : 'gray.700'}
      colorScheme="gray"
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
