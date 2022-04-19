import { useRouter } from 'next/router'
import cn from 'classnames'

import { Anchor, AnchorProps } from 'components/anchor'
import { Button } from '../button'
import { Flex } from './flex'
import { Stack } from './stack'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'

const messages = defineMessages({
  appTitle: { id: 'inhai.title' },
  home: { id: 'inhai.pages.home' },
  map: { id: 'inhai.pages.map' },
  contact: { id: 'inhai.pages.contact' },
  login: { id: 'inhai.login' },
  signUp: { id: 'inhai.signUp' },
})

export function Topbar() {
  const { formatMessage } = useIntl()

  return (
    <Flex className="items-center h-24 px-20">
      <Flex className="justify-start w-full prose ">
        <h1 className="text-teal-600">{formatMessage(messages.appTitle)}</h1>
      </Flex>
      <Stack className="justify-center w-full child:mr-12">
        <TopbarNavigation href="/">
          <FormattedMessage {...messages.home} />
        </TopbarNavigation>
        <TopbarNavigation href="/map">
          <FormattedMessage {...messages.map} />
        </TopbarNavigation>
        <TopbarNavigation href="/contact">
          <FormattedMessage {...messages.contact} />
        </TopbarNavigation>
      </Stack>
      <Stack className="justify-end w-full child:mr-5">
        <Button>
          <FormattedMessage {...messages.login} />
        </Button>
        <Button variant="outline">
          <FormattedMessage {...messages.signUp} />
        </Button>
      </Stack>
    </Flex>
  )
}

export function TopbarNavigation(props: AnchorProps) {
  const router = useRouter()

  const className = cn({ 'text-gray-500': router.pathname !== props.href })

  return <Anchor {...props} className={className} />
}
function formatMessage(appTitle: { id: string }): import('react').ReactNode {
  throw new Error('Function not implemented.')
}
