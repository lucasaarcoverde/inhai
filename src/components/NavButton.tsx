import { Button, ButtonProps } from '@chakra-ui/react'
import { navigate } from 'gatsby'
import React from 'react'

interface NavButtonProps extends Pick<ButtonProps, 'leftIcon' | 'children'> {
  navigateUrl: string
  onClose: () => void
}

export function NavButton(props: NavButtonProps) {
  const { children, onClose, navigateUrl, leftIcon } = props

  return (
    <Button
      onClick={() => {
        navigate(navigateUrl)
        onClose()
      }}
      justifyContent="flex-start"
      paddingLeft="0"
      leftIcon={leftIcon}
      variant="ghost"
      size="md"
      width="100%"
    >
      {children}
    </Button>
  )
}
