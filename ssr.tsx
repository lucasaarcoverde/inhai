import React from 'react'
import { theme, ColorModeScript } from '@chakra-ui/react'

export default ({ setPreBodyComponents }: any) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}
