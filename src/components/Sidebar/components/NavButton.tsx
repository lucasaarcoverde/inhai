import type { ButtonProps } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { navigate } from 'gatsby'
import React from 'react'

interface NavButtonProps extends ButtonProps {
  navigateUrl?: string
  onClose?: () => void
}

export function NavButton(props: NavButtonProps) {
  const {
    children,
    onClose,
    navigateUrl = '/app',
    leftIcon,
    ...buttonProps
  } = props

  return (
    <Button
      onClick={() => {
        navigate(navigateUrl)
        onClose?.()
      }}
      justifyContent="flex-start"
      leftIcon={leftIcon}
      variant="ghost"
      size="md"
      width="100%"
      colorScheme="teal"
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
