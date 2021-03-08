import React from 'react'
import { Icon, SearchIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineStar, AiOutlineSetting } from 'react-icons/ai'
import { NavButton } from './NavButton'

interface LeftNavProps {
  onClose: () => void
}
export function LeftNav(props: LeftNavProps) {
  const { onClose } = props
  return (
    <Stack direction="column" padding="0" spacing="16px">
      <NavButton
        onClose={onClose}
        navigateUrl="/app/map"
        leftIcon={<SearchIcon />}
      >
        Mapa LGBTQI+
      </NavButton>
      <NavButton
        onClose={onClose}
        navigateUrl="/app/ratings"
        leftIcon={<Icon as={AiOutlineStar} />}
      >
        Avaliar Local
      </NavButton>
      <NavButton
        onClose={onClose}
        navigateUrl="/app/notifications"
        leftIcon={<Icon as={IoMdNotificationsOutline} />}
      >
        Notificações
      </NavButton>
      <NavButton
        onClose={onClose}
        navigateUrl="/app/settings"
        leftIcon={<Icon as={AiOutlineSetting} />}
      >
        Configurações
      </NavButton>
    </Stack>
  )
}
