import React from 'react'
import { Icon, SearchIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineStar, AiOutlineSetting } from 'react-icons/ai'
import { NavButton } from './NavButton'

export function LeftNav(props: any) {
  console.log(props)
  return (
    <Stack direction="column" padding="0" spacing="16px">
      <NavButton navigateUrl="/app/map" leftIcon={<SearchIcon />}>
        Mapa LGBTQI+
      </NavButton>
      <NavButton
        navigateUrl="/app/ratings"
        leftIcon={<Icon as={AiOutlineStar} />}
      >
        Avaliar Local
      </NavButton>
      <NavButton
        navigateUrl="/app/notifications"
        leftIcon={<Icon as={IoMdNotificationsOutline} />}
      >
        Notificações
      </NavButton>
      <NavButton
        navigateUrl="/app/settings"
        leftIcon={<Icon as={AiOutlineSetting} />}
      >
        Configurações
      </NavButton>
    </Stack>
  )
}
